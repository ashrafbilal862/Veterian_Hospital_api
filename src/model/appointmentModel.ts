import mongoose, { Model } from "mongoose";
import { AppointmentDto } from "./../dto/appointment.dto";

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Patient",
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Doctor",
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  feePaid: {
    type: Boolean,
    required: true,
  },
  currency: {
    type: String,
    enum: ["USD", "EUR", "Bitcoin"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Appointment: Model<AppointmentDto> = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
