import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
    let body = req.body;
    let { ho_ten, email, mat_khau, tuoi, anh_dai_dien } = body;

    let checkUser = await prisma.nguoi_dung.findFirst({
        where: { email }
    })

    if (checkUser) {
        return res.status(400).json({ message: "Email already exists" })
    }

    await prisma.nguoi_dung.create({
        data: {
            ho_ten,
            email,
            mat_khau,
            tuoi,
            anh_dai_dien
        }
    })
    return res.status(201).json({ message: "create user successfully" })
}

export {
    createUser
}
