import { PatientDto } from "./../dto/patient.dto";
import Patient from "./../model/patientModel";
import * as dbHandler from "./db";
import request from "supertest";
import app from "../app";
import { closeDB } from "./../config/db";
import mongoose from "mongoose";
import { mockData } from "./constants/mockData";

beforeAll(async () => {
  await dbHandler.connect();
});
afterEach(async () => {
  await dbHandler.clearDatabase();
});

afterAll(async () => {
  await dbHandler.closeDatabase();
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
});

describe("patient test", () => {
  const { patient: mockPatient } = mockData;
  beforeEach(jest.clearAllMocks);
  it("can be created correctly", async () => {
    // expect that two assertios will be made
    expect.assertions(2);
    // create new post model instance
    const patient: PatientDto = new Patient();
    // set some test properties
    patient.petName = mockPatient.petName;
    patient.petType = mockPatient.petType;
    patient.ownerName = mockPatient.ownerName;
    patient.ownerAddress = mockPatient.ownerAddress;
    patient.ownerPhone = mockPatient.ownerPhone;
    // saving test Patient to in-memory db
    await patient.save();
    // find inserted Patient by petName
    const patientInDb = await Patient.findOne({ petName: mockPatient.petName }).exec();
    console.log("Post document from memory-db", patientInDb);
    // check that petname is expected
    expect(patientInDb?.petName).toEqual(mockPatient.petName);
    // check that petType is expected
    expect(patientInDb?.petType).toEqual(mockPatient.petType);
  });
});
