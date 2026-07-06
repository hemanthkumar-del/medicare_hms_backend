import { Request, Response, NextFunction } from 'express';
import { PatientService } from '../services/patient.service';

export class PatientController {
  private readonly patientService = new PatientService();

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const patient = await this.patientService.createPatient(req.body);
      res.status(201).json({
        status: 'success',
        message: 'Patient registered successfully.',
        data: patient,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const patients = await this.patientService.getAllPatients();
      res.status(200).json({
        status: 'success',
        data: patients,
      });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const patient = await this.patientService.getPatientById(req.params.id);
      res.status(200).json({
        status: 'success',
        data: patient,
      });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const patient = await this.patientService.updatePatient(req.params.id, req.body);
      res.status(200).json({
        status: 'success',
        message: 'Patient record updated successfully.',
        data: patient,
      });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.patientService.deletePatient(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'Patient record deleted successfully.',
      });
    } catch (error) {
      next(error);
    }
  };
}
export default PatientController;
