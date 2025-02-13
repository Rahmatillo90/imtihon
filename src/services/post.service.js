import PostModel from "../models/post.model.js";
import userModule from "../models/user.model.js";
import ApiError from "../utils/error.js";
import Validation from "../utils/joi.Validetion.js";
import JWTAUTH from "../utils/jwt.js";

class PostServise {
  constructor() {
    this.dbPost = PostModel;
    this.dbUser = userModule;
    this.joi = new Validation();
    this.jwt = new JWTAUTH();
  }

  async addPost(body, token) {
    const { user_id } = this.jwt.werify(token);
    const user = await this.dbUser.findById(user_id);
    if (!user) throw new ApiError("Token invalid or unexist", 401);

    await this.joi.addPost(body);
    const post = await this.dbPost.create(body);
    const { title, content, createdAt } = post.toObject();
    return { success: true, post: { title, content } };
  }
  async getPostByCategory(category) {
    return await this.dbPost
      .find({ category }, { title: 1, content: 1, author: 1, views: 1 })
      .populate("author", "-_id username email role");
  }
}

export default PostServise;
