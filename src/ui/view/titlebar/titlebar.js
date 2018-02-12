'use strict';

const dom = require('../util/dom');

module.exports.setTitle = (title)=>{
    const titlebar = document.querySelector('.title-bar span');
    titlebar.textContent = title;
}

function init() {
    const w = require('electron').remote.getCurrentWindow();
    const buttonClose = document.querySelector('.title-bar i');
    buttonClose.addEventListener('click', () => {w.close();});
}
dom.contentLoadAction(init);