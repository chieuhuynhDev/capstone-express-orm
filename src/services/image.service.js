import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const imageService = {
  getAllImages: async () => {
    return prisma.image.findMany({ include: { user: true } });
  },
  searchImagesByTitle: async (query) => {
    return prisma.image.findMany({
      where: { title: { contains: query } },
      include: { user: true },
    });
  },
  getImageById: async (id) => {
    const image = await prisma.image.findUnique({
      where: { id: Number(id) },
      include: { user: true },
    });
    if (!image) throw new Error("Image not found");
    return image;
  },
  getCommentsByImageId: async (imageId) => {
    return prisma.comment.findMany({
      where: { imageId: Number(imageId) },
      include: { user: true },
    });
  },
  checkSavedImage: async (userId, imageId) => {
    const saved = await prisma.savedImage.findUnique({
      where: { userId_imageId: { userId, imageId: Number(imageId) } },
    });
    return !!saved;
  },
  addComment: async (userId, imageId, content) => {
    return prisma.comment.create({
      data: { content, userId, imageId: Number(imageId) },
      include: { user: true },
    });
  },
  createImage: async (title, description, url, userId) => {
    return prisma.image.create({
      data: {
        title,
        description,
        url,
        userId,
      },
      include: { user: true },
    });
  },
  saveImage: async (userId, imageId) => {
    // Kiểm tra xem ảnh có tồn tại không
    const image = await prisma.image.findUnique({
      where: { id: +imageId },
    });
    if (!image) throw new Error("Image not found");

    return prisma.savedImage.create({
      data: {
        userId,
        imageId: Number(imageId),
      },
    });
  },
};

export default imageService;
