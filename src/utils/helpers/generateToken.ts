import { sign } from 'jsonwebtoken';

import env from '../../loaders/env';

const generateToken = async (userId: string) => {
  return sign({ userId }, env.JWT_SECRET, { expiresIn: '7 days' });
};

export default generateToken;
