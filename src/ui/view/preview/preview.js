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

const markdown = new Vue({
    el: '#markdown',
    data: {
        source: '',
        rendered: '',
    },
    watch: {
        source: (val) => {
            markdown.rendered = marked(val);
        },
    },
});

module.exports.preview = (mdText) => {
    markdown.source = emojione.toImage(mdText);
};
