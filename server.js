import express from "express";

import userRouter from "./src/routes/user.router.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/common/swagger/init.swagger.js";
import path from "path"; // Thêm import path
import { fileURLToPath } from "url";
import rootRouter from "./src/routes/root.router.js";
import { hanldeError } from "./src/common/helpers/error.helper.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

app.use(rootRouter);

app.use(hanldeError);

// Phục vụ file tĩnh từ thư mục uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Online At Port ${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
