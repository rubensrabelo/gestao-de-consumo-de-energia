import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectMongo } from "./infra/database/mongo";
import energyMeterRoutes from "./api/routes/energyMeter.routes";
import energyReadingRoutes from "./api/routes/energyReading.routes";
import dashboardRoutes from "./api/routes/dashboard.routes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

connectMongo();

app.use("/energy", energyMeterRoutes);
app.use("/energy", energyReadingRoutes);
app.use("/dashboard", dashboardRoutes);

export default app;
