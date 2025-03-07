import express from "express";
import {
  getImages,
  searchImages,
  getImageDetails,
  getComments,
  checkSavedImage,
  addComment,
  uploadImage, // Thêm hàm mới
} from "../controllers/imageController.js";
import authMiddleware from "../middleware/auth.js";
import multer from "multer";

// Cấu hình multer để lưu file vào thư mục uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const router = express.Router();

/**
 * @swagger
 * /api/images:
 *   get:
 *     summary: Get all images
 *     tags: [Images]
 *     responses:
 *       200:
 *         description: List of images
 *       500:
 *         description: Server error
 */
router.get("/", getImages);

/**
 * @swagger
 * /api/images/search:
 *   get:
 *     summary: Search images by title
 *     tags: [Images]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of matching images
 *       500:
 *         description: Server error
 */
router.get("/search", searchImages);

/**
 * @swagger
 * /api/images/{id}:
 *   get:
 *     summary: Get image details by ID
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Image ID
 *     responses:
 *       200:
 *         description: Image details
 *       404:
 *         description: Image not found
 */
router.get("/:id", getImageDetails);

/**
 * @swagger
 * /api/images/{id}/comments:
 *   get:
 *     summary: Get comments for an image
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Image ID
 *     responses:
 *       200:
 *         description: List of comments
 *       500:
 *         description: Server error
 */
router.get("/:id/comments", getComments);

/**
 * @swagger
 * /api/images/{id}/saved:
 *   get:
 *     summary: Check if an image is saved by the user
 *     tags: [Images]
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
 *       200:
 *         description: Saved status
 *       500:
 *         description: Server error
 */
router.get("/:id/saved", authMiddleware, checkSavedImage);

/**
 * @swagger
 * /api/images/{id}/comments:
 *   post:
 *     summary: Add a comment to an image
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Image ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *             required:
 *               - content
 *     responses:
 *       201:
 *         description: Comment added
 *       400:
 *         description: Bad request
 */
router.post("/:id/comments", authMiddleware, addComment);

/**
 * @swagger
 * /api/images/upload:
 *   post:
 *     summary: Upload a new image
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *             required:
 *               - title
 *               - image
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *       400:
 *         description: Bad request
 */
router.post("/upload", authMiddleware, upload.single("image"), uploadImage);

export default router;
