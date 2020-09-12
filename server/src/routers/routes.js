//Global
const HOME = "/";
//USERS
const USERS = "/users";
const USER_DETAIL = "/:id";
const JOIN = "/join";
const LOGIN = "/login";

//VIDEOS
const VIDEO ="/videos";
const VIDEO_DETAIL="/:id";
const EDIT_VIDEO="/:id/edit";

const UPLOAD = "/upload";

const routes = {
    home: HOME,
    users: USERS,
    userDetail: id => {
        if(id){
            return `/users/${id}`;
        } else {
            return USER_DETAIL;
        }
    },
    join: JOIN,
    login: LOGIN,
    video: VIDEO,
    upload: UPLOAD,
    videoDetail: id => {
        if (id) {
            return `/videos/${id}`;
        } else {
            return VIDEO_DETAIL;
        }
    },
    editVideo: id => {
        if (id) {
            return `/videos/${id}/edit`
        } else {
            return EDIT_VIDEO;
        }
    }
};

export default routes;