import express from "express";
import dotenv from "dotenv";

import { connectMongo } from "./infra/database/mongo";
import energyRoutes from "./interfaces/routes/energy.routes";

dotenv.config();

const app = express();

app.use(express.json());

connectMongo();

app.use("/energy", energyRoutes);

export default app;
