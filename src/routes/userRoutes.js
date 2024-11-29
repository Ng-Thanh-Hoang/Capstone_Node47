import express from "express";
import { getAllUser, updateUser } from "../controllers/userController.js";
import { tryCatch } from "../config/tryCatch.js";

const userRoutes = express.Router();

userRoutes.get("/get-user", tryCatch(getAllUser))
userRoutes.put("/edit-user", tryCatch(updateUser))

export default userRoutes