const { remote } = require('electron');

const { Menu } = remote;

const Vue = require('../../../../node_modules/vue/dist/vue');

Vue.component('title-bar', {
    template: '<div>\
                <i class="fas fa-bars" @click="menu"></i>\
                <span>{{title}}</span>\
                <i class="fas fa-window-minimize" @click="minimize"></i>\
                <i class="fas fa-power-off" @click="close"></i>\
               </div>',
    props: { title: String },
    methods: {
        close() {
            const w = remote.getCurrentWindow();
            w.close();
        },
        minimize() {
            const w = remote.getCurrentWindow();
            w.minimize();
        },
        menu(e) {
            e.stopPropagation();
            const menu = Menu.getApplicationMenu();
            menu.popup({
                x: e.pageX,
                y: e.pageY,
            });
        },
    },
});
