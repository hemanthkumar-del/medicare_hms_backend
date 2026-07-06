import { Request, Response, NextFunction } from 'express';
import { DoctorService } from '../services/doctor.service';

export class DoctorController {
  private readonly doctorService = new DoctorService();

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const doctor = await this.doctorService.createDoctor(req.body);
      res.status(201).json({
        status: 'success',
        message: 'Doctor record created successfully.',
        data: doctor,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const doctors = await this.doctorService.getAllDoctors();
      res.status(200).json({
        status: 'success',
        data: doctors,
      });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const doctor = await this.doctorService.getDoctorById(req.params.id);
      res.status(200).json({
        status: 'success',
        data: doctor,
      });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const doctor = await this.doctorService.updateDoctor(req.params.id, req.body);
      res.status(200).json({
        status: 'success',
        message: 'Doctor record updated successfully.',
        data: doctor,
      });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.doctorService.deleteDoctor(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'Doctor record deleted successfully.',
      });
    } catch (error) {
      next(error);
    }
  };
}
export default DoctorController;
