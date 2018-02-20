const Gists = require('gists');

const Config = require('./lib/config');
const Log = require('./lib/log');
const window = require('./ui/window');
const Channel = require('./ui/channel');

const NAME_CONFIG_FILE = 'conf.json';
const CONFIG_GITHUB_NAME = 'GITHUB_USER_NAME';
const CONFIG_GITHUB_PASSWORD = 'GITHUB_PASSWORD';

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
    new Promise((resolve, reject) => {
        const name = conf.get(CONFIG_GITHUB_NAME);
        const pass = conf.getAndDecrypt(CONFIG_GITHUB_PASSWORD, key);
        gistClient = new Gists({
            username: name,
            password: pass,
        });
        gistClient.list({ user: name }, (err, res) => {
            if (err || res.message) {
                reject(res.message || 'Github connect error.');
                return;
            }
            makeGistList(res);
            resolve();
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
    });
};

module.exports.start = () => {
    window.create(onClose);
    conf.load();
    const name = conf.get(CONFIG_GITHUB_NAME);
    if (!name) {
        window.request(onUserName, Channel.REQUEST_USER_NAME);
        return;
    }
    window.request(onEncryptKey, Channel.REQUEST_ENCRYPT_KEY);
    window.register(getGistItem, Channel.REQUEST_GIST_ITEM);
};
