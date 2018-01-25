'use strict'

const crypto = require('crypto')

const ALGORITHM = 'aes-256-ctr';

module.exports.encryptString = (value,key)=>{
    const cipher = crypto.createCipher(ALGORITHM, key);
    const encrypted = cipher.update(value, 'utf-8', 'base64');
    return encrypted + cipher.final('base64');
}

module.exports.decryptString = (value,key)=>{
    const decipher = crypto.createDecipher(ALGORITHM, key);
    const decrypted = decipher.update(value, 'base64', 'utf-8');
    return decrypted + decipher.final('utf-8');
}