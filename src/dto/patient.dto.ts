import { Document } from "mongoose";
export interface PatientDto extends Document {
  id?: string;
  petName: string;
  petType: string;
  ownerName: string;
  ownerAddress: string;
  ownerPhone: string;
}

export interface PatientUpdateDto {
  id: string;
  petName?: string;
  petType?: string;
  ownerName?: string;
  ownerAddress?: string;
  ownerPhone?: string;
}
