import { Router } from "express";
import UserAuthController from "../controller/user.auth.controller.js";

const authRouter = Router();
const controller = new UserAuthController();

authRouter.post("/auth/register", (req, res, next) =>
  controller.registerController(req, res, next)
);

authRouter.post("/auth/login", (req, res, next) =>
  controller.loginController(req, res, next)
);

export default authRouter;
