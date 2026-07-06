import { z } from 'zod';

const prescribedMedicineSchema = z.object({
  medicineName: z.string({ required_error: 'Medicine name is required.' }),
  dosage: z.string({ required_error: 'Dosage (e.g. 1-0-1) is required.' }),
  duration: z.string({ required_error: 'Duration (e.g. 5 days) is required.' }),
  instruction: z.string({ required_error: 'Instruction (e.g. After Food) is required.' }),
});

export const createPrescriptionSchema = z.object({
  body: z.object({
    patient: z.string({ required_error: 'Patient ObjectId is required.' }),
    doctor: z.string({ required_error: 'Doctor ObjectId is required.' }),
    date: z.string({ required_error: 'Prescription date is required.' }),
    medicines: z.array(prescribedMedicineSchema).min(1, 'At least one medicine is required.'),
    diagnosis: z.string({ required_error: 'Diagnosis details are required.' }),
    notes: z.string().optional(),
  }),
});

export const updatePrescriptionSchema = z.object({
  body: z.object({
    date: z.string().optional(),
    medicines: z.array(prescribedMedicineSchema).min(1).optional(),
    diagnosis: z.string().optional(),
    notes: z.string().optional(),
  }),
  params: z.object({
    id: z.string({ required_error: 'Prescription record ID is required.' }),
  }),
});
