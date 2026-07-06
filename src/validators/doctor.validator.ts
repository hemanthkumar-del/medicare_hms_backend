import { z } from 'zod';

export const createDoctorSchema = z.object({
  body: z.object({
    user: z.string({ required_error: 'User reference ObjectId is required.' }),
    name: z.string({ required_error: 'Physician name is required.' }),
    specialization: z.string({ required_error: 'Clinical specialization is required.' }),
    rating: z.number().min(0).max(5).optional(),
    experience: z.string({ required_error: 'Experience duration label is required.' }),
    availabilityStatus: z.string().optional(),
    imageUrl: z.string().optional(),
    email: z.string({ required_error: 'Email is required.' }).email(),
    phone: z.string({ required_error: 'Office extension phone is required.' }),
    availableSlots: z.array(z.string()).optional(),
    biography: z.string().optional(),
  }),
});

export const updateDoctorSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    specialization: z.string().optional(),
    rating: z.number().min(0).max(5).optional(),
    experience: z.string().optional(),
    availabilityStatus: z.string().optional(),
    imageUrl: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    availableSlots: z.array(z.string()).optional(),
    biography: z.string().optional(),
  }),
  params: z.object({
    id: z.string({ required_error: 'Doctor record ID is required.' }),
  }),
});
