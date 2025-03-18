import { responseSuccess } from "../common/helpers/response.helper.js";
import userService from "../services/user.service.js";

const userController = {
  getUserInfo: async (req, res, next) => {
    try {
      const user = await userService.getUserById(req);

      const resData = responseSuccess(200, `Get info user successfully`, user);

      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  getSavedImages: async (req, res, next) => {
    try {
      const { id } = req.params;

      const images = await userService.getSavedImages(id);

      const resData = responseSuccess(
        200,
        `Get list SavedImages by user #${id} successfully`,
        images
      );

      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  getCreatedImages: async (req, res, next) => {
    try {
      const { id } = req.params;
      const images = await userService.getCreatedImages(id);

      const resData = responseSuccess(
        200,
        `Get list CreatedImages by user #${id} successfully`,
        images
      );

      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  deleteImage: async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.userId;
      await userService.deleteImage(id, userId);
      const resData = responseSuccess(204, `Delete iamge successfully`, images);

      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
