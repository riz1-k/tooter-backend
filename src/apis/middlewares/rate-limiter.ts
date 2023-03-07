import type { NextFunction, Request, Response } from 'express';
import {
  type IRateLimiterMongoOptions,
  RateLimiterMongo,
} from 'rate-limiter-flexible';

import prisma from '../../loaders/prisma';

const mongoConn = prisma.$connect();

const opts: IRateLimiterMongoOptions = {
  storeClient: mongoConn,
  tableName: 'rateLimits',
  points: 100,
  duration: 60,
};

export default (req: Request, res: Response, next: NextFunction) => {
  const rateLimiterMongo = new RateLimiterMongo(opts);
  rateLimiterMongo
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch((err) =>
      res.status(429).json({
        message: 'Too Many Requests',
        error: err,
      })
    );
};
