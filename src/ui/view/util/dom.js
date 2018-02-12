'use strict';

module.exports.contentLoadAction = (func)=>{
    if (document.readyState === 'complete' || document.readyState === 'interactive'){
        func();
    } else{
        document.addEventListener('DOMContentLoaded', func);
    }
};