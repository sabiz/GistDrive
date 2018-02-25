const MARKDOWN_SAMPLE = require('fs').readFileSync(require('path').join(__dirname, 'dummy.md'), 'utf-8');

function Gists() {}

Gists.prototype.list = (opt, cb) => {
    const res = [
        { id: '1234567890', description: 'DUMMY1_DESC', files: { DUMMY1: {} } }, { id: '1234567890', description: 'DUMMY2_DESC', files: { DUMMY2: {} } },
        { id: '1234567890', description: 'DUMMY3_DESC', files: { DUMMY3: {} } }, { id: '1234567890', description: 'DUMMY4_DESC', files: { DUMMY4: {} } },
        { id: '1234567890', description: 'DUMMY5_DESC', files: { DUMMY5: {} } }, { id: '1234567890', description: 'DUMMY6_DESC', files: { DUMMY6: {} } },
        { id: '1234567890', description: 'DUMMY7_DESC', files: { DUMMY7: {} } }, { id: '1234567890', description: 'DUMMY8_DESC', files: { DUMMY8: {} } },
        { id: '1234567890', description: 'DUMMY9_DESC', files: { DUMMY9: {} } }, { id: '1234567890', description: 'DUMMY10_DESC', files: { DUMMY10: {} } },
        { id: '1234567890', description: 'DUMMY1_DESC', files: { DUMMY1: {} } }, { id: '1234567890', description: 'DUMMY2_DESC', files: { DUMMY2: {} } },
        { id: '1234567890', description: 'DUMMY3_DESC', files: { DUMMY3: {} } }, { id: '1234567890', description: 'DUMMY4_DESC', files: { DUMMY4: {} } },
        { id: '1234567890', description: 'DUMMY5_DESC', files: { DUMMY5: {} } }, { id: '1234567890', description: 'DUMMY6_DESC', files: { DUMMY6: {} } },
        { id: '1234567890', description: 'DUMMY7_DESC', files: { DUMMY7: {} } }, { id: '1234567890', description: 'DUMMY8_DESC', files: { DUMMY8: {} } },
        { id: '1234567890', description: 'DUMMY9_DESC', files: { DUMMY9: {} } }, { id: '1234567890', description: 'DUMMY10_DESC', files: { DUMMY10: {} } },
    ];
    cb(null, res);
};

Gists.prototype.download = (opt, cb) => {
    const res = {
        id: '1234567890',
        files: {},
    };
    for (let i = 0; i < 10; i += 1) {
        res.files[`DUMMY${i}`] = {
            language: 'memo',
            content: MARKDOWN_SAMPLE,
        };
    }
    cb(null, res);
};

module.exports = Gists;
