import express from "express";
import userController from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.js";
// import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management APIs
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user information by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User info
 *       500:
 *         description: Server error
 */
userRouter.get("/:id", protect, userController.getUserInfo);

/**
 * @swagger
 * /api/user/{id}/saved:
 *   get:
 *     summary: Get saved images of a user by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of saved images
 *       500:
 *         description: Server error
 */
userRouter.get("/:id/saved", protect, userController.getSavedImages);

/**
 * @swagger
 * /api/user/{id}/created:
 *   get:
 *     summary: Get images created by a user by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of created images
 *       500:
 *         description: Server error
 */
userRouter.get("/:id/created", protect, userController.getCreatedImages);

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
userRouter.delete("/images/:id", protect, userController.deleteImage);

export default userRouter;
