import multer from "multer";
import routes from "./src/routers/routes";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localMiddleware = (req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.siteName = "Klossom";
  res.locals.routes = routes;
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
