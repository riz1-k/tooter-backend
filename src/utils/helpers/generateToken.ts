import { type User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

import env from '../../loaders/env';

const generateToken = (data: { id: User['id'] }) => {
  return sign({ id: data.id }, env.JWT_SECRET, { expiresIn: '1d' });
};

export default generateToken;
