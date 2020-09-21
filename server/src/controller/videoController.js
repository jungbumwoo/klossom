import routes from "../routers/routes";
import Video from "../../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async(req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  console.log(searchingBy);
  let videos = [];
  try {
    videos= await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
  } catch(error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const upload = (req, res) => {
  res.render("upload");
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
  } = req;
  const { file } = req;
  const newVideo = await Video.create({
    fileUrl: file.path,
    title,
    description,
  });
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: "Video Detail", video });
  } catch (err) {
    console.log(`error is occured. in videoDetail, videoController!`);
    console.log(err);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: "Edit", video });
  } catch (err) {
    console.log(`err is occured. at getEditVideo at videoController`);
    console.log(err);
    res.render("editVideo");
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  const {
    body: { title, description },
  } = req;
  console.log(title, description);
  try {
    const editVideo = await Video.findOneAndUpdate(
      { _id: id },
      {
        title,
        description,
      }
    );
    console.log(editVideo);
    res.redirect(routes.videoDetail(editVideo.id));
  } catch (err) {
    console.log(`error is occuered at postEditVideo In videoController`);
    console.log(err);
    res.render("editVideo");
  }
};

export const getDeleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.remove({ _id: id });
    res.redirect(`/`);
  } catch(error) {
    console.log(error);
    res.redirect(routes.editVideo(id));
  }
};
