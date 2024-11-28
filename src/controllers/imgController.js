import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getImg = async (req, res) => {
    const data = await prisma.hinh_anh.findMany({
    })
    return res.status(200).json(data)
}

const getImgByName = async (req, res) => {
    let { ten_hinh } = req.query

    if (!ten_hinh ) {
        return res.status(400).json({ message: "Img name isn't empty" });
    }

    let images = await prisma.hinh_anh.findMany({
        where: {
            ten_hinh:ten_hinh
        }
    })

    if (images.length === 0) {
        return res.status(404).json({ message: 'Not found img' });
    }

    return res.status(200).json(images)
}

export {
    getImg,
    getImgByName
}