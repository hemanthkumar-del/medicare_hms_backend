import { z } from 'zod';

export const createAppointmentSchema = z.object({
  body: z.object({
    patient: z.string({ required_error: 'Patient ObjectId reference is required.' }),
    doctor: z.string({ required_error: 'Doctor ObjectId reference is required.' }),
    date: z.string({ required_error: 'Appointment date is required.' }),
    timeSlot: z.string({ required_error: 'Selected timeslot is required.' }),
    status: z.enum(['Pending', 'Confirmed', 'Cancelled', 'Completed']).default('Pending'),
    notes: z.string().optional(),
  }),
});

export const updateAppointmentStatusSchema = z.object({
  body: z.object({
    status: z.enum(['Pending', 'Confirmed', 'Cancelled', 'Completed'], {
      required_error: 'Status choice is required.',
    }),
  }),
  params: z.object({
    id: z.string({ required_error: 'Appointment ID is required.' }),
  }),
});
