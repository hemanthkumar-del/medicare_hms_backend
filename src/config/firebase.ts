import { initializeApp, getApps, cert, applicationDefault } from 'firebase-admin/app';
import { logger } from '../utils/logger';

export const initializeFirebase = (): void => {
  if (getApps().length > 0) return;

  try {
    const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (serviceAccountEnv) {
      const serviceAccount = JSON.parse(serviceAccountEnv);
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
    logger.warn(`Firebase Admin SDK initialization warning: ${error.message}. Real Google Sign-in verification will fail until credentials are provided in FIREBASE_SERVICE_ACCOUNT env var.`);
  }
};

export default initializeFirebase;
