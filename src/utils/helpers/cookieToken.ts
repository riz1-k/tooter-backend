import { type CookieOptions, type Response } from 'express';

import env from '../../loaders/env';
import generateToken from './generateToken';

const cookieToken = async (userId: string, res: Response) => {
  const token = await generateToken(userId);
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    secure: env.NODE_ENV === 'production',
    domain: env.NODE_ENV === 'production' ? '.herokuapp.com' : 'localhost',
    signed: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  res.status(200).cookie('token', token, cookieOptions).json({
    success: true,
    token,
  });
};

export default cookieToken;
