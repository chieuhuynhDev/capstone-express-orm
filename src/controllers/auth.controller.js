import { responseSuccess } from "../common/helpers/response.helper.js";
import authService from "../services/auth.service.js";

const authControler = {
  register: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const userNew = await authService.registerUser(username, email, password);

      const resData = responseSuccess(201, "Register Successfully", userNew);

      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await authService.loginUser(email, password);
      const resData = responseSuccess(200, `Login Successfully`, token);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};

export default authControler;
