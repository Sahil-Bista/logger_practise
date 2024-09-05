const { create } = require('domain');
const winston = require('winston');
const { combine, timestamp, json } = winston.format;
require('winston-daily-rotate-file');

const fileRotateTransport= new winston.transports.DailyRotateFile({
  filename: 'combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
})

//causes logs with a minimum severity of error to a separate file.
const logger = winston.createLogger({
    level : 'info',
    defaultMeta:{
        service : 'admin-service'
    },
    format : combine(timestamp(),json()),
    transports : [
    //     new winston.transports.File({
    //     filename : 'combined.log',
    // }),
    // new winston.transports.File({
    //     filename: 'app-error.log',
    //     level: 'error',
    //   }),
        fileRotateTransport
    ],
});


// fired when a log file is created
fileRotateTransport.on('new', (filename) => {});
// fired when a log file is rotated
fileRotateTransport.on('rotate', (oldFilename, newFilename) => {});
// fired when a log file is archived
fileRotateTransport.on('archive', (zipFilename) => {});
// fired when a log file is deleted
fileRotateTransport.on('logRemoved', (removedFilename) => {});

logger.info('Info message');
logger.error('Error message');
logger.warn('Warning message');

