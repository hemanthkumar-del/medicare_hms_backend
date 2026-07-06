import { Request, Response, NextFunction } from 'express';
import { MedicineService } from '../services/medicine.service';

export class MedicineController {
  private readonly medicineService = new MedicineService();

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const medicine = await this.medicineService.createMedicine(req.body);
      res.status(201).json({
        status: 'success',
        message: 'Medicine added to stock successfully.',
        data: medicine,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const medicines = await this.medicineService.getAllMedicines();
      res.status(200).json({
        status: 'success',
        data: medicines,
      });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const medicine = await this.medicineService.getMedicineById(req.params.id);
      res.status(200).json({
        status: 'success',
        data: medicine,
      });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const medicine = await this.medicineService.updateMedicine(req.params.id, req.body);
      res.status(200).json({
        status: 'success',
        message: 'Medicine stock updated successfully.',
        data: medicine,
      });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.medicineService.deleteMedicine(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'Medicine removed from stock successfully.',
      });
    } catch (error) {
      next(error);
    }
  };
}
export default MedicineController;
