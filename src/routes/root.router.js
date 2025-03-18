import express from "express";
import authRouter from "./auth.router.js";
import imageRouter from "./image.router.js";
import userRouter from "./user.router.js";

const rootRouter = express.Router();

rootRouter.get(`/`, (request, response, next) => {
  response.json(`Ok`);
});

rootRouter.use("/api/auth", authRouter);

rootRouter.use("/api/images", imageRouter);
rootRouter.use("/api/user", userRouter);

export default rootRouter;
