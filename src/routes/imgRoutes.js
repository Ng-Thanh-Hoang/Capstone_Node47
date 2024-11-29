import express from "express"
import { getImgByName,getImg, getImgById, getListImgByUserId, deleteImgById, checkImgExistById } from "../controllers/imgController.js";
import { tryCatch } from "../config/tryCatch.js";

const imgRoutes = express.Router();

imgRoutes.get("/get-img", tryCatch(getImg))
imgRoutes.get("/get-img-by-name", tryCatch(getImgByName))
imgRoutes.get("/get-img-by-id/:id", tryCatch(getImgById))
imgRoutes.get("/get-list-img/:userId", tryCatch(getListImgByUserId))
imgRoutes.delete("/delete-img/:idImg", tryCatch(deleteImgById))
imgRoutes.get("/check-img/:idImg", tryCatch(checkImgExistById))

export default imgRoutes