import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required.' }).min(2, 'Name must be at least 2 characters.'),
    email: z.string({ required_error: 'Email is required.' }).email('Please enter a valid email address.'),
    password: z.string({ required_error: 'Password is required.' }).min(6, 'Password must be at least 6 characters.'),
    phone: z.string({ required_error: 'Phone number is required.' }),
    role: z.enum(['admin', 'doctor', 'patient']).default('patient'),
    profileImageUrl: z.string().url('Invalid image URL.').optional().nullable(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required.' }).email('Please enter a valid email address.'),
    password: z.string({ required_error: 'Password is required.' }),
  }),
});
