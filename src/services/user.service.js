import { PrismaClient } from "@prisma/client";
import { BadRequestException } from "../common/helpers/error.helper.js";

const prisma = new PrismaClient();

const userService = {
  getUserById: async (req) => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: +id },
      select: { id: true, username: true, email: true },
    });
    if (!user) throw new BadRequestException("User not found");

    return user;
  },
  getSavedImages: async (userId) => {
    const savedImageByIdUser = await prisma.savedImage.findMany({
      where: { userId: +userId },
      include: { image: { include: { user: true } } },
    });
    if (!savedImageByIdUser) throw new BadRequestException("User not found");
    return savedImageByIdUser.map((saved) => saved.image);
  },
  getCreatedImages: async (userId) => {
    const imageCreateByUserId = await prisma.image.findMany({
      where: { userId: +userId },
      include: { user: true },
    });
    if (!imageCreateByUserId) throw new BadRequestException("User not found");
    return imageCreateByUserId;
  },
  deleteImage: async (imageId, userId) => {
    const image = await prisma.image.findUnique({
      where: { id: Number(imageId) },
    });
    if (!image || image.userId !== userId) {
      throw new Error("Image not found or not authorized");
    }
    await prisma.image.delete({ where: { id: Number(imageId) } });
  },
};

export default userService;
