//Global
const HOME = "/";
//USERS
const ME = "/me";
const USERS = "/users";
const USER_DETAIL = "/:id";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";

const EDIT_PROFILE = "/editprofile";
const CHANGE_PASSWORD = "/change_password";

//VIDEOS
const VIDEO = "/videos";
const VIDEO_DETAIL = "/:id";
const SEARCH = "/search";
const EDIT_VIDEO = "/:id/edit";
const UPLOAD = "/upload";
const DELETE_VIDEO = "/:id/delete";

//auth 
const AUTH_GITGUB = "/auth/github";
const AUTH_GITGUB_CALLBACK = "/auth/github/callback";



const routes = {
  home: HOME,
  me: ME,
  users: USERS,
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,

  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,

  github: AUTH_GITGUB,
  githubcallback: AUTH_GITGUB_CALLBACK,


  video: VIDEO,
  search: SEARCH,
  upload: UPLOAD,
  videoDetail: (id) => {
    if (id) {
      return `/videos/${id}`;
    } else {
      return VIDEO_DETAIL;
    }
  },
  editVideo: (id) => {
    if (id) {
      return `/videos/${id}/edit`;
    } else {
      return EDIT_VIDEO;
    }
  },
  deleteVideo: (id) => {
    if (id) {
      return `/videos/${id}/delete`;
    } else {
      return DELETE_VIDEO;
    }
  },
};

export default routes;
