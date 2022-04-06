import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import { PatientDto, PatientUpdateDto } from "../dto/patient.dto";
import Patient from "../model/patientModel";

// @desc Add New Patient
//@route POST api/patient/addNew
//@access Public
export const AddPatient = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const patientObj: PatientDto = req.body;
  const patient = new Patient(patientObj);
  await patient.save();
  res.status(201).json(patient);
});

// @desc Get All Patients
//@route GET api/patient/getAll
//@access Public
export const GetAllPatients = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const patients: PatientDto[] = await Patient.find();
    res.status(200).json(patients);
  }
);

// @desc Update Patient Details
//@route PATCH api/patient/update
//@access Public
export const UpdatePatient = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const patientObj: PatientUpdateDto = req.body;
    const patient = await Patient.findById(patientObj.id);

    if (!patient) {
      res.status(400);
      throw new Error("Patient not found");
    }

    patient.petName = patientObj.petName || patient.petName;
    patient.petType = patientObj.petType || patient.petType;
    patient.ownerName = patientObj.ownerName || patient.ownerName;
    patient.ownerAddress = patientObj.ownerAddress || patient.ownerAddress;
    patient.ownerPhone = patientObj.ownerPhone || patient.ownerPhone;
    const updatedPatient = await patient.save();

    res.status(200).json(updatedPatient);
  }
);

// @desc DELETE Patient
//@route PATCH api/patient/delete?id={id}
//@access Public
export const DeletePatient = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const patientId = req.query.id;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      res.status(400);
      throw new Error("Patient not found");
    }
    await Patient.findByIdAndDelete(patientId);
    res.status(200).json("patient deleted Successfully!");
  }
);
