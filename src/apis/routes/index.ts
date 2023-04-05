import { Router } from 'express';

import userRoutes from './user';

const mainRouter = Router();

mainRouter.use('/user', userRoutes);

export default mainRouter;
