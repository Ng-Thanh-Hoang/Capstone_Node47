import express from "express";
import { login, signUp } from "../controllers/authController.js";
import { tryCatch } from "../config/tryCatch.js";
import { upload } from "../config/upload.js";

const authRoutes = express.Router();

authRoutes.post("/signUp", tryCatch(signUp))
authRoutes.post("/login", tryCatch(login))

authRoutes.post("/upload-avatar", upload.single("hinhAnh"), (req, res) => {
    let file = req.file;
    return res.status(200).json(file);
});

export default authRoutes