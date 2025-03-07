import * as imageService from "../services/imageService.js";

export const getImages = async (req, res) => {
  try {
    const images = await imageService.getAllImages();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchImages = async (req, res) => {
  try {
    const { q } = req.query;
    const images = await imageService.searchImagesByTitle(q);
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getImageDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await imageService.getImageById(id);
    res.status(200).json(image);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await imageService.getCommentsByImageId(id);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const checkSavedImage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const isSaved = await imageService.checkSavedImage(userId, id);
    res.status(200).json({ isSaved });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;
    const comment = await imageService.addComment(userId, id, content);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const uploadImage = async (req, res) => {
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
    res.status(201).json({ message: "Image uploaded successfully", image });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
