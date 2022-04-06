import express from "express";
import asyncHandler from "express-async-handler";
import {
  AddPatient,
  GetAllPatients,
  UpdatePatient,
  DeletePatient,
} from "./../controllers/patient.controller";

const router: express.Router = express.Router();

router.route("/addNew").post(AddPatient);
router.route("/getAll").get(GetAllPatients);
router.route("/update").patch(UpdatePatient);
router.route("/delete").delete(DeletePatient);

export default router;
