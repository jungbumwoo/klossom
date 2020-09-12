import routes from "../routers/routes";
import Video from "../../models/Video";

export const home = async (req, res) => {
    try{
        const videos = await Video.find({});
        res.render("home", { pageTitle: "Home", videos});
    } catch (error) {
        console.log(error);
        res.render("home", {pageTitle: "Home", videos: [] })
    }
};

export const upload = (req, res) => {
    res.render("upload");
};

export const postUpload = async (req, res) => {
    const {
      body: { title, description }
    } = req;
    const { file } = req;
    const newVideo = await Video.create({
      fileUrl: file.path,
      title,
      description
    });
    res.redirect(routes.videoDetail(newVideo.id));
  };

export const videoDetail = async (req, res) => {
  const {
    params :{id}
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", {pageTitle: "Video Detail", video});
  } catch(err) {
    console.log(`error is occured. in videoDetail, videoController!`);
    console.log(err);
    res.redirect(routes.home);
  }
  
};

export const getEditVideo = async(req, res) => {
  const {
    params: {
      id
    }
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", {video});
  } catch(err) {
    console.log(`err is occured. at getEditVideo at videoController`);
    console.log(err);
    res.render("editVideo");
  }
};

export const postEditVideo = (req, res) => {
  
};