import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import transporter from "../config/transporter.js";
import { createToken } from "../config/jwt.js";

const prisma = new PrismaClient();

const signUp = async (req, res) => {
    let { ho_ten, email, mat_khau, tuoi, anh_dai_dien } = req.body;

    let checkUser = await prisma.nguoi_dung.findFirst({
        where: {
            email
        }
    })

    if (checkUser) {
        return res.status(400).json({ message: "Email already exists" })
    }

    await prisma.nguoi_dung.create({
        data: {
            ho_ten,
            email,
            mat_khau: bcrypt.hashSync(mat_khau, 10),
            tuoi,
            anh_dai_dien
        }
    })
    const mailOption = {
        from: process.env.EMAIL_USER,
        to: "clone271102@gmail.com",
        subject: "Welcome to Our Service",
        html: `
        <h1>Welcome ${ho_ten} to Our Service</h1>
        `
    }

    transporter.sendMail(mailOption, (err, info) => {
        console.log(err)
        if (err) {
            console.log("get err:", err)
            return res.status(500).json({ message: "Send email fail" });
        }
        return res.status(201).json({ message: "Create user successfully" })
    })
}

const login = async (req, res) => {
    let { email, mat_khau } = req.body;

    let checkUser = await prisma.nguoi_dung.findFirst({
        where: {
            email
        }
    })

    if (!checkUser) {
        res.status(400).json({ message: "Email is wrong" })
    }

    let checkPass = bcrypt.compareSync(mat_khau, checkUser.mat_khau);

    if (!checkPass) {
        res.status(400).json({ message: "Password is wrong" })
    }

    let payload = {
        nguoi_dung_id: checkUser.nguoi_dung_id
    }

    let accessToken = createToken(payload);

    let refreshToken = createToken(payload);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // dùng riêng cho localhosst
        sameSize: 'Lax', // đảm bảo cookie được gửi trong nhiều domain
        maxAge: 7 * 24 * 60 * 60 * 1000 // thời gian tồn tại là 7 ngày
    })

    return res.status(200).json({ message: "Login successfully", token: accessToken });
}

export {
    signUp,
    login
}