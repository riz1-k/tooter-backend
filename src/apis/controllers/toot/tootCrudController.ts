import { type Request, type Response } from 'express';

import prisma from '../../../loaders/prisma';
import {
  type TypeCreateTootSchema,
  type TypeUpdateTootSchema,
} from '../../validators/toot/toot-crud.validator';

const createNewToot = async (req: Request, res: Response) => {
  try {
    const body = req.body as TypeCreateTootSchema;
    const userId = req.user;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        toots: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await prisma.toot.create({
      data: {
        content: body.content,
        visibility: body.visibility,
        author: {
          connect: {
            id: user.id,
          },
        },
        sensitiveContent: body.sensitiveContent,
      },
    });

    res.status(201).json({ message: 'Toot created successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  } finally {
    res.end();
  }
};

const updateToot = async (req: Request, res: Response) => {
  try {
    const body = req.body as TypeUpdateTootSchema;
    const userId = req.user;
    const tootId = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        toots: true,
      },
    });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    if (!user.toots.some((toot) => toot.id === Number(tootId))) {
      res
        .status(403)
        .json({ message: 'You are not authorized to update this toot' });
      return;
    }
    const toot = await prisma.toot.findUnique({
      where: {
        id: Number(tootId),
      },
      select: {
        id: true,
      },
    });
    if (!toot) {
      res.status(404).json({ message: 'Toot not found' });
      return;
    }
    await prisma.toot.update({
      where: {
        id: Number(tootId),
      },
      data: {
        content: body.content,
        visibility: body.visibility,
        sensitiveContent: body.sensitiveContent,
      },
    });
    res.status(200).json({ message: 'Toot updated successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  } finally {
    res.end();
  }
};

const deleteToot = async (req: Request, res: Response) => {
  try {
    const userId = req.user;
    const tootId = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        toots: true,
      },
    });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    if (!user.toots.some((toot) => toot.id === Number(tootId))) {
      res
        .status(403)
        .json({ message: 'You are not authorized to delete this toot' });
      return;
    }

    const toot = await prisma.toot.findUnique({
      where: {
        id: Number(tootId),
      },
      select: {
        id: true,
      },
    });
    if (!toot) {
      res.status(404).json({ message: 'Toot not found' });
      return;
    }

    await prisma.toot.delete({
      where: {
        id: Number(tootId),
      },
    });

    res.status(200).json({ message: 'Toot deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  } finally {
    res.end();
  }
};

export { createNewToot, deleteToot, updateToot };
