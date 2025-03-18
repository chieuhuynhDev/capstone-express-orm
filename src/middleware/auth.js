import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../common/constant/app.constant.js";
import { UnauthorizationException } from "../common/helpers/error.helper.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const protect = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      throw new UnauthorizationException(
        `Vui lòng cung cấp token để tiếp tục sử dụng`
      );
    }

    const decode = jwt.verify(accessToken, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decode.userId,
      },
    });

    req.user = { ...user, userId: user.id };
    next();
  } catch (error) {
    next(error);
  }
};
