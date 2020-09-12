import express from "express";
import routes from "../routes";
import { upload, postUpload, videoDetail, getEditVideo, postEditVideo } from "../../controller/videoController";
import { uploadVideo } from "../../../middlewares";
const videoRouter = express.Router();

videoRouter.get(routes.upload, upload);
videoRouter.post(routes.upload, uploadVideo, postUpload);
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);


export default videoRouter;