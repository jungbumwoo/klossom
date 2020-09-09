import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import logger from "morgan";
import path from "path";
import route from "./route/route.js";

const app = express();

const PORT = 3000;

app.use(helmet());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());

app.set('view engine', 'pug'); // (1)
app.set('views', path.join(__dirname, "./src/views")); // (2)

app.use("/", route);


function handleListen(){
    console.log(`✅ Listen on ${PORT} port`);
}

app.listen(PORT, handleListen);