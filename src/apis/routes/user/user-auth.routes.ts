import { Router } from 'express';

import schemaValidator from '../../../utils/schemaValidator';
import {
  userLogin,
  userRegister,
} from '../../controllers/user/userAuthController';
import {
  userLoginValidator,
  userRegisterValidator,
} from '../../validators/user/user-auth.validator';

const userAuthRoutes = Router();

userAuthRoutes.post(
  '/register',
  schemaValidator(userRegisterValidator),
  userRegister
);
userAuthRoutes.post('/login', schemaValidator(userLoginValidator), userLogin);

export default userAuthRoutes;
