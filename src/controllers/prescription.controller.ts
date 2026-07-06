import { Request, Response, NextFunction } from 'express';
import { PrescriptionService } from '../services/prescription.service';

export class PrescriptionController {
  private readonly prescriptionService = new PrescriptionService();

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const prescription = await this.prescriptionService.createPrescription(req.body);
      res.status(201).json({
        status: 'success',
        message: 'Prescription written successfully.',
        data: prescription,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const prescriptions = await this.prescriptionService.getAllPrescriptions();
      res.status(200).json({
        status: 'success',
        data: prescriptions,
      });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const prescription = await this.prescriptionService.getPrescriptionById(req.params.id);
      res.status(200).json({
        status: 'success',
        data: prescription,
      });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const prescription = await this.prescriptionService.updatePrescription(req.params.id, req.body);
      res.status(200).json({
        status: 'success',
        message: 'Prescription record updated successfully.',
        data: prescription,
      });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.prescriptionService.deletePrescription(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'Prescription record deleted successfully.',
      });
    } catch (error) {
      next(error);
    }
  };
}
export default PrescriptionController;
