import express from "express";
import home from "../views/home.pug";

const router = express.Router();

router.get("/", (req, res, next)=> {
    res.render(home);
})

export default router;