const electron = require('electron');

const dom = require('../util/dom');

module.exports.setTitle = (title) => {
    const titlebar = document.querySelector('.title-bar span');
    titlebar.textContent = title;
};

function init() {
    const w = electron.remote.getCurrentWindow(); // eslint-disable-line
    const buttonClose = document.querySelector('.title-bar .fa-power-off');
    buttonClose.addEventListener('click', () => { w.close(); });

    const buttonMinimize = document.querySelector('.title-bar .fa-window-minimize');
    buttonMinimize.addEventListener('click', () => { w.minimize(); });
}
dom.contentLoadAction(init);
