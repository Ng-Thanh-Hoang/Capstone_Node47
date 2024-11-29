import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const infoCommentByIdImg = async (req,res) => {
    let {id} = req.params;

    const data = await prisma.binh_luan.findFirst({
        where:{
            hinh_id: +id
        }
    })
    return res.status(200).json(data)
}

const saveComment = async (req, res) => {
    const { nguoi_dung_id, hinh_id, noi_dung } = req.body;

    if (!nguoi_dung_id || !hinh_id || !noi_dung) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    if (isNaN(nguoi_dung_id) || isNaN(hinh_id)) {
      return res.status(400).json({ message: "Invalid User ID or Image ID" });
    }
  
    const ngay_binh_luan = new Date();
  
      const newComment = await prisma.binh_luan.create({
        data: {
          nguoi_dung_id: +nguoi_dung_id,
          hinh_id: +hinh_id,             
          noi_dung,
          ngay_binh_luan: ngay_binh_luan,
        },
      });

      return res.status(201).json({
        message: "Comment saved successfully",});
  };
  

export {
    infoCommentByIdImg,
    saveComment
}