import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import {
  AppointmentDto,
  AppointmentPopulatedDto,
  AppointmentUpdateDto,
} from "./../dto/appointment.dto";
import Appointment from "../model/appointmentModel";

// @desc Add New Appointment
//@route POST api/appointment/addNew
//@access Public
export const AddAppointment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const appointmentObj: AppointmentDto = req.body;
    const appointment = new Appointment(appointmentObj);
    await appointment.save();
    res.status(201).json(appointment);
  }
);

// @desc Get ALL Appointment WITH PATIENT
//@route POST api/appointment/findALL?patientId={patientId}
//@access Public
export const GetAllPatientAppointments = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const patientId = req.query.patientId;
    const appointments: AppointmentDto[] = await Appointment.find({
      patient: patientId,
    });
    // if (!appointments.length) {
    //   res.status(400);
    //   throw new Error("No Appointments Found For This Patient");
    // }
    res.status(200).json(appointments);
  }
);

// @desc Update Appointment
//@route PATCH api/appointment/update
//@access Public
export const UpdateAppointment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const appointmentObj: AppointmentUpdateDto = req.body;
    const appointment = await Appointment.findById(appointmentObj.id);

    if (!appointment) {
      res.status(400);
      throw new Error("Appointment not found");
    }

    appointment.startTime = appointmentObj.startTime || appointment.startTime;
    appointment.endTime = appointmentObj.endTime || appointment.endTime;
    appointment.feePaid = appointmentObj.feePaid ?? appointment.feePaid;
    appointment.currency = appointmentObj.currency || appointment.currency;
    appointment.amount = appointmentObj.amount || appointment.amount;

    const updatedAppointment = await appointment.save();

    res.status(200).json(updatedAppointment);
  }
);

// @desc DELETE Appointment
//@route DELETE api/appointment/delete?id={id}
//@access Public
export const DeleteAppointment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const appointmentId = req.query.id;
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      res.status(400);
      throw new Error("Appointment not found");
    }
    await Appointment.findByIdAndDelete(appointmentId);
    res.status(200).send("appointment deleted Successfully!");
  }
);

// @desc GET Appointment for a specific day
//@route GET api/appointment/getAllByDate
//@access Public
export const GetAppointmentsForDay = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.date) {
      res.status(400);
      throw new Error("Date is required");
    }
    const date: string = req.body.date;
    const lt: number = new Date(date).setDate(new Date(date).getDate() + 1);
    const appointments: AppointmentDto[] = await Appointment.find({
      startTime: {
        $gte: new Date(date).setHours(0),
        $lt: lt,
      },
    });
    res.status(200).json(appointments);
  }
);

// @desc GET Unpaid Appointments
//@route GET api/appointment/getUnpaid
//@access Public
export const GetUnpaidAppointments = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const appointments: AppointmentDto[] = await Appointment.find({
      feePaid: false,
    });
    res.status(200).json(appointments);
  }
);

// @desc GET Remaining Bill of patient unpaid appointments
//@route GET api/appointment/getRemainingBill1?patientId={patientId}
//@access Public
export const GetRemainingBill = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const patientId = req.query.patientId;
    const appointments: AppointmentDto[] = await Appointment.find({
      patient: patientId,
      feePaid: false,
    });
    let totalAmount = 0;
    appointments.forEach((appointment) => {
      totalAmount += convertToDollar(appointment.amount, appointment.currency);
    });
    res.status(200).json(totalAmount);
  }
);

// @desc GET the weekly and monthly amount paid, unpaid and balance of hospital in dollars
//@route GET api/appointment/getStats
//@access Public
export const GetStats = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const appointments: AppointmentDto[] = await Appointment.find({});
  let totalAmount = 0;
  let totalAmountPaid = 0;
  let totalAmountUnpaid = 0;
  let totalAmountBalance = 0;
  appointments.forEach((appointment) => {
    totalAmount += convertToDollar(appointment.amount, appointment.currency);
    if (appointment.feePaid) {
      totalAmountPaid += convertToDollar(appointment.amount, appointment.currency);
    } else {
      totalAmountUnpaid += convertToDollar(appointment.amount, appointment.currency);
    }
  });
  totalAmountBalance = totalAmount - totalAmountPaid;
  res.status(200).json({
    totalAmount,
    totalAmountPaid,
    totalAmountUnpaid,
    totalAmountBalance,
  });
});

// @desc Get the most popular pet, and how much money from each pet
//@route GET api/appointment/getPatientStats
//@access Public
export const GetPatientStats = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const appointments: AppointmentPopulatedDto[] = await Appointment.find({}).populate("patient");
    let totalAmount: number = 0;
    let totalAmountPaid: number = 0;
    let totalAmountUnpaid: number = 0;
    let totalAmountBalance: number = 0;
    let petName: string = "";
    let petNameAmount: number = 0;
    let amountEachPet: { [key: string]: number } = {};
    appointments.forEach((appointment) => {
      totalAmount += convertToDollar(appointment.amount, appointment.currency);
      amountEachPet[appointment.patient.petName] = convertToDollar(
        appointment.amount,
        appointment.currency
      );

      if (appointment.feePaid) {
        totalAmountPaid += convertToDollar(appointment.amount, appointment.currency);
      } else {
        totalAmountUnpaid += convertToDollar(appointment.amount, appointment.currency);
      }
      if (appointment.patient.petName !== petName) {
        petName = appointment.patient.petName;
        petNameAmount = convertToDollar(appointment.amount, appointment.currency);
      } else {
        petNameAmount += convertToDollar(appointment.amount, appointment.currency);
      }
    });
    totalAmountBalance = totalAmount - totalAmountPaid;
    res.status(200).json({
      totalAmount,
      totalAmountPaid,
      totalAmountUnpaid,
      totalAmountBalance,
      petName,
      petNameAmount,
      amountEachPet,
    });
  }
);

// Currency converter
export const convertToDollar = (amount: number, currency: string) => {
  if (currency === "EUR") {
    return amount * 1.09;
  } else if (currency === "Bitcoin") {
    return amount * 45193.1;
  } else {
    return amount;
  }
};
