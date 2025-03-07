import * as userService from '../services/userService.js';

export const getUserInfo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSavedImages = async (req, res) => {
  try {
    const userId = req.user.userId;
    const images = await userService.getSavedImages(userId);
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCreatedImages = async (req, res) => {
  try {
    const userId = req.user.userId;
    const images = await userService.getCreatedImages(userId);
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    await userService.deleteImage(id, userId);
    res.status(204).send();
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};
