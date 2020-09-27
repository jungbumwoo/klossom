import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../../controller/videoController";
import { getJoin, getLogin, postJoin, postLogin, logout, getMe } from "../../controller/userController";
import { onlyPrivate, onlyPublic } from "../../../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.me, getMe);

globalRouter.get('/auth/github',
  passport.authenticate('github'));

globalRouter.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(req.user);
    res.redirect('/');
});

globalRouter.get('/auth/facebook', passport.authenticate('facebook'));

globalRouter.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));


export default globalRouter;
