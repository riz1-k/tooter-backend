import { Router } from 'express';

import userAuthRoutes from './user-auth.routes';

const userRoutes = Router();

userRoutes.use('/auth', userAuthRoutes);

export default userRoutes;
