const fs = require('fs');
const path = require('path');
const crypt = require('./crypt');
const Log = require('./log');

class Config {
    constructor(fileName, options) {
        this.raw = {};
        this.fileName = path.join(process.cwd(), fileName);
        if (options) {
            this.autoSave = options.autoSave || false;
        }
    }

    load() {
        try {
            this.raw = require(this.fileName); // eslint-disable-line
        } catch (e) {
            Log.error(e.code, ' @ Config.load');
            this.raw = {};
            this.save();
        }
        return this.raw;
    }

    save() {
        fs.writeFileSync(this.fileName, JSON.stringify(this.raw, null, ' '));
    }

    get(name) {
        return this.raw[name];
    }

    getAndDecrypt(name, key) {
        let value = this.get(name);
        if (value) {
            value = crypt.decryptString(value, key);
        }
        return value;
    }

    set(name, value) {
        this.raw[name] = value;
        if (this.autoSave) {
            this.save();
        }
    }

    setAndEncrypt(name, value, key) {
        const tmpValue = crypt.encryptString(value, key);
        this.set(name, tmpValue);
    }
}

module.exports = Config;
