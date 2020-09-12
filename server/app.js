import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import logger from "morgan";
import { localMiddleware } from "./middlewares";
import path from "path";
import routes from "./src/routers/routes";
import globalRouter from "./src/routers/globalRouter/globalRouter";
import videoRouter from "./src/routers/VideoRouter/videoRouter";


const app = express();

const PORT = 3000;

app.use(helmet());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine', 'pug'); // (1)
app.use("/uploads", express.static("uploads"));
app.set('views', path.join(__dirname, '/src/views')); // (2)

app.use(localMiddleware);
app.use(routes.home, globalRouter);
app.use(routes.video, videoRouter);


export default app;