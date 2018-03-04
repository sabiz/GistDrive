const Gists = require('gists');
// const Gists = require('./lib/dummy/gists'); // for offline test

const tunnel = require('tunnel');

const Config = require('./lib/config');
const Log = require('./lib/log');
const window = require('./ui/window');
const Channel = require('./ui/channel');

const NAME_CONFIG_FILE = 'conf.json';
const CONFIG_GITHUB_NAME = 'GITHUB_USER_NAME';
const CONFIG_GITHUB_PASSWORD = 'GITHUB_PASSWORD';
const CONFIG_PROXY_HOST = 'CONFIG_PROXY_HOST';
const CONFIG_PROXY_PORT = 'CONFIG_PROXY_PORT';

const conf = new Config(NAME_CONFIG_FILE, { autoSave: true });
let gistClient;
let gistList;
let key;

const onClose = () => {
    Log.info('onClose');
};

const makeGistList = (gists) => {
    gistList = gists.map((v) => {
        const tmp = {};
        tmp.description = v.description;
        const name = Object.keys(v.files)[0];
        tmp.name = name;
        tmp.id = v.id;
        return tmp;
    });
    window.response(Channel.REQUEST_UPDATE_LIST, gistList);
};


const connectGist = () => {
    window.response(Channel.SHOW_PROGRESS, true);
    new Promise((resolve, reject) => {
        const name = conf.get(CONFIG_GITHUB_NAME);
        const pass = conf.getAndDecrypt(CONFIG_GITHUB_PASSWORD, key);
        const proxyHost = conf.get(CONFIG_PROXY_HOST);
        const proxyPort = conf.get(CONFIG_PROXY_PORT);
        const gistOption = { username: name, password: pass };
        if (proxyHost && proxyPort) {
            gistOption.agent = tunnel.httpsOverHttp({
                proxy: {
                    host: proxyHost,
                    port: proxyPort,
                },
            });
            gistOption.agent.defaultPort = 443;
        }
        gistClient = new Gists(gistOption);
        gistClient.list({
            user: name,
        }, (err, res) => {
            if (err || res.message) {
                reject(err || res.message || 'Github connect error.');
                return;
            }
            makeGistList(res);
            resolve();
            window.response(Channel.SHOW_PROGRESS, false);
        });
    }).catch((error) => {
        Log.error(error);
        window.request(null, Channel.SHOW_ERROR, error);
    });
};

const onPassword = (password) => {
    // TODO empty value
    conf.setAndEncrypt(CONFIG_GITHUB_PASSWORD, password, key);
    connectGist();
};

const onEncryptKey = (typedKey) => {
    // TODO empty value
    key = typedKey;
    const password = conf.getAndDecrypt(CONFIG_GITHUB_PASSWORD, key);
    if (!password) {
        window.request(onPassword, Channel.REQUEST_PASSWORD);
        return;
    }
    connectGist();
};

const onUserName = (userName) => {
    // TODO empty value
    conf.set(CONFIG_GITHUB_NAME, userName);
    window.request(onEncryptKey, Channel.REQUEST_ENCRYPT_KEY);
};

const getGistItem = (id, name) => {
    window.response(Channel.SHOW_PROGRESS, true);
    gistClient.download({ id }, (err, res) => {
        if (err || res.message) {
            window.request(null, Channel.SHOW_ERROR, res.message || err);
            return;
        }
        window.response(Channel.REQUEST_GIST_ITEM, {
            id: res.id,
            language: res.files[name].language,
            content: res.files[name].content,
        });
        window.response(Channel.SHOW_PROGRESS, false);
    });
};


const updateGists = () => {
    conf.load();
    const name = conf.get(CONFIG_GITHUB_NAME);
    if (!name) {
        window.request(onUserName, Channel.REQUEST_USER_NAME);
        return;
    }
    if (!key) {
        window.request(onEncryptKey, Channel.REQUEST_ENCRYPT_KEY);
    }
};


const onRequestFromWindow = (channel) => {
    Log.info('onRequestFromWindow', channel);
    switch (channel) {
    case Channel.REQUEST_UPDATE_LIST:
        updateGists();
        break;
    default:
        break;
    }
};


module.exports.start = () => {
    window.create(onClose, onRequestFromWindow);
    window.register(getGistItem, Channel.REQUEST_GIST_ITEM);
    updateGists();
};
