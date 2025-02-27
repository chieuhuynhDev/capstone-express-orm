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

    delete userNew.password;
    return userNew;
  },
  login: async (req) => {
    const { email, password } = req.body;
    console.log({ email, password });

    const userExists = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (!userExists) {
      throw new BadRequestException(`Tài khoản chưa tồn tại, Vui lòng đăng ký`);
    }

    // if (!userExists.password) {
    //   if (userExists.face_app_id) {
    //     throw new BadRequestException(
    //       `Vui lòng đăng nhập bằng facebook, để tạo mật khẩu mới`
    //     );
    //   }
    //   if (userExists.goole_id) {
    //     throw new BadRequestException(
    //       `Vui lòng đăng nhập bằng google, để tạo mật khẩu mới`
    //     );
    //   }
    //   throw new BadRequestException(
    //     `Không hợp lệ, vui lòng liện hệ chăm sóc khách hàng`
    //   );
    // }

    // so sánh password
    const isPassword = bcrypt.compareSync(password, userExists.password);
    if (!isPassword) {
      throw new BadRequestException(`Mật khẩu không chính xác`);
    }

    return {
      accessToken: `123`,
      refreshToken: `789`,
    };
  },
};

export default authService;
