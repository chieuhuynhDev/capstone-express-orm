import express from "express";
import authRouter from "./routes/auth.js";
import imageRouter from "./routes/image.js";
import userRouter from "./routes/user.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import path from "path"; // Thêm import path
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Phục vụ file tĩnh từ thư mục uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/images", imageRouter);
app.use("/api/user", userRouter);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
