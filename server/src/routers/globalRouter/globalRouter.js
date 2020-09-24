import express from "express";
import routes from "../routes";
import { home, search } from "../../controller/videoController";
import { getJoin, getLogin, postJoin, postLogin, logout, me } from "../../controller/userController";
import { onlyPublic } from "../../../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
globalRouter.get(routes.logout, onlyPublic, logout);
globalRouter.get(routes.me, me);

export default globalRouter;
