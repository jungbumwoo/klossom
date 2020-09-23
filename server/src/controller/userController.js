import passport from "passport";
import routes from "../routers/routes";
import User from "../../models/User";



export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join"});
}

export const postJoin = async (req, res, next) => {
    const {
        body: { name, email, password, password2 }
    } = req;
    if (password !== password2) {
        console.log(`password !== password2`);
        res.status(400);
        res.render("join", { pageTitle: "Join"});
    } else {
        try {
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();
        } catch(error) {
            console.log(error);
            res.redirect(routes.home);
        }
    }
}

export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Login"});
}

/*
export const postLogin = (req,res) => passport.authenticate("local", function(err, user, info) {
    console.log(`postLogining~~~`);
    if (err) {
        console.log(err);
        return res.redirect(routes.home);
    }
    if (!user) {
        console.log("!user");
        return res.redirect(routes.join);
    }
    req.logIn(user, function(err){
        if (err) {
            console.log("error occuered at postLogin");
        }
        return res.redirect(routes.home);
    })
});
*/

export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const logout = (req, res) => {
    res.render("logout", { pageTitle: "Logout"});
}

export const me = (req, res) => {
    res.render("me", { pageTitle: "Me"})
}
