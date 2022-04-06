import express from "express";
import {
  AddAppointment,
  GetAllPatientAppointments,
  UpdateAppointment,
  DeleteAppointment,
  GetAppointmentsForDay,
  GetUnpaidAppointments,
  GetRemainingBill,
  GetStats,
  GetPatientStats,
} from "./../controllers/appointment.controller";

const router: express.Router = express.Router();

router.route("/addNew").post(AddAppointment);
router.route("/getAll").get(GetAllPatientAppointments);
router.route("/update").patch(UpdateAppointment);
router.route("/delete").delete(DeleteAppointment);
router.route("/getAllByDate").get(GetAppointmentsForDay);
router.route("/getUnpaid").get(GetUnpaidAppointments);
router.route("/getRemainingBill").get(GetRemainingBill);
router.route("/getStats").get(GetStats);
router.route("/getPatientStats").get(GetPatientStats);

export default router;
