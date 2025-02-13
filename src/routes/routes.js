import PostModel from "../models/post.model.js";
import UserModel from "../models/user.model.js";
import ApiError from "../utils/error.js";
import Validation from "../utils/joi.Validetion.js";
import JWTAuthorization from "../utils/jwt.js";

class Routers {
  constructor() {
    this.dbPost = PostModel;
    this.dbUser = UserModel;
    this.joi = new Validation();
    this.jwt = new JWTAuthorization();
  }

  async addPost(body, token) {
    const { user_id } = this.jwt.verify(token);
    const user = await this.dbUser.findById(user_id);
    if (!user) throw new ApiError("Token invalid or unexist", 401);

    await this.joi.addPost(body);
    body = { ...body, author: user_id };
    const post = await this.dbPost.create(body);
    const { title, content, createdAt } = post.toObject();
    return { success: true, post: { title, content } };
  }

  async getPostByCategory(category) {
    return await this.dbPost
      .find({ category }, { title: 1, content: 1, author: 1, views: 1 })
      .populate("author", "-_id username email role");
  }

  async getTopPost() {
    return await this.dbPost
      .find({}, { title: 1, content: 1, author: 1, views: 1 })
      .sort({ views: -1 })
      .populate("author", "-_id username email role")
      .limit(5);
  }

  async putPostById(id, body) {
    const { title, content } = await this.dbPost.findByIdAndUpdate(id, body);
    return { title, content };
  }

  async getUserPosts(token) {
    const { user_id } = this.jwt.verify(token);
    const posts = await this.dbPost.find(
      { author: user_id },
      { title: 1, content: 1, category: 1, views: 1 }
    );
    return posts;
  }

  async deletePostById(id) {
    return await this.dbPost.findByIdAndDelete(id);
  }

  async searchPost(query) {
    return await this.dbPost.find(
      {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { content: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
        ],
      },
      { title: 1, content: 1, category: 1, _id: 0 }
    );
  }
}

export default Routers;
