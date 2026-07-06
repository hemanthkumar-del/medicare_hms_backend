import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { UnauthorizedError, ForbiddenError } from '../utils/errors';

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  // 1. Extract from Authorization Header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } 
  // 2. Extract from Cookie Parser
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new UnauthorizedError('Access denied. Please sign in to verify credentials.'));
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return next(new UnauthorizedError('Session has expired. Please sign in again.'));
  }

  req.user = {
    id: decoded.id,
    role: decoded.role,
  };
  return next();
};

export const restrictTo = (...roles: ('admin' | 'doctor' | 'patient')[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ForbiddenError('Access Forbidden. Insufficient permissions.'));
    }
    return next();
  };
};
