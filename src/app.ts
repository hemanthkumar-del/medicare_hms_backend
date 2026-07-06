import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';

import { logger } from './utils/logger';
import { errorHandler } from './middleware/error.middleware';

import authRouter from './routes/auth.routes';
import patientRouter from './routes/patient.routes';
import doctorRouter from './routes/doctor.routes';
import appointmentRouter from './routes/appointment.routes';
import medicineRouter from './routes/medicine.routes';
import prescriptionRouter from './routes/prescription.routes';

import swaggerDocument from './config/swagger.json';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(
  cors({
    origin: true, // Allow all origins in dev, customize for production as needed
    credentials: true,
  })
);

// Body and Cookie Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging Middleware (stream morgan to winston)
app.use(
  morgan('dev', {
    stream: {
      write: (message: string) => logger.http(message.trim()),
    },
  })
);

// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health Check Endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy.',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
});

// App Router Modules Mapping
app.use('/api/auth', authRouter);
app.use('/api/patients', patientRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/medicines', medicineRouter);
app.use('/api/prescriptions', prescriptionRouter);

// Fallback Route handler (Not Found)
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: `Resource not found: ${req.method} ${req.originalUrl}`,
  });
});

// Centralized Error Middleware (must be final)
app.use(errorHandler);

export default app;
