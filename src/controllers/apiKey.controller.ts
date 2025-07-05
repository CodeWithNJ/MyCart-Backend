import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { generateSaltAndHashedApiKey } from '../utils/generateRestApiKey';
import { AppSuccess } from '../interfaces/appSuccess.interface';
import { AppError } from '../utils/AppError';

export const generateApiKey = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { permissions } = req.body;

  const allowed = ['admin', 'read_only', 'read_write'];

  if (!permissions) {
    return res
      .status(400)
      .json(new AppError('Missing required fields', 400).toJSON());
  }

  if (!allowed.includes(permissions)) {
    return res
      .status(400)
      .json(new AppError('Invalid permission', 400).toJSON());
  }

  try {
    const { hashedApiKey, salt } = generateSaltAndHashedApiKey();

    const newApiKey = await prisma.restApiKey.create({
      data: {
        hashedKey: hashedApiKey,
        salt,
        permissions,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    const response: AppSuccess<string> = {
      success: true,
      statusCode: 201,
      message: 'API key generated successfully',
      data: newApiKey.hashedKey,
    };

    return res.status(201).json(response);
  } catch (err: any) {
    console.error('Error generating API key:', err);
    return res
      .status(500)
      .json(new AppError('Internal Server Error', 500).toJSON());
  }
};
