import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllUser = async (req, res) => {

    const data = await prisma.nguoi_dung.findMany({
    })
    
    return res.status(201).json(data)
}

const updateUser = async (req, res) => {
    let { email, mat_khau,ho_ten, anh_dai_dien} = req.body;

    let checkUser = await prisma.nguoi_dung.findFirst({
        where: {
            email
        }
    });

    if (!checkUser) {
        return res.status(400).json({ message: "Email is wrong" })
    }

    await prisma.nguoi_dung.update(
        {
            where: {
                email:email
            },
            data: {
                ho_ten,
                anh_dai_dien,
                mat_khau
            }
        }
    )
    return res.status(200).json({ message: "Update user successfully" })
}

// const updateUser = async (req, res) => {
//     const { nguoi_dung_id, ho_ten, anh_dai_dien, mat_khau } = req.body;
  
//     // Kiểm tra các tham số đầu vào
//     if (!nguoi_dung_id || !ho_ten || !anh_dai_dien || !mat_khau) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
  
//     try {
//       // Cập nhật người dùng bằng nguoi_dung_id
//       const updatedUser = await prisma.nguoi_dung.update({
//         where: { nguoi_dung_id: nguoi_dung_id },  // Dùng nguoi_dung_id làm điều kiện
//         data: {
//           ho_ten,
//           anh_dai_dien,
//           mat_khau,
//         },
//       });
  
//       return res.status(200).json({
//         message: "User updated successfully",
//         user: updatedUser,
//       });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Internal server error" });
//     }
//   };
  

export {
    getAllUser,
    updateUser
}
