import { z } from 'zod';

export const createPatientSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Patient name is required.' }),
    age: z.number({ required_error: 'Age is required.' }).min(0).max(120),
    gender: z.enum(['Male', 'Female', 'Other'], { required_error: 'Gender must be Male, Female, or Other.' }),
    phone: z.string({ required_error: 'Phone number is required.' }),
    email: z.string({ required_error: 'Email is required.' }).email('Please enter a valid email.'),
    address: z.string({ required_error: 'Address is required.' }),
    bloodGroup: z.string({ required_error: 'Blood group is required.' }),
    diagnosis: z.string({ required_error: 'Primary diagnosis details are required.' }),
    admissionDate: z.string({ required_error: 'Admission date is required.' }),
    status: z.enum(['Admitted', 'Discharged', 'Outpatient']).default('Outpatient'),
    user: z.string().optional(),
  }),
});

export const updatePatientSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().min(0).max(120).optional(),
    gender: z.enum(['Male', 'Female', 'Other']).optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
    bloodGroup: z.string().optional(),
    diagnosis: z.string().optional(),
    admissionDate: z.string().optional(),
    status: z.enum(['Admitted', 'Discharged', 'Outpatient']).optional(),
  }),
  params: z.object({
    id: z.string({ required_error: 'Patient record ID parameter is required.' }),
  }),
});
