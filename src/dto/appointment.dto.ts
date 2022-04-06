import { Document } from "mongoose";
import { PatientDto } from "./patient.dto";
export interface AppointmentDto extends Document {
  id?: string;
  patient: string | PatientDto;
  doctor: string;
  startTime: Date;
  endTime: Date;
  description: string;
  feePaid: boolean;
  currency: string;
  amount: number;
}

export interface AppointmentPopulatedDto {
  id?: string;
  patient: PatientDto;
  doctor: string;
  startTime: Date;
  endTime: Date;
  description: string;
  feePaid: boolean;
  currency: string;
  amount: number;
}

export interface AppointmentUpdateDto {
  id: string;
  patient?: string;
  doctor?: string;
  startTime?: Date;
  endTime?: Date;
  description?: string;
  feePaid?: boolean;
  currency?: string;
  amount?: number;
}
