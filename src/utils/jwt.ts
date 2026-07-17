import jwt from 'jsonwebtoken';
import { logger } from './logger';

export const generateToken = (payload: { id: string; role: string }): string => {
  const secret = process.env.JWT_SECRET || 'supersecretjwtkeyforfastcuredevdevelopment';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(payload, secret, { expiresIn: expiresIn as any });
};

export const verifyToken = (token: string): { id: string; role: 'admin' | 'doctor' | 'patient' } | null => {
  try {
    const secret = process.env.JWT_SECRET || 'supersecretjwtkeyforfastcuredevdevelopment';
    return jwt.verify(token, secret) as { id: string; role: 'admin' | 'doctor' | 'patient' };
  } catch (error) {
    logger.error(`Token verification failed: ${error}`);
    return null;
  }
};
