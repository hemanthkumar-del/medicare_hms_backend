import { Router } from 'express';
import { AppointmentController } from '../controllers/appointment.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { createAppointmentSchema, updateAppointmentStatusSchema } from '../validators/appointment.validator';

const router = Router();
const controller = new AppointmentController();

router.use(protect);

router.post(
  '/',
  validateRequest(createAppointmentSchema),
  controller.create
);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.put(
  '/:id/status',
  restrictTo('admin', 'doctor'),
  validateRequest(updateAppointmentStatusSchema),
  controller.updateStatus
);

router.delete(
  '/:id',
  restrictTo('admin'),
  controller.delete
);

export default router;
