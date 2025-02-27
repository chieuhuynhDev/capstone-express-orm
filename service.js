import { PrismaClient } from "@prisma/client";
import express from "express";
import { DATABASE_URL } from "./src/common/constant/app.constant.js";
import cors from "cors";
import { handleError } from "./src/common/helpers/error.helper.js";
import rootRouter from "./src/routers/root.router.js";

const app = express();

const prisma = new PrismaClient();

app.use(express.json());
app.use(express.static("."));
app.use(
  cors({
    origin: ["http://localhost:5173", "google.com"],
  })
);

app.use(rootRouter);

app.use(handleError);

app.listen(3069, () => {
  console.log(`Server Online At Port 3069`);
});
