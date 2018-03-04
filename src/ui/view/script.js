const { ipcRenderer } = require('electron');
const alertify = require('alertifyjs');
require('./titlebar/titlebar');
require('./list/list');
require('./preview/preview');
const progress = require('./progress/progress');
const channel = require('../channel');
const dom = require('./util/dom');
const Vue = require('../../../node_modules/vue/dist/vue');

alertify.set('notifier', 'position', 'top-center');
// alertify.set('notifier','delay', 1000); DEBUG notify

const content = new Vue({
    data: {
        gists: [],
        gistList: [],
        mdData: '',
    },
    methods: {
        onItemClick(data) {
            const tmpData = this.gists.find(e => e.id === data.id);
            if (!tmpData) {
                this.gists.push({ id: data.id });
                ipcRenderer.send(channel.REQUEST_GIST_ITEM, data.id, data.name);
            } else {
                this.mdData = tmpData.content;
            }
        },
    },
});
content.$mount('.content-area');

const titleBar = new Vue();
titleBar.$mount('.title-bar');

dom.contentLoadAction(() => {
    // NOP
});

ipcRenderer.on(channel.REQUEST_USER_NAME, () => {
    alertify.prompt(
        '', 'Github user name ?', '',
        (evt, value) => ipcRenderer.send(channel.REQUEST_USER_NAME, value),
        () => alertify.error('TODO: Cancel'),
    ).set('closable', false);
});

ipcRenderer.on(channel.REQUEST_ENCRYPT_KEY, () => {
    alertify.prompt(
        '', 'Password crypt key ?', '',
        (evt, value) => ipcRenderer.send(channel.REQUEST_ENCRYPT_KEY, value),
        () => alertify.error('TODO: Cancel'),
    ).set('type', 'password').set('closable', false);
});

ipcRenderer.on(channel.REQUEST_PASSWORD, () => {
    process.isShown = true;
    alertify.prompt(
        '', 'Github account password ?', '',
        (evt, value) => ipcRenderer.send(channel.REQUEST_PASSWORD, value),
        () => alertify.error('TODO: Cancel'),
    ).set('type', 'password').set('closable', false);
});

ipcRenderer.on(channel.REQUEST_UPDATE_LIST, (ev, args) => {
    content.gistList = [].concat(...args);
});

ipcRenderer.on(channel.REQUEST_GIST_ITEM, (ev, args) => {
    if (!args || !args[0]) {
        return;
    }
    const result = args[0];
    let updateItem;
    content.gists.forEach((v, i) => {
        if (v.id === result.id) {
            content.gists[i].language = result.language;
            content.gists[i].content = result.content;
            updateItem = content.gists[i];
        }
    });
    document.getElementById('markdown').scrollTop = 0;
    content.mdData = updateItem.content;
});

ipcRenderer.on(channel.SHOW_PROGRESS, () => {
    // alertify.alert()
    //     .setting({
    //         basic: true,
    //         closable: false,
    //         closableByDimmer: false,
    //         modal: true,
    //         movable: false,
    //     })
    //     .setContent('<h1> Hello World! </h1>').show();
});

ipcRenderer.on(channel.SHOW_ERROR, (ev, args) => alertify.error(args[0]));

