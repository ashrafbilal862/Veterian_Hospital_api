import mongoose, { Model } from "mongoose";
import { DoctorDto } from "./../dto/doctor.dto";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Doctor: Model<DoctorDto> = mongoose.model("Doctor", doctorSchema);
export default Doctor;
