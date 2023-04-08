import { Router } from 'express';

import schemaValidator from '../../../utils/schemaValidator';
import {
  removeUserProfileImage,
  updateUserProfileImage,
} from '../../controllers/user/userProfileController';
import imageUploadSchema from '../../validators/user/user-profile.validator';

const userProfileRoutes = Router();

userProfileRoutes.post(
  '/update-profile-image',
  schemaValidator(imageUploadSchema),
  updateUserProfileImage
);
userProfileRoutes.delete('/remove-profile-image', removeUserProfileImage);

export default userProfileRoutes;
