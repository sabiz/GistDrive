'use strict';

const markdownIt = require('markdown-it');
const highlightJs = require('highlight.js');

const markdown = new markdownIt({
    highlight: (str,lang)=>{
        if(lang && hilightJs.getLanguage(lang)) {
            return hilightJs.hilight(lang, str, true).value;
        }
        return '';
    }
});

const doc = markdown.render("#TEST :+1:");
console.log(doc)

