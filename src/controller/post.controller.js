import PostService from "../routes/routes.js";
import ApiError from "../utils/error.js";

class PostController {
  constructor() {
    this.servise = new PostService();
  }

  async addController(req, res, next) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const { body } = req;
      if (!token) throw new ApiError("Token invalid or unexist", 401);
      const data = await this.servise.addPost(body, token);
      if (data) res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getCategoryController(req, res, next) {
    try {
      const { category } = req.params;
      console.log(category);
      const posts = await this.servise.getPostByCategory(category);
      if (posts) res.status(200).json({ success: true, posts });
    } catch ({ message }) {
      res.status(400).json({ success: false, message });
    }
  }

  async getTopPostController(req, res, next) {
    try {
      const posts = await this.servise.getTopPost();
      if (posts) res.status(200).json({ success: true, posts });
    } catch ({ message }) {
      res.status(400).json({ success: false, message });
    }
  }

  async putByIdController(req, res, next) {
    try {
      const { body, params } = req;
      const updatedPost = await this.servise.putPostById(params.id, body);
      if (updatedPost) res.status(201).json({ success: true, updatedPost });
    } catch ({ message }) {
      res.status(400).json({ success: false, message });
    }
  }

  async getUserController(req, res, next) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) throw new ApiError("Token invalid or unexist", 401);
      const posts = await this.servise.getUserPosts(token);
      if (posts) res.status(200).json({ success: true, posts });
    } catch (error) {
      next(error);
    }
  }

  async deleteByIdController(req, res, next) {
    try {
      const { id } = req.params;
      const post = await this.servise.deletePostById(id);
      if (post) res.status(200).json({ success: true, message: "deleted" });
    } catch ({ message }) {
      res.status(400).json({ success: false, message });
    }
  }

  async searchController(req, res, next) {
    try {
      const { q } = req.query;
      const posts = await this.servise.searchPost(q);
      if (posts) res.status(200).json({ success: true, posts });
    } catch ({ message }) {
      res.status(400).json({ success: false, message });
    }
  }
}

export default PostController;
