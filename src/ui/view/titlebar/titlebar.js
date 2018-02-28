const { remote } = require('electron');

const { Menu } = remote;

const dom = require('../util/dom');

module.exports.setTitle = (title) => {
    const titlebar = document.querySelector('.title-bar span');
    titlebar.textContent = title;
};

function init() {
    const w = remote.getCurrentWindow(); // eslint-disable-line
    const buttonClose = document.querySelector('.title-bar .fa-power-off');
    buttonClose.addEventListener('click', () => { w.close(); });

    const buttonMinimize = document.querySelector('.title-bar .fa-window-minimize');
    buttonMinimize.addEventListener('click', () => { w.minimize(); });

    const menuButton = document.querySelector('.title-bar .fa-bars');
    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const menu = Menu.getApplicationMenu();
        menu.popup({
            x: e.pageX,
            y: e.pageY,
        });
    });
}
dom.contentLoadAction(init);
