import { compare, hash } from 'bcrypt';
import { type Request, type Response } from 'express';
import { sign } from 'jsonwebtoken';

import env from '../../../loaders/env';
import prisma from '../../../loaders/prisma';
import {
  type TypeUserLoginValidator,
  type TypeUserRegisterValidator,
} from '../../validators/user/user-auth.validator';

const userRegister = async (req: Request, res: Response) => {
  try {
    const { username, displayName, email, password } =
      req.body as TypeUserRegisterValidator;
    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        displayName,
        email,
        password: hashedPassword,
      },
    });
    const token = sign(
      {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
      },
      env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 86400,
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

    const token = sign(
      {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
      },
      env.JWT_SECRET,
      { expiresIn: '1d' }
    );

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
