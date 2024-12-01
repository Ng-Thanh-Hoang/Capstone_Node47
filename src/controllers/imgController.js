import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getImg = async (req, res) => {
    const data = await prisma.hinh_anh.findMany({
    })
    return res.status(200).json(data)
}

const getImgByName = async (req, res) => {
    let { ten_hinh } = req.query

    if (!ten_hinh) {
        return res.status(400).json({ message: "Img name isn't empty" });
    }

    let images = await prisma.hinh_anh.findMany({
        where: {
            ten_hinh: ten_hinh
        }
    })

    if (images.length === 0) {
        return res.status(404).json({ message: 'Not found img' });
    }

    return res.status(200).json(images)
}

const getImgById = async (req, res) => {
    let { id } = req.params

    if (!id) {
        return res.status(400).json({ message: "Id isn't empty" });
    }

    let idImg = await prisma.hinh_anh.findFirst({
        where: {
            hinh_id: +id,
        },
        include: {
            nguoi_dung: {
                select: {
                    ho_ten: true,
                    email: true
                }
            }
        }
    })
    return res.status(200).json(idImg)
}

const getListImgByUserId = async (req, res) => {
    const { userId } = req.params;

    if (!userId || isNaN(userId)) {
        return res.status(400).json({ message: "Invalid User ID" });
    }

    const nguoiDungId = +userId;

    const images = await prisma.hinh_anh.findMany({
        where: {
            nguoi_dung_id: nguoiDungId,
        },
    });

    if (images.length === 0) {
        return res.status(404).json({ message: "No images found for this user" });
    }

    return res.status(200).json({
        message: "Images found",
        images: images,
    });
};


const deleteImgById = async (req, res) => {
    let { idImg } = req.params;

    console.log(idImg)

    let checkIdImg = await prisma.hinh_anh.findFirst({
        where: {
            hinh_id: Number(idImg)
        }
    })

    if (!checkIdImg) {
        return res.status(400).json({ message: "Id Img not found" })
    }


    await prisma.binh_luan.deleteMany({
        where: {
            hinh_id: +idImg
        }
    })

    await prisma.hinh_anh.delete({
        where: {
            hinh_id: +idImg
        }
    })

    return res.status(200).json({ message: "Delete Img successfully" })
}

const checkImgExistById = async (req, res) => {
    const { idImg } = req.params;

    // Kiểm tra xem idImg có hợp lệ hay không
    if (!idImg || isNaN(idImg)) {
        return res.status(400).json({ message: "Invalid Image ID" });
    }

    const hinhId = +idImg; // Ép kiểu idImg thành số

    // Tìm hình ảnh trong bảng hinh_anh theo hinh_id
    const checkIdImg = await prisma.hinh_anh.findFirst({
        where: {
            hinh_id: hinhId,
        },
    });

    // Kiểm tra nếu không tìm thấy hình ảnh
    if (!checkIdImg) {
        return res.status(404).json({ message: "Image not found" });
    }

    // Nếu hình ảnh tồn tại, trả về thông tin hình ảnh
    return res.status(200).json({
        message: "Image found",
        image: checkIdImg,
    });
};

const addImage = async (req, res) => {
    const { ten_hinh, duong_dan, mo_ta, nguoi_dung_id } = req.body;

    //Kiểm tra xem các thông tin cần thiết có đầy đủ không
    if (!ten_hinh || !duong_dan || !nguoi_dung_id) {
        return res.status(400).json({ message: "Please provide all required fields (ten_hinh, duong_dan, nguoi_dung_id)" });
    }

    let user = await prisma.nguoi_dung.findUnique({
        where: { nguoi_dung_id: nguoi_dung_id },
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const newImage = await prisma.hinh_anh.create({
        data: {
            ten_hinh,
            duong_dan,
            mo_ta,
            nguoi_dung_id,
        },
    });

    const saveImage = await prisma.luu_anh.create({
        data: {
            nguoi_dung_id,
            hinh_id: newImage.hinh_id,
            ngay_luu: new Date()
        },
    });

    return res.status(201).json({
        message: "Image added successfully",
        image: newImage
    });
};



export {
    getImg,
    getImgByName,
    getImgById,
    getListImgByUserId,
    deleteImgById,
    checkImgExistById,
    addImage
}