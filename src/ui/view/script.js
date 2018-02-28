const { ipcRenderer } = require('electron');
const alertify = require('alertifyjs');
const titlebar = require('./titlebar/titlebar'); // eslint-disable-line
const preview = require('./preview/preview');
const list = require('./list/list');
const channel = require('../channel');
const dom = require('./util/dom');

alertify.set('notifier', 'position', 'top-center');
// alertify.set('notifier','delay', 1000); DEBUG notify

const gists = [];

function renderMarkdown(mdText) {
    preview.preview(mdText);
}

function onItemClick(data) {
    const tmpData = gists.find(e => e.id === data.id);
    if (!tmpData) {
        gists.push({ id: data.id });
        ipcRenderer.send(channel.REQUEST_GIST_ITEM, data.id, data.name);
    } else {
        renderMarkdown(tmpData.content);
    }
}

dom.contentLoadAction(() => {
    list.registerItemClick(onItemClick);
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
    alertify.prompt(
        '', 'Github account password ?', '',
        (evt, value) => ipcRenderer.send(channel.REQUEST_PASSWORD, value),
        () => alertify.error('TODO: Cancel'),
    ).set('type', 'password').set('closable', false);
});

ipcRenderer.on(channel.REQUEST_UPDATE_LIST, (ev, args) => {
    list.update(...args);
});

ipcRenderer.on(channel.REQUEST_GIST_ITEM, (ev, args) => {
    if (!args || !args[0]) {
        return;
    }
    const result = args[0];
    let updateItem;
    gists.forEach((v, i) => {
        if (v.id === result.id) {
            gists[i].language = result.language;
            gists[i].content = result.content;
            updateItem = gists[i];
        }
    });
    renderMarkdown(updateItem.content);
});

ipcRenderer.on(channel.SHOW_ERROR, (ev, args) => alertify.error(args[0]));

