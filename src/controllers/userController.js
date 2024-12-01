import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllUser = async (req, res) => {

    const data = await prisma.nguoi_dung.findMany({
    })

    return res.status(201).json(data)
}

const updateUser = async (req, res) => {
    const { nguoi_dung_id, ho_ten, anh_dai_dien, mat_khau } = req.body;

    let checkUser = await prisma.nguoi_dung.findFirst({
        where: {
            nguoi_dung_id
        }
    })

    if (!checkUser) {
        return res.status(400).json({ message: "User id isn't exist" })
    }

    const updatedUser = await prisma.nguoi_dung.update({
        where: { nguoi_dung_id: nguoi_dung_id },  // Dùng nguoi_dung_id làm điều kiện
        data: {
            ho_ten,
            anh_dai_dien,
            mat_khau,
        },
    });

    return res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
    });
};

export {
    getAllUser,
    updateUser
}
