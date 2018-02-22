// Thanks :) https://qiita.com/LightSpeedC/items/5c1edc2c974206c743f4
const http = require('http');
const url = require('url');
const net = require('net');

const HTTP_PORT = process.argv[2] || 8080; // internal proxy server port
const PROXY_URL = process.argv[3] || null; // external proxy server URL
const PROXY_HOST = PROXY_URL ? url.parse(PROXY_URL).hostname : null;
const PROXY_PORT = PROXY_URL ? (url.parse(PROXY_URL).port || 80) : null;


function onErr(err, msg, lurl, soc) {
    if (soc) soc.end();
    console.log('%s %s: %s', new Date().toLocaleTimeString(), msg, lurl, err); // eslint-disable-line
}

http.createServer((cliReq, cliRes) => {
    let svrSoc;
    const cliSoc = cliReq.socket;
    const x = url.parse(cliReq.url);
    const svrReq = http.request(
        {
            host: PROXY_HOST || x.hostname,
            port: PROXY_PORT || x.port || 80,
            path: PROXY_URL ? cliReq.url : x.path,
            method: cliReq.method,
            headers: cliReq.headers,
            agent: cliSoc.$agent,
        },
        (svrRes) => {
            svrSoc = svrRes.socket;
            cliRes.writeHead(svrRes.statusCode, svrRes.headers);
            svrRes.pipe(cliRes);
        },
    );
    cliReq.pipe(svrReq);
    svrReq.on('error', (err) => {
        cliRes.writeHead(400, err.message, { 'content-type': 'text/html' });
        cliRes.end(`<h1>${err.message}<br/>${cliReq.url}</h1>`);
        onErr(err, 'svrReq', `${x.hostname}:${x.port || 80}`, svrSoc);
    });
})
    .on('clientError', (err, soc) => onErr(err, 'cliErr', '', soc))
    .on('connect', (cliReq, cliSoc, cliHead) => {
        console.log(`connect - client  target: ${cliReq.url}`); // eslint-disable-line
        const x = url.parse(`https://${cliReq.url}`);
        let svrSoc;
        if (PROXY_URL) {
            const svrReq = http.request({
                host: PROXY_HOST,
                port: PROXY_PORT,
                path: cliReq.ur,
                method: cliReq.method,
                headers: cliReq.headers,
                agent: cliSoc.$agent,
            });
            svrReq.end();
            svrReq.on('connect', (svrRes, svrSoc2, svrHead) => {
                svrSoc = svrSoc2;
                cliSoc.write('HTTP/1.0 200 Connection established\r\n\r\n');
                if (cliHead && cliHead.length) svrSoc.write(cliHead);
                if (svrHead && svrHead.length) cliSoc.write(svrHead);
                svrSoc.pipe(cliSoc);
                cliSoc.pipe(svrSoc);
                svrSoc.on('error', err => onErr(err, 'svrSoc', cliReq.ur, cliSoc));
            });
            svrReq.on('error', err => onErr(err, 'svrRq2', cliReq.ur, cliSoc));
        } else {
            svrSoc = net.connect(x.port || 443, x.hostname, () => {
                cliSoc.write('HTTP/1.0 200 Connection established\r\n\r\n');
                if (cliHead && cliHead.length) svrSoc.write(cliHead);
                cliSoc.pipe(svrSoc);
            });
            svrSoc.pipe(cliSoc);
            svrSoc.on('error', err => onErr(err, 'svrSoc', cliReq.ur, cliSoc));
        }
        cliSoc.on('error', err => onErr(err, 'cliSoc', cliReq.ur, svrSoc));
    })
    .on('connection', (cliSoc) => {
        const localCliSoc = cliSoc;
        localCliSoc.$agent = new http.Agent({ keepAlive: true });
        localCliSoc.$agent.on('error', err => console.log('agent:', err));// eslint-disable-line
    })
    .listen(HTTP_PORT, () =>
        console.log(`http proxy server started on port ${HTTP_PORT} ${(PROXY_URL ? ` -> ${PROXY_HOST}:${PROXY_PORT}` : '')}`)); // eslint-disable-line
