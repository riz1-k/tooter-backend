import { Router } from 'express';

import userAuthRoutes from './user/user-auth.routes';

const mainRouter = Router();

mainRouter.use('/user/auth', userAuthRoutes);

export default mainRouter;
