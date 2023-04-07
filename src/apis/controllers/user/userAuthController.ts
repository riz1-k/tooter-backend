import { compare, hash } from 'bcrypt';
import { type Request, type Response } from 'express';

import prisma from '../../../loaders/prisma';
import generateToken from '../../../utils/helpers/generateToken';
import {
  type TypeUserLoginValidator,
  type TypeUserRegisterValidator,
} from '../../validators/user/user-auth.validator';

const userRegister = async (req: Request, res: Response) => {
  try {
    const { password } = req.body as TypeUserRegisterValidator;
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 86400,
      signed: true,
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  } finally {
    res.end();
  }
};

const userLogin = async (req: Request, res: Response) => {
  try {
    const { usernameOrEmail, password } = req.body as TypeUserLoginValidator;
    const user = await prisma.user.findUnique({
      where: {
        username: usernameOrEmail,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = generateToken({ id: user.id });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 86400,
    });

    res.status(200).json({ message: 'User logged in successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  } finally {
    res.end();
  }
};

const userLogout = async (_req: Request, res: Response) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  } finally {
    res.end();
  }
};

export { userLogin, userLogout, userRegister };
