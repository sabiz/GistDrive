const log4js = require('log4js');

const logger = log4js.getLogger();
const LOG_LAYOUT = {
    type: 'pattern',
    pattern: '%d{yyyy-MM-dd-hh:mm:ss} [%p] - %m',
};

if (process.env.NODE_ENV === 'production') {
    log4js.configure({
        appenders: {
            out: {
                type: 'file',
                filename: 'gistdrive.log',
                maxLogSize: `${100 * 1024 * 1024}`,
                backups: 5,
                compress: true,
                layout: LOG_LAYOUT,
            },
        },
        categories: {
            default: {
                appenders: ['out'],
                level: 'all',
            },
        },
    });
} else {
    log4js.configure({
        appenders: {
            out: {
                type: 'stdout',
                layout: LOG_LAYOUT,
            },
        },
        categories: {
            default: {
                appenders: ['out'],
                level: 'all',
            },
        },
    });
}

module.exports.trace = (msg, ...args) => {
    logger.trace(msg, ...args);
};

module.exports.debug = (msg, ...args) => {
    logger.debug(msg, ...args);
};

module.exports.info = (msg, ...args) => {
    logger.info(msg, ...args);
};

module.exports.warn = (msg, ...args) => {
    logger.warn(msg, ...args);
};

module.exports.error = (msg, ...args) => {
    logger.error(msg, ...args);
};

module.exports.fatal = (msg, ...args) => {
    logger.fatal(msg, ...args);
};

