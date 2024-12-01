import express from "express"
import authRouter from "./authRoutes.js";
import imgRoutes from "./imgRoutes.js";
import comRoutes from "./comRoutes.js";
import userRoutes from "./userRoutes.js";

const rootRoutes = express.Router();

rootRoutes.use('/auth',authRouter)
rootRoutes.use('/img',imgRoutes)
rootRoutes.use('/com',comRoutes)
rootRoutes.use('/user',userRoutes)

export default rootRoutes