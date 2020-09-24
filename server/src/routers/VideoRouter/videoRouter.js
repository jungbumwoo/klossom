import express from "express";
import routes from "../routes";
import { upload, postUpload, videoDetail, getEditVideo, postEditVideo,
    postDeleteVideo,
    getDeleteVideo } from "../../controller/videoController";
import { uploadVideo } from "../../../middlewares";
import { onlyPrivate } from "../../../middlewares";

const videoRouter = express.Router();

console.log(routes.deleteVideo);
console.log(routes.deleteVideo());

videoRouter.get(routes.upload, onlyPrivate, upload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);
videoRouter.get(routes.deleteVideo(), onlyPrivate, getDeleteVideo);


export default videoRouter;