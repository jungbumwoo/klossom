import routes from "../routers/routes";
import Video from "../../models/Video";
import Comment from "../../models/Comment";

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
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    res.render("videoDetail", { pageTitle: "Video Detail", video });
  } catch (err) {
    console.log(`error is occured. in videoDetail, videoController!`);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video});
    }
  } catch (err) {
    console.log(`err is occured. at getEditVideo at videoController`);
    console.log(err);
    res.render("home");
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
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndDelete({ _id: id});
    }
  } catch(error) {
    console.log(error);
    res.redirect(routes.editVideo(id));
  }
};

export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    video.view += 1;
    video.save();
    res.status(200);
  } catch(error) {
    res.status(400);
  } finally {
    res.end();
  }
}

// Add Comment
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id
    });
    video.comments.push(newComment.id);
    video.save();
  } catch(error) {
    res.status(400);
  } finally {
    res.end();
  };
}