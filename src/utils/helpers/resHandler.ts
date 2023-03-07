import { type NextFunction, type Request, type Response } from 'express';

import errorCodes from '../lang/errorCodes';
import logger from '../logger';
import ipHelper from './ip-helper';

const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl, body, query, params } = req;
  const { statusCode, data } = res.locals;
  logger.info(
    `Request: ${method} ${originalUrl} ${JSON.stringify(body)} ${JSON.stringify(
      query
    )} ${JSON.stringify(params)}`
  );
  logger.info(`Response: ${statusCode} ${JSON.stringify(data)}`);
  return res.status(statusCode).json(data);
};
