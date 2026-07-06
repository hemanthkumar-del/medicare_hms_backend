import { Schema, model } from 'mongoose';
import { IMedicine } from '../types';

const medicineSchema = new Schema<IMedicine>(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    strength: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    manufacturer: { type: String, required: true },
  },
  { timestamps: true }
);

export const Medicine = model<IMedicine>('Medicine', medicineSchema);
export default Medicine;
