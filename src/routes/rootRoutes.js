import express from "express"
import authRouter from "./authRoutes.js";
import imgRoutes from "./imgRoutes.js";

const rootRoutes = express.Router();

rootRoutes.use('/auth',authRouter)
rootRoutes.use('/img',imgRoutes)

export default rootRoutes