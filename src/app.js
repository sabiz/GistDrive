'use strict';

const Gists = require('gists');

const Config = require('./lib/config');
const prompt = require('prompt-sync')();//For CLI

const NAME_CONFIG_FILE = 'conf.json';
const CONFIG_GITHUB_NAME = 'GITHUB_USER_NAME';
const CONFIG_GITHUB_PASSWORD = 'GITHUB_PASSWORD';

class App {
    constructor(){
        this.conf = new Config(NAME_CONFIG_FILE,{autoSave:true});
        this.gists = {};
    }

    start() {
        this.conf.load();
        let name = this.conf.get(CONFIG_GITHUB_NAME);
        if(!name){
            name = prompt('Github user name > ');
            this.conf.set(CONFIG_GITHUB_NAME, name);
        }
        const key = prompt('password Encrypt key > ');
        let password = this.conf.getAndDecrypt(CONFIG_GITHUB_PASSWORD, key);
        if(!password){
            password = prompt('Github password > ');
            this.conf.setAndEncrypt(CONFIG_GITHUB_PASSWORD, password, key);
        }
        console.log(name, password)
    }
}

module.exports = App;