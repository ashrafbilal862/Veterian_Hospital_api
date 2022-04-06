const { convertToDollar } = require("../controllers/appointment.controller");

import * as dbHandler from "./db";
import Appointment from "./../model/appointmentModel";
import Patient from "./../model/patientModel";
import Doctor from "./../model/doctorModel";
import { AppointmentDto } from "./../dto/appointment.dto";
import { PatientDto } from "./../dto/patient.dto";
import { DoctorDto } from "./../dto/doctor.dto";
import { mockData } from "./constants/mockData";

beforeAll(async () => {
  await dbHandler.connect();
});

afterEach(async () => {
  await dbHandler.clearDatabase();
});

afterAll(async () => {
  await dbHandler.closeDatabase();
});

describe("Appointment test", () => {
  const { appointment: mockAppointment, patient: mockPatient, doctor: mockDoctor } = mockData;
  it("can be created correctly", async () => {
    // expect that two assertios will be made
    expect.assertions(2);

    const patient: PatientDto = new Patient();
    // set some test properties
    patient.petName = mockPatient.petName;
    patient.petType = mockPatient.petType;
    patient.ownerName = mockPatient.ownerName;
    patient.ownerAddress = mockPatient.ownerAddress;
    patient.ownerPhone = mockPatient.ownerPhone;
    // saving test Patient to in-memory db
    const patientResult = await patient.save();

    const doctor: DoctorDto = new Doctor();
    // set some test properties
    doctor.name = mockDoctor.name;
    doctor.specialization = mockDoctor.specialization;
    doctor.email = mockDoctor.email;

    // saving test Doctor to in-memory db
    const doctorResult = await doctor.save();
    // create new post model instance
    const appointment: AppointmentDto = new Appointment();
    // set some test properties
    appointment.patient = patientResult._id;
    appointment.doctor = doctorResult._id;
    appointment.startTime = mockAppointment.startTime;
    appointment.endTime = mockAppointment.endTime;
    appointment.description = mockAppointment.description;
    appointment.feePaid = mockAppointment.feePaid;
    appointment.currency = mockAppointment.currency;
    appointment.amount = mockAppointment.amount;

    // saving test Patient to in-memory db
    await appointment.save();
    // find inserted Appointment by patient
    const appointmentInDb = await Appointment.findOne({ patient: patientResult._id }).exec();
    console.log("Appointment document from memory-db", appointmentInDb);
    // check that amount is expected
    expect(appointmentInDb?.amount).toEqual(mockAppointment.amount);
    // check that currency is expected
    expect(appointmentInDb?.currency).toEqual(mockAppointment.currency);
  });
});

test("Should convert to dollar", () => {
  expect(convertToDollar(100, "USD")).toBe(100);
  expect(convertToDollar(100, "EUR")).toBe(109.00000000000001);
  expect(convertToDollar(100, "Bitcoin")).toBe(4519310);
});
