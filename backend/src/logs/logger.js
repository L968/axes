const log4js = require('log4js');

log4js.configure({
    appenders: {
        "file-appender": {
            type: "file",
            filename: "./src/logs/log-exception.log",
            layout: {
                type: "pattern",
                pattern: "%d{dd/MM/yyyy hh\:mm\:ss} %p at line %l:%o - %m%n"
            }
        }
    },
    categories: {
        default: {
            appenders: ["file-appender"],
            enableCallStack: true,
            level: "info"
        }
    }
});

module.exports = log4js.getLogger();;