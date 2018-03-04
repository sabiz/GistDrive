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

Vue.component('gist-preview', {
    template: '<div v-html="rendered"></div>',
    props: { source: String },
    data: () => ({ rendered: this.items }),
    watch: {
        source(v) {
            this.rendered = markdownRender.render(v);
        },
    },
});
