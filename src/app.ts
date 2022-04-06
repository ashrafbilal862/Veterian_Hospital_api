import express, { Application, Request, Response, NextFunction } from "express";
import connectDB from "./config/db";
import { notFound, errorHandler } from "./middlewares/errorMiddleware";

// Routes Imports
import patientRoutes from "./routes/patient.routes";
import doctorRoutes from "./routes/doctor.routes";
import appointmentRoutes from "./routes/appointment.routes";

const app: Application = express();

//Configurations
connectDB();

app.use(express.json());

//Routes
app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/appointment", appointmentRoutes);

// Default Route
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello World!");
});

//404 not found
app.use(notFound);

// Error Handling
app.use(errorHandler);

// Server Initialization

const PORT: string | number = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Example app listening on port 5000!"));

export default app;
