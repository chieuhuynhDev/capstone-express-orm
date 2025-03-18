import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../common/constant/app.constant.js";
import { UnauthorizationException } from "../common/helpers/error.helper.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// export default (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ error: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

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

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
