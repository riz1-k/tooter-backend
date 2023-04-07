import { type User } from '@prisma/client';
import { type NextFunction, type Request, type Response } from 'express';
import { verify } from 'jsonwebtoken';

import env from '../../loaders/env';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.signedCookies;
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  try {
    const payload = verify(token, env.JWT_SECRET);
    if (!payload) return res.status(401).json({ message: 'Unauthorized' });
    req.user = payload as unknown as User['id'];
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default verifyToken;
