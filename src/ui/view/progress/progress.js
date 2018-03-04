const Vue = require('../../../../node_modules/vue/dist/vue');

Vue.component('modal-progress', {
    template: '<div class="modal" v-if="isShow">\
                <div class="la-line-scale-pulse-out-rapid">\
                    <div></div>\
                    <div></div>\
                    <div></div>\
                    <div></div>\
                    <div></div>\
                </div>\
                </div>',
    props: { isShow: Boolean },
});
