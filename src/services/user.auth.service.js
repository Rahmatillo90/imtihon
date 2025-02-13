import UserModel from "../models/user.model.js";
import ApiError from "../utils/error.js";
import Validation from "../utils/joi.Validetion.js";
import JWTAuthorization from "../utils/jwt.js";

class UserAuthService {
  constructor() {
    this.dbUser = UserModel;
    this.joi = new Validation();
    this.jwt = new JWTAuthorization();
  }

  async register(body) {
    const validatedBody = await this.joi.register(body, 12);

    const { _id, username, email } = (
      await this.dbUser.create(validatedBody)
    ).toObject();

    const token = this.jwt.generate(_id);

    return { token, user: { username, email } };
  }

  async login(body) {
    await this.joi.login(body);
    const userOne = await this.dbUser.findOne({ email: body.email });
    if (!userOne) throw new ApiError("Email or Password invalid", 401);
    console.log(body.password);

    const isValid = await this.jwt.checkPass(body.password, userOne.password);

    const { _id, username, email } = userOne.toObject();
    const token = this.jwt.generate(_id);
    return { token, user: { username, email } };
  }
}

export default UserAuthService;
