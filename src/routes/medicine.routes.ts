import { Router } from 'express';
import { MedicineController } from '../controllers/medicine.controller';
import { protect, restrictTo } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validation.middleware';
import { createMedicineSchema, updateMedicineSchema } from '../validators/medicine.validator';

const router = Router();
const controller = new MedicineController();

router.use(protect);

router.post(
  '/',
  restrictTo('admin', 'doctor'),
  validateRequest(createMedicineSchema),
  controller.create
);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.put(
  '/:id',
  restrictTo('admin', 'doctor'),
  validateRequest(updateMedicineSchema),
  controller.update
);

router.delete(
  '/:id',
  restrictTo('admin'),
  controller.delete
);

export default router;
