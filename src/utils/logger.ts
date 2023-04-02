import winston from 'winston';

import env from '../loaders/env';

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize({
          all: true,
        }),
        winston.format.timestamp({
          format: 'YYYY-MM-DD hh:mm:ss',
        }),
        winston.format.simple(),
        winston.format.printf((info: any) => {
          return `[${info.timestamp as string}] ${info.level as string}: ${
            info.message as string
          } ${info.metaData ? JSON.stringify(info.meta) : ''}`;
        })
      ),
    }),
  ],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.metadata({
      fillExcept: ['message', 'level', 'timestamp', 'label'],
    })
  ),
});

if (env.NODE_ENV === 'production') {
  logger.add(
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    })
  );
  logger.add(
    new winston.transports.File({
      filename: 'logs/combined.log',
    })
  );
}

if (env.NODE_ENV === 'development') {
  logger.debug('Logging initialized at debug level');
}

export default logger;
