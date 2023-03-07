import bcrypt from 'bcrypt';
import { type Request, type Response } from 'express';

import prisma from '../../loaders/prisma';
import {
  type TypeEmployeeLoginBody,
  type TypeEmployeeRegisterBody,
} from '../validators/employee.validator';

const createEmployee = async (req: Request, res: Response) => {
  const data = req.body as TypeEmployeeRegisterBody;
  try {
    const employee = await prisma.employee.create({
      data: {
        ...data,
        password: bcrypt.hashSync(data.password, 10),
      },
    });
    return res.status(200).json({
      message: 'Employee created successfully',
      data: {
        ...employee,
        password: undefined,
      },
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const loginEmployee = async (req: Request, res: Response) => {
  const data = req.body as TypeEmployeeLoginBody;
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    if (!bcrypt.compareSync(data.password, employee.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    return res.status(200).json(employee);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export { createEmployee, loginEmployee };
