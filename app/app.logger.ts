import winston from 'winston';

const defaultCombine = winston.format.combine(
    winston.format.label({ label: '[logger]' }),
    winston.format.timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
    winston.format.printf((info) => `${info.label} - ${info.timestamp} ${info.level}: ${info.message}`)
);

export const logger = winston.createLogger({
    level: 'debug',
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/all.log',
            handleExceptions: true,
            format: winston.format.json(),
            maxsize: 6291456, //6mb,
            maxFiles: 5

            
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({all: true}),
                defaultCombine
            )
        })
    ],
    exitOnError: false

})

export default logger;