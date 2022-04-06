import mongoose, { Model } from "mongoose";
import { PatientDto } from "./../dto/patient.dto";

const patientSchema = new mongoose.Schema(
  {
    petName: {
      type: String,
      required: true,
    },
    petType: {
      type: String,
      enum: ["Dog", "Cat", "Bird"],
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    ownerAddress: {
      type: String,
      required: true,
    },
    ownerPhone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Patient: Model<PatientDto> = mongoose.model("Patient", patientSchema);
export default Patient;
