import { Router } from 'express';
import { PrescriptionController } from '../controllers/prescription.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { createPrescriptionSchema, updatePrescriptionSchema } from '../validators/prescription.validator';

const router = Router();
const controller = new PrescriptionController();

router.use(protect);

router.post(
  '/',
  restrictTo('admin', 'doctor'),
  validateRequest(createPrescriptionSchema),
  controller.create
);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.put(
  '/:id',
  restrictTo('admin', 'doctor'),
  validateRequest(updatePrescriptionSchema),
  controller.update
);

router.delete(
  '/:id',
  restrictTo('admin'),
  controller.delete
);

export default router;
