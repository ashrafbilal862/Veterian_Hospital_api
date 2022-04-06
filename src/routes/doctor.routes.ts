import express from "express";
import {
  AddDoctor,
  UpdateDoctor,
  DeleteDoctor,
  GetAllDoctors,
} from "./../controllers/doctor.controller";

const router: express.Router = express.Router();

router.route("/addNew").post(AddDoctor);
router.route("/update").patch(UpdateDoctor);
router.route("/delete").delete(DeleteDoctor);
router.route("/getAll").get(GetAllDoctors);

export default router;
