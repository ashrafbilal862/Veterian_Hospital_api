import { Document } from "mongoose";

export interface DoctorDto extends Document {
  id?: string;
  name: string;
  specialization: string;
  email: string;
}

export interface DoctorUpdateDto {
  id: string;
  name?: string;
  specialization?: string;
  email?: string;
}
