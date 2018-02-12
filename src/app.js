'use strict';

const Gists = require('gists');

const Config = require('./lib/config');
const Window = require('./ui/window');

const NAME_CONFIG_FILE = 'conf.json';
const CONFIG_GITHUB_NAME = 'GITHUB_USER_NAME';
const CONFIG_GITHUB_PASSWORD = 'GITHUB_PASSWORD';

class App {
    constructor(){
        this.conf = new Config(NAME_CONFIG_FILE,{autoSave:true});
        this.gists = {};
        this.window = new Window(this.onClose);
    }

    start() {
        this.conf.load();
        // let name = this.conf.get(CONFIG_GITHUB_NAME);
        // if(!name){
        //     name = prompt('Github user name > ');
        //     this.conf.set(CONFIG_GITHUB_NAME, name);
        // }
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

    onClose() {

    }
}

module.exports = App;