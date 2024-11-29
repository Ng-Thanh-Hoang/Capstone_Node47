import express from "express"
import { tryCatch } from "../config/tryCatch.js";
import { infoCommentByIdImg, saveComment } from "../controllers/commentController.js";

const comRoutes = express.Router();

comRoutes.get("/get-comment/:id", tryCatch(infoCommentByIdImg))
comRoutes.post("/create-comment", tryCatch(saveComment))

export default comRoutes