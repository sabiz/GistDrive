const { Menu } = require('electron');

const Channel = require('../channel');

const TEMPLETE = [
    {
        label: 'Reload gist',
        role: Channel.REQUEST_UPDATE_LIST,
    },
    {
        label: 'devTools',
        role: 'toggledevtools',
    },
    {
        label: 'Exit',
        role: 'quit',
    },
];

module.exports.initMenu = (cb) => {
    const templete = TEMPLETE.map((v) => {
        const newValue = v;
        newValue.click = cb;
        return newValue;
    });
    const menu = Menu.buildFromTemplate(templete);
    Menu.setApplicationMenu(menu);
};
