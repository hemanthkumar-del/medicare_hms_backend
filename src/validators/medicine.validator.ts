import { z } from 'zod';

export const createMedicineSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Medicine name is required.' }),
    category: z.string({ required_error: 'Medicine category (e.g. Capsule, Tablet) is required.' }),
    strength: z.string({ required_error: 'Medicine strength layout (e.g. 500mg) is required.' }),
    stock: z.number({ required_error: 'Stock units count is required.' }).min(0),
    price: z.number({ required_error: 'Item price is required.' }).positive(),
    manufacturer: z.string({ required_error: 'Manufacturer brand name is required.' }),
  }),
});

export const updateMedicineSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    category: z.string().optional(),
    strength: z.string().optional(),
    stock: z.number().min(0).optional(),
    price: z.number().positive().optional(),
    manufacturer: z.string().optional(),
  }),
  params: z.object({
    id: z.string({ required_error: 'Medicine item ID is required.' }),
  }),
});
