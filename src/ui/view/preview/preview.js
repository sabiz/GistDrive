'use strict';

const markdownIt = require('markdown-it');
const highlightJs = require('highlight.js');

const markdown = new markdownIt({
    breaks: true,
    linkify: true,
    highlight: (str,lang)=>{
        if(lang) {
            return highlightJs.highlight(lang, str, true).value;
        }
        return str;
    }
});


module.exports.preview = (mdText)=>{
    return markdown.render(mdText);
}
