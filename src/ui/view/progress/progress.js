const Vue = require('../../../../node_modules/vue/dist/vue');

Vue.component('modal-progress', {
    template: '<div class="modal-progress">\
                <div class="la-line-scale-pulse-out-rapid"><div></div><div></div><div></div><div></div><div></div></div>\
               </div>',
    data: () => ({ isShow: false }),
});
