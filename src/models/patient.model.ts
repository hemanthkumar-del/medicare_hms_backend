import { Schema, model } from 'mongoose';
import { IPatient } from '../types';

const patientSchema = new Schema<IPatient>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    diagnosis: { type: String, required: true },
    admissionDate: { type: String, required: true },
    status: { type: String, enum: ['Admitted', 'Discharged', 'Outpatient'], default: 'Outpatient' },
  },
  { timestamps: true }
);

export const Patient = model<IPatient>('Patient', patientSchema);
export default Patient;
