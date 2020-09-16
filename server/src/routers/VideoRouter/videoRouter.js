import express from "express";
import routes from "../routes";
import { upload, postUpload, videoDetail, getEditVideo, postEditVideo,
    postDeleteVideo,
    getDeleteVideo } from "../../controller/videoController";
import { uploadVideo } from "../../../middlewares";
const videoRouter = express.Router();

console.log(routes.deleteVideo);
console.log(routes.deleteVideo());

videoRouter.get(routes.upload, upload);
videoRouter.post(routes.upload, uploadVideo, postUpload);
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);
videoRouter.post(routes.deleteVideo(), postDeleteVideo);
videoRouter.get(routes.deleteVideo(), getDeleteVideo);


export default videoRouter;