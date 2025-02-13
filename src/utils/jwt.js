import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import { compare } from "bcrypt";
import ApiError from "./error.js";
import "dotenv/config";

class JWTAuthorization {
  constructor() {
    this.jwt_sk = process.env.JWT_SK;
  }

  async checkPass(bodyPass, dbPass) {
    const check = await compare(bodyPass, dbPass);
    if (!check) throw new ApiError("Email or Password invalid", 401);
  }

  generate(user_id) {
    return sign({ user_id }, this.jwt_sk, { expiresIn: "30m" });
  }

  verify(token) {
    try {
      return verify(token, this.jwt_sk);
    } catch ({ message }) {
      throw new ApiError(message, 401);
    }
  }
}

export default JWTAuthorization;
