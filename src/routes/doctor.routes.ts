import { Router } from 'express';
import { DoctorController } from '../controllers/doctor.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { createDoctorSchema, updateDoctorSchema } from '../validators/doctor.validator';

const router = Router();
const controller = new DoctorController();

router.use(protect);

router.post(
  '/',
  restrictTo('admin'),
  validateRequest(createDoctorSchema),
  controller.create
);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.put(
  '/:id',
  restrictTo('admin', 'doctor'),
  validateRequest(updateDoctorSchema),
  controller.update
);

router.delete(
  '/:id',
  restrictTo('admin'),
  controller.delete
);

export default router;
