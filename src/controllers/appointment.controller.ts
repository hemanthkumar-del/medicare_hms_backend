import { Request, Response, NextFunction } from 'express';
import { AppointmentService } from '../services/appointment.service';

export class AppointmentController {
  private readonly appointmentService = new AppointmentService();

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const appointment = await this.appointmentService.bookAppointment(req.body);
      res.status(201).json({
        status: 'success',
        message: 'Appointment booked successfully.',
        data: appointment,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const appointments = await this.appointmentService.getAllAppointments();
      res.status(200).json({
        status: 'success',
        data: appointments,
      });
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const appointment = await this.appointmentService.getAppointmentById(req.params.id);
      res.status(200).json({
        status: 'success',
        data: appointment,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { status } = req.body;
      const appointment = await this.appointmentService.updateAppointmentStatus(req.params.id, status);
      res.status(200).json({
        status: 'success',
        message: 'Appointment status updated successfully.',
        data: appointment,
      });
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.appointmentService.deleteAppointment(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'Appointment deleted successfully.',
      });
    } catch (error) {
      next(error);
    }
  };
}
export default AppointmentController;
