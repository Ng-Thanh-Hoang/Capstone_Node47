import express from "express"
import { getImgByName,getImg } from "../controllers/imgController.js";
import { tryCatch } from "../config/tryCatch.js";

const imgRoutes = express.Router();

imgRoutes.get("/get-img", tryCatch(getImg))
imgRoutes.get("/get-img-by-name", tryCatch(getImgByName))

export default imgRoutes