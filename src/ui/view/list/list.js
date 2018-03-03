const Vue = require('../../../../node_modules/vue/dist/vue');

Vue.component('gist-list', {
    template: '<div class="side-panel" >\
                <ul>\
                    <li v-for="(item, index) in items" @click="onItemClick(index)">\
                        {{ item.name }}\
                    </li>\
                </ul>\
                </div>',
    props: { items: Array /* {description:'',name:'',id:''} */ },
    data: () => ({ listItem: this.items }),
    methods: {
        onItemClick(index) {
            if (this.items[index]) {
                this.$emit('item-click', this.items[index]);
            }
        },
    },
});

