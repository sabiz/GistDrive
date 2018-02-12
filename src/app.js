'use strict';

const Gists = require('gists');

const Config = require('./lib/config');
const window = require('./ui/window');
const Channel = require('./ui/channel');

const NAME_CONFIG_FILE = 'conf.json';
const CONFIG_GITHUB_NAME = 'GITHUB_USER_NAME';
const CONFIG_GITHUB_PASSWORD = 'GITHUB_PASSWORD';

const conf = new Config(NAME_CONFIG_FILE,{autoSave:true});
const gists = {};

const onClose = ()=>{
    console.log("close");
}

const onUserName = userName => {
    conf.set(CONFIG_GITHUB_NAME, userName);
    window.request(onEncryptKey,Channel.REQUEST_ENCRYPT_KEY);
}

const onEncryptKey = key =>{
    // const key = prompt.hide('password Encrypt key > ');
    // let password = this.conf.getAndDecrypt(CONFIG_GITHUB_PASSWORD, key);
    // if(!password){
    //     password = prompt.hide('Github password > ');
    //     this.conf.setAndEncrypt(CONFIG_GITHUB_PASSWORD, password, key);
    // }
    // let gist = new Gists({
    //     username: name,
    //     password: password
    // });
    // gist.list({user:name},(err,res)=>{
    //     console.log(err,res);
    // });
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