import { Schema, model } from 'mongoose';
import { IPrescription } from '../types';

const prescribedMedicineSchema = new Schema(
  {
    medicineName: { type: String, required: true },
    dosage: { type: String, required: true },
    duration: { type: String, required: true },
    instruction: { type: String, required: true },
  },
  { _id: false }
);

const prescriptionSchema = new Schema<IPrescription>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    patientName: { type: String, required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    doctorName: { type: String, required: true },
    date: { type: String, required: true },
    medicines: { type: [prescribedMedicineSchema], required: true },
    diagnosis: { type: String, required: true },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Prescription = model<IPrescription>('Prescription', prescriptionSchema);
export default Prescription;
