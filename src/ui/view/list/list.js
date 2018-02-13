'use strict';

const {ipcRenderer} = require('electron');
const Vue = require('../../../../node_modules/vue/dist/vue');
const channel = require('../../channel');

const list = new Vue({
    el: '#list',
    data: {
      items: [],//{description:'',name:'',id:''}
      callBack: null
    },
    methods: {
        onItemClick: (index)=> {
            if(list.items[index].id) {
                ipcRenderer.send(channel.REQUEST_GIST_ITEM, list.items[index].id,list.items[index].name);
            }
        }
    }
});

ipcRenderer.on(channel.REQUEST_GIST_ITEM,(ev,args)=>{
    if(!args || !args[0]){
        return;
    }
    const result = args[0];
    let updateItem;
    list.items.forEach((v)=>{
        if(v.id === result.id) {
            v.language = result.language;
            v.content = result.content;
            updateItem = v;
        }
    });
    if(list.callBack){
        list.callBack(updateItem);
    }
});

module.exports.registerItemClick = (callBack) => {
    list.callBack = callBack;
}

module.exports.update = (items) => {
    list.items = [].concat(items);
}