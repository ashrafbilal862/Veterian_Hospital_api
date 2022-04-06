import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { DoctorDto, DoctorUpdateDto } from "./../dto/doctor.dto";
import Doctor from "./../model/doctorModel";

// @desc Add New Doctor
//@route POST api/doctor/addNew
//@access Public
export const AddDoctor = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doctorObj: DoctorDto = req.body;
  const doctor = new Doctor(doctorObj);
  await doctor.save();
  res.status(201).json(doctor);
});

// @desc Update Doctor
//@route PATCH api/doctor/update
//@access Public
export const UpdateDoctor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const doctorObj: DoctorUpdateDto = req.body;
    const doctor = await Doctor.findById(doctorObj.id);

    if (!doctor) {
      res.status(400);
      throw new Error("Doctor not found");
    }

    doctor.name = doctorObj.name || doctor.name;
    doctor.specialization = doctorObj.specialization || doctor.specialization;
    doctor.email = doctorObj.email || doctor.email;
    const updatedDoctor = await doctor.save();

    res.status(200).json(updatedDoctor);
  }
);

// @desc DELETE Doctor
//@route DELETE api/doctor/delete?id={id}
//@access Public
export const DeleteDoctor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const doctorId = req.query.id;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      res.status(400);
      throw new Error("Doctor not found");
    }
    await doctor.remove();
    res.status(200).json({ message: "Doctor deleted successfully" });
  }
);

// @desc GET ALL Doctor
//@route ALL api/doctor/getAll
//@access Public
export const GetAllDoctors = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const doctors: DoctorDto[] = await Doctor.find();
    res.status(200).json(doctors);
  }
);
