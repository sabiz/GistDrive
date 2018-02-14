const MarkdownIt = require('markdown-it');
const highlightJs = require('highlight.js');
const Vue = require('../../../../node_modules/vue/dist/vue');

const markdownRender = new MarkdownIt({
    breaks: true,
    linkify: true,
    highlight: (str, lang) => {
        if (lang) {
            return highlightJs.highlight(lang, str, true).value;
        }
        return str;
    },
});


const markdown = new Vue({
    el: '#markdown',
    data: {
        source: '',
        rendered: '',
    },
    watch: {
        source: (val) => {
            markdown.rendered = markdownRender.render(val);
        },
    },
});

module.exports.preview = (mdText) => {
    markdown.source = mdText;
};
