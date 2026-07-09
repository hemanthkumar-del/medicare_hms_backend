import { initializeApp, getApps, cert, applicationDefault } from 'firebase-admin/app';
import { logger } from '../utils/logger';

export const initializeFirebase = (): void => {
  if (getApps().length > 0) return;

  try {
    const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (serviceAccountEnv) {
      const trimmedEnv = serviceAccountEnv.trim();
      if (trimmedEnv.startsWith('<') || trimmedEnv.startsWith('YOUR_') || trimmedEnv.includes('paste')) {
        throw new Error('FIREBASE_SERVICE_ACCOUNT contains placeholder text instead of valid Firebase Admin SDK JSON credentials.');
      }
      const serviceAccount = JSON.parse(trimmedEnv);
      initializeApp({
        credential: cert(serviceAccount),
      });
      logger.info('Firebase Admin SDK initialized successfully using service account credentials.');
    } else {
      // Fallback
      initializeApp({
        credential: applicationDefault(),
      });
      logger.info('Firebase Admin SDK initialized using application default credentials.');
    }
  } catch (error: any) {
    logger.error(`Firebase Admin SDK initialization failed: ${error.message}`);
    throw error;
  }
};

export default initializeFirebase;
