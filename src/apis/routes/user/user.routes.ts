import { Router } from 'express';

import zodValidator from '../../../utils/schemaValidator';
import {
  createEmployee,
  loginEmployee,
} from '../../controllers/employee.controller';
import {
  validateEmployeeLogin,
  validateEmployeeRegister,
} from '../../validators/employee.validator';
const userAuthRouter = Router();

userAuthRouter.post(
  '/register',
  zodValidator(validateEmployeeRegister),
  createEmployee
);
userAuthRouter.post(
  '/login',
  zodValidator(validateEmployeeLogin),
  loginEmployee
);

export default userAuthRouter;
