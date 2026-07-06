import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'doctor' | 'patient';
  profileImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

export interface IDoctor extends Document {
  user: Types.ObjectId;
  name: string;
  specialization: string;
  rating: number;
  experience: string;
  availabilityStatus: string;
  imageUrl: string;
  email: string;
  phone: string;
  availableSlots: string[];
  biography: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPatient extends Document {
  user?: Types.ObjectId;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  address: string;
  bloodGroup: string;
  diagnosis: string;
  admissionDate: string;
  status: 'Admitted' | 'Discharged' | 'Outpatient';
  createdAt: Date;
  updatedAt: Date;
}

export interface IAppointment extends Document {
  patient: Types.ObjectId;
  patientName: string;
  doctor: Types.ObjectId;
  doctorName: string;
  doctorSpecialization: string;
  date: string;
  timeSlot: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMedicine extends Document {
  name: string;
  category: string;
  strength: string;
  stock: number;
  price: number;
  manufacturer: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPrescribedMedicine {
  medicineName: string;
  dosage: string;
  duration: string;
  instruction: string;
}

export interface IPrescription extends Document {
  patient: Types.ObjectId;
  patientName: string;
  doctor: Types.ObjectId;
  doctorName: string;
  date: string;
  medicines: IPrescribedMedicine[];
  diagnosis: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

// Extension to Express Request interface to store current user details
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: 'admin' | 'doctor' | 'patient';
      };
    }
  }
}
