import Joi from "joi";
import ApiError from "./error.js";
import { hash } from "bcrypt";

class Validation {
  constructor() {
    this.joi = Joi;
  }

  async register(body, round) {
    try {
      const schema = this.joi.object({
        username: this.joi.string().required().min(5).max(32),
        email: this.joi.string().email().required().min(12).max(32),
        password: this.joi.string().min(8).max(32).required(),
        role: this.joi.string().default("user"),
      });
      await schema.validateAsync(body);
      const hashed = await hash(body.password, round);
      return { ...body, password: hashed };
    } catch ({ message }) {
      throw new ApiError(message, 422);
    }
  }

  async login(body) {
    try {
      const schema = this.joi.object({
        email: this.joi.string().email().required().min(12).max(32),
        password: this.joi.string().min(8).max(32).required(),
      });
      await schema.validateAsync(body);
    } catch ({ message }) {
      throw new ApiError(message, 422);
    }
  }

  async addPost(body) {
    try {
      const schema = this.joi.object({
        title: this.joi.string().required().min(8).max(50),
        content: this.joi.string().min(8).max(120).required(),
        category: this.joi.string().required().min(2).max(25),
        views: this.joi.number().default(22405).min(0),
      });
      await schema.validateAsync(body);
    } catch ({ message }) {
      throw new ApiError(message, 422);
    }
  }
}

export default Validation;
