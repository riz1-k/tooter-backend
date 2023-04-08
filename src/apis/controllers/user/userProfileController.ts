import { type S3 } from 'aws-sdk';
import { type Request, type Response } from 'express';

import s3 from '../../../configs/S3';
import env from '../../../loaders/env';
import prisma from '../../../loaders/prisma';
import { type ImageUploadSchema } from '../../validators/user/user-profile.validator';

const updateUserProfileImage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { fileName, url } = req.body as ImageUploadSchema;

  const user = req.user;

  if (!user) {
    res.status(401).json({
      message: 'Unauthorized',
    });
    return res.end();
  }

  try {
    const profilePicture = await prisma.profilePicture.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (profilePicture) {
      const params: S3.DeleteObjectRequest = {
        Bucket: env.WASABI_BUCKET_NAME,
        Key: profilePicture.id.toString(),
      };
      s3.deleteObject(params);
    }

    const newProfilePicture = await prisma.profilePicture.create({
      data: {
        fileName,
        url,
        userId: user.id,
      },
    });

    return res.status(200).json({
      message: 'Profile picture updated',
      profilePicture: newProfilePicture,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Something went wrong',
    });
  } finally {
    res.end();
  }
};

const removeUserProfileImage = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = req.user;

  if (!user) {
    res.status(401).json({
      message: 'Unauthorized',
    });

    return res.end();
  }

  try {
    const profilePicture = await prisma.profilePicture.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (profilePicture) {
      const params: S3.DeleteObjectRequest = {
        Bucket: env.WASABI_BUCKET_NAME,
        Key: profilePicture.id.toString(),
      };

      s3.deleteObject(params);
    }

    await prisma.profilePicture.delete({
      where: {
        userId: user.id,
      },
    });

    return res.status(200).json({
      message: 'Profile picture removed',
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: 'Something went wrong',
    });
  } finally {
    res.end();
  }
};

export { removeUserProfileImage, updateUserProfileImage };
