import passport from "passport";
import User from "./models/User";
var GitHubStrategy = require('passport-github').Strategy;
import FacebookStrategy from "passport-facebook";
import { githubLoginCallback, facebookLoginCallback } from "./src/controller/userController";

passport.use(User.createStrategy());

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `http://localhost:4000${process.env.GITHUB_CALLBACK_URL}`
  },
  githubLoginCallback
));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:4000/auth/facebook/callback"
  },
  facebookLoginCallback
));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());