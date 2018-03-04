const marked = require('marked');
const highlightJs = require('highlight.js');
const emojione = require('emojione');
const Vue = require('../../../../node_modules/vue/dist/vue');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
    highlight: str => highlightJs.highlightAuto(str).value,
});

Vue.component('gist-preview', {
    template: '<div v-html="rendered"></div>',
    props: { source: String },
    data: () => ({ rendered: this.items }),
    watch: {
        source(v) {
            this.rendered = marked(emojione.toImage(v));
        },
    },
});
