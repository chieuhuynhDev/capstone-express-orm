import express from "express";
import {
  getUserInfo,
  getSavedImages,
  getCreatedImages,
  deleteImage,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Get user information
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User info
 *       500:
 *         description: Server error
 */
router.get("/me", authMiddleware, getUserInfo);

/**
 * @swagger
 * /api/user/me/saved:
 *   get:
 *     summary: Get saved images of the user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of saved images
 *       500:
 *         description: Server error
 */
router.get("/me/saved", authMiddleware, getSavedImages);

/**
 * @swagger
 * /api/user/me/created:
 *   get:
 *     summary: Get images created by the user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of created images
 *       500:
 *         description: Server error
 */
router.get("/me/created", authMiddleware, getCreatedImages);

/**
 * @swagger
 * /api/user/images/{id}:
 *   delete:
 *     summary: Delete an image created by the user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Image ID
 *     responses:
 *       204:
 *         description: Image deleted
 *       403:
 *         description: Forbidden
 */
router.delete("/images/:id", authMiddleware, deleteImage);

export default router;
