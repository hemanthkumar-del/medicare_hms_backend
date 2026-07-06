import { Router } from 'express';
import { PatientController } from '../controllers/patient.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { createPatientSchema, updatePatientSchema } from '../validators/patient.validator';

const router = Router();
const controller = new PatientController();

router.use(protect);

router.post(
  '/',
  restrictTo('admin', 'doctor'),
  validateRequest(createPatientSchema),
  controller.create
);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.put(
  '/:id',
  restrictTo('admin', 'doctor'),
  validateRequest(updatePatientSchema),
  controller.update
);

router.delete(
  '/:id',
  restrictTo('admin'),
  controller.delete
);

export default router;
