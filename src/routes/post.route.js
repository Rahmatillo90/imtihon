import { Router } from "express";
import PostController from "../controller/post.controller.js";

const postRouter = Router();
const controller = new PostController();

postRouter.post("/posts/create", (req, res, next) =>
  controller.addController(req, res, next)
);

postRouter.get("/posts/category/:category", (req, res, next) =>
  controller.getCategoryController(req, res, next)
);

postRouter.get("/posts/top", (req, res, next) =>
  controller.getTopPostController(req, res, next)
);

postRouter.put("/posts/:id", (req, res, next) =>
  controller.putByIdController(req, res, next)
);

postRouter.get("/user/posts", (req, res, next) =>
  controller.getUserController(req, res, next)
);

postRouter.delete("/posts/:id", (req, res, next) =>
  controller.deleteByIdController(req, res, next)
);

postRouter.get("/posts/search", (req, res, next) =>
  controller.searchController(req, res, next)
);

export default postRouter;
