const Vue = require('../../../../node_modules/vue/dist/vue');


Vue.component('gist-list', {
    template: '<div class="side-panel">\
                <ul>\
                    <li v-for="(item, index) in items" v-on:click="onItemClick(index)">\
                        {{ item.name }}\
                    </li>\
                </ul>\
                </div>',
    props: { items: Array /* {description:'',name:'',id:''} */ },
    methods: {
        onItemClick: (index) => {
            if (this.items[index]) {
                this.$emit('itemClick', this.items[index]);
            }
        },
    },
    mounted() {
        console.log(this.items);
    },
});

module.exports.update = (items) => {
    list.items = [].concat(items);
};

