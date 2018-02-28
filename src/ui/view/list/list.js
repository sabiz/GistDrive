const Vue = require('../../../../node_modules/vue/dist/vue');

const list = new Vue({
    el: '#list',
    data: {
        items: [], /* {description:'',name:'',id:''} */
        callBack: null,
    },
    methods: {
        onItemClick: (index) => {
            if (list.callBack && list.items[index]) {
                list.callBack(list.items[index]);
            }
        },
    },
});

module.exports.registerItemClick = (callBack) => {
    list.callBack = callBack;
};

module.exports.update = (items) => {
    list.items = [].concat(items);
};

