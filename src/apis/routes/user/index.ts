import { Router } from 'express';

import userAuthRoutes from './user-auth.routes';
import userProfileRoutes from './user-profile.routes';

const userRoutes = Router();

userRoutes.use('/auth', userAuthRoutes);
userRoutes.use('/profile', userProfileRoutes);

export default userRoutes;
