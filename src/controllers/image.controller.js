﻿import imageService from "../services/image.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";

const imageController = {
  getImages: async (req, res, next) => {
    try {
      const images = await imageService.getAllImages();

      const resData = responseSuccess(
        200,
        "Get list image successfully",
        images
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  searchImages: async (req, res, next) => {
    try {
      const { searchKey } = req.query;
      const images = await imageService.searchImagesByTitle(searchKey);

      const resData = responseSuccess(
        200,
        "Get all images successfully",
        images
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  getImageDetails: async (req, res, next) => {
    try {
      const { id } = req.params;
      const image = await imageService.getImageById(id);
      const resData = responseSuccess(
        200,
        "Get detail image successfully",
        image
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  getComments: async (req, res, next) => {
    try {
      const { id } = req.params;
      const comments = await imageService.getCommentsByImageId(id);
      const resData = responseSuccess(
        200,
        `Get image #${id} successfully`,
        comments
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  checkSavedImage: async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.userId;
      console.log(" userId:", userId, "| imageId:", id);

      const isSaved = await imageService.checkSavedImage(userId, id);

      const resData = responseSuccess(
        200,
        `Check iamge #${id} successfully`,
        isSaved
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  addComment: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const userId = req.user.userId;
      const comment = await imageService.addComment(userId, id, content);
      const resData = responseSuccess(
        201,
        `Add comment image #${id} successfully`,
        comment
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  uploadImage: async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const userId = req.user.userId;
      if (!req.file) throw new Error("No image file uploaded");

      const imageUrl = `/uploads/${req.file.filename}`;
      const image = await imageService.createImage(
        title,
        description,
        imageUrl,
        userId
      );
      const resData = responseSuccess(
        201,
        `Image uploaded successfully`,
        image
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  saveImage: async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.userId;
      // Kiểm tra xem ảnh đã được lưu chưa
      const isSaved = await imageService.checkSavedImage(userId, id);

      if (isSaved) {
        return res.status(400).json({ error: "Image already saved" });
      }
      const saved = await imageService.saveImage(userId, id);

      const resData = responseSuccess(201, `Image saved successfully`, saved);
      res.status(resData.code).json(resData);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default imageController;
