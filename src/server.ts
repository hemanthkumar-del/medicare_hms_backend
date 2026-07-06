import dotenv from 'dotenv';
// Load environment variables before importing app/db
dotenv.config();

import app from './app';
import { connectDB, disconnectDB } from './config/db';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect database
  await connectDB();

  // Start Express listener
  const server = app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    logger.info(`Swagger API Documentation available at http://localhost:${PORT}/api-docs`);
  });

  // Graceful shutdown controls
  const handleExit = async (signal: string) => {
    logger.warn(`Termination signal received (${signal}). Closing connections...`);
    server.close(async () => {
      logger.info('HTTP server closed.');
      await disconnectDB();
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => handleExit('SIGTERM'));
  process.on('SIGINT', () => handleExit('SIGINT'));
};

startServer().catch((error) => {
  logger.error(`Fatal server initialization error: ${error}`);
  process.exit(1);
});
