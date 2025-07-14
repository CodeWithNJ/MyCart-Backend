import { Request, Response } from 'express';
import { AppError } from '../utils/AppError';
import prisma from '../lib/prisma';
import { hashUserPasswordInput } from '../utils/hashUserPasswordInput';
import { AppSuccess } from '../interfaces/appSuccess.interface';

export const userSignup = async (req: Request, res: Response): Promise<any> => {
  const { fullName, username, email, password, gender, dob } = req.body;

  // Check if required fields are missing.
  if (!fullName || !password || !email || !password) {
    return res.status(400).json(new AppError('Required fields missing', 400));
  }

  const userExists = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (userExists) {
    return res.status(409).json(new AppError('User already exists.', 409));
  }

  const hashedPassword = await hashUserPasswordInput(password);

  const newUser = await prisma.user.create({
    data: {
      fullName,
      username,
      email,
      password: hashedPassword,
      refreshToken: null,
      gender: gender ? gender : null,
      dob: dob ? new Date(dob) : null,
    },
  });

  const response: AppSuccess<object> = {
    success: true,
    statusCode: 201,
    message: 'New user created successfully.',
    data: newUser,
  };

  return res.status(201).json(response);
};
