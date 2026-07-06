import { Schema, model } from 'mongoose';
import { IDoctor } from '../types';

const doctorSchema = new Schema<IDoctor>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    experience: { type: String, required: true },
    availabilityStatus: { type: String, default: 'Available Today' },
    imageUrl: { type: String, default: '' },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    availableSlots: { type: [String], default: [] },
    biography: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Doctor = model<IDoctor>('Doctor', doctorSchema);
export default Doctor;
