import UserAuthService from "../services/user.auth.service.js";

class UserAuthController {
  constructor() {
    this.service = new UserAuthService();
  }

  async registerController(req, res, next) {
    try {
      const { body } = req;
      const data = await this.service.register(body);
      if (data) res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async loginController(req, res, next) {
    try {
      const { body } = req;
      const data = await this.service.login(body);
      if (data) res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
}

export default UserAuthController;
