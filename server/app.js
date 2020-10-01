import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import logger from "morgan";
import { localMiddleware } from "./middlewares";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import path from "path";
import routes from "./src/routers/routes";
import globalRouter from "./src/routers/globalRouter/globalRouter";
import videoRouter from "./src/routers/VideoRouter/videoRouter";
import userRouter from "./src/routers/userRouter/userRouter";

import "./passport";

const app = express();

const CokieStore = MongoStore(session);

const PORT = 3000;

app.use(helmet());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "pug"); // (1)
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.set("views", path.join(__dirname, "/src/views")); // (2)
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(localMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.video, videoRouter);

export default app;
