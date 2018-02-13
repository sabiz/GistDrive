'use strict';

const {ipcRenderer} = require('electron');
const alertify = require('alertifyjs');
alertify.set('notifier','position', 'top-center');
//alertify.set('notifier','delay', 1000); DEBUG notify

const titlebar = require('./titlebar/titlebar');
const preview = require('./preview/preview');
const list = require('./list/list');
const channel = require('../channel');


function render(mdText) {
    document.getElementById('markdown').innerHTML = preview.preview(mdText);
}

function onItemClick(data) {
    console.log(data);
}

window.addEventListener("load",()=>{
    list.registerItemClick(onItemClick);
});

ipcRenderer.on(channel.REQUEST_USER_NAME,()=>{
    alertify.prompt( '', 'Github user name ?', '',
               (evt, value)=>ipcRenderer.send(channel.REQUEST_USER_NAME, value),
               ()=>alertify.error('TODO: Cancel')).set('closable', false);
});

ipcRenderer.on(channel.REQUEST_ENCRYPT_KEY,()=>{
    alertify.prompt( '', 'Password crypt key ?', '',
               (evt, value)=>ipcRenderer.send(channel.REQUEST_ENCRYPT_KEY, value),
               ()=>alertify.error('TODO: Cancel')).set('type', 'password').set('closable', false);
});

ipcRenderer.on(channel.REQUEST_PASSWORD,()=>{
    alertify.prompt( '', 'Github account password ?', '',
               (evt, value)=>ipcRenderer.send(channel.REQUEST_PASSWORD, value),
               ()=>alertify.error('TODO: Cancel')).set('type', 'password').set('closable', false);
});

ipcRenderer.on(channel.REQUEST_UPDATE_LIST,(ev,args)=>{
    list.update(...args);
});

ipcRenderer.on(channel.SHOW_ERROR,(ev,args)=>alertify.error(args[0]));

