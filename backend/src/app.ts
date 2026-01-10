import express from "express";
import dotenv from "dotenv";

import { connectMongo } from "./infra/database/mongo";
import energyRoutes from "./api/routes/energy.routes";
import { dashboardRoutes } from "./api/routes/dashboard.routes";

dotenv.config();

const app = express();

app.use(express.json());

connectMongo();

app.use("/energy", energyRoutes);
app.use("/dashboard", dashboardRoutes);

export default app;
