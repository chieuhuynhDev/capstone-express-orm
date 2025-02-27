import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";

const authService = {
  register: async (req) => {
    const { fullName, email, password, userTypeId } = req.body;
    console.log({ fullName, email, password, userTypeId });

    const userExists = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (userExists) {
      throw new BadRequestException(`Tài khoản đã tồn tại, Vui lòng đăng nhập`);
    }

    // mã hoá password
    // mã hoá password
    const passHash = bcrypt.hashSync(password, 10);

    const userNew = await prisma.users.create({
      data: {
        email: email,
        fullName: fullName,
        password: passHash,
        userTypeId: userTypeId,
      },
    });
    return userNew;
  },
};

export default authService;
