'use strict';

const Gists = require('gists');

const Config = require('./lib/config');
const window = require('./ui/window');
const Channel = require('./ui/channel');

const NAME_CONFIG_FILE = 'conf.json';
const CONFIG_GITHUB_NAME = 'GITHUB_USER_NAME';
const CONFIG_GITHUB_PASSWORD = 'GITHUB_PASSWORD';

const conf = new Config(NAME_CONFIG_FILE,{autoSave:true});
let gistClient;
let gistList;
let key;

const onClose = ()=>{
    console.log("close");
}

const onUserName = userName => {
    //TODO empty value
    conf.set(CONFIG_GITHUB_NAME, userName);
    window.request(onEncryptKey,Channel.REQUEST_ENCRYPT_KEY);
}

const onEncryptKey = typedKey =>{
    //TODO empty value
    key = typedKey;
    let password = conf.getAndDecrypt(CONFIG_GITHUB_PASSWORD, key);
    if(!password){
        window.request(onPassword,Channel.REQUEST_PASSWORD);
        return;
    }
    connectGist();
}

const onPassword = password => {
    //TODO empty value
    conf.setAndEncrypt(CONFIG_GITHUB_PASSWORD, password, key);
    connectGist();
}

const connectGist = ()=>{
    return new Promise((resolve,reject)=>{
        const name = conf.get(CONFIG_GITHUB_NAME);
        const pass = conf.getAndDecrypt(CONFIG_GITHUB_PASSWORD,key);
        gistClient = new Gists({
            username: name,
            password: pass,
        });
        gistClient.list({user:name},(err,res)=>{
            if(err ||res.message){
                reject(res.message || "Github connect error.");
                return;
            }
            makeGistList(res);
            resolve();
        });
    }).catch(error=>{
        console.log(error);
        window.request(null,Channel.SHOW_ERROR,error);
    });
}

const makeGistList = gists=> {
    console.log(Array.isArray(gists))
    gists.forEach((v)=>{
        let tmp = {};
        tmp.description = v.description;
        const name = Object.keys(v.files)[0];
        tmp.name = name;
        tmp.url = v.files[name].raw_url;
        gistList.push(tmp);
    });
}

module.exports.start = () => {
        window.create(onClose);
        conf.load();
        let name = conf.get(CONFIG_GITHUB_NAME);
        if(!name){
            window.request(onUserName,Channel.REQUEST_USER_NAME);
            return;
        }
        window.request(onEncryptKey,Channel.REQUEST_ENCRYPT_KEY);
}
