import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllImages = async () => {
  return prisma.image.findMany({ include: { user: true } });
};

export const searchImagesByTitle = async (query) => {
  return prisma.image.findMany({
    where: { title: { contains: query, mode: "insensitive" } },
    include: { user: true },
  });
};

export const getImageById = async (id) => {
  const image = await prisma.image.findUnique({
    where: { id: Number(id) },
    include: { user: true },
  });
  if (!image) throw new Error("Image not found");
  return image;
};

export const getCommentsByImageId = async (imageId) => {
  return prisma.comment.findMany({
    where: { imageId: Number(imageId) },
    include: { user: true },
  });
};

export const checkSavedImage = async (userId, imageId) => {
  const saved = await prisma.savedImage.findUnique({
    where: { userId_imageId: { userId, imageId: Number(imageId) } },
  });
  return !!saved;
};

export const addComment = async (userId, imageId, content) => {
  return prisma.comment.create({
    data: { content, userId, imageId: Number(imageId) },
    include: { user: true },
  });
};

export const createImage = async (title, description, url, userId) => {
  return prisma.image.create({
    data: {
      title,
      description,
      url,
      userId,
    },
    include: { user: true },
  });
};
