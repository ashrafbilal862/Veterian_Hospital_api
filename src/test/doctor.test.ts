import * as dbHandler from "./db";
import { DoctorDto } from "./../dto/doctor.dto";
import Doctor from "./../model/doctorModel";
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

describe("Doctor test", () => {
  it("can be created correctly", async () => {
    // expect that two assertios will be made
    expect.assertions(2);
    // create new post model instance
    const doctor: DoctorDto = new Doctor();
    // set some test properties
    doctor.name = mockData.doctor.name;
    doctor.specialization = mockData.doctor.specialization;
    doctor.email = mockData.doctor.email;

    // saving test Doctor to in-memory db
    await doctor.save();
    // find inserted Doctor by name
    const doctorInDb = await Doctor.findOne({ name: mockData.doctor.name }).exec();
    console.log("Doctor document from memory-db", doctorInDb);
    // check that name is expected
    expect(doctorInDb?.name).toEqual(mockData.doctor.name);
    // check that speciality is expected
    expect(doctorInDb?.specialization).toEqual(mockData.doctor.specialization);
  });
});
