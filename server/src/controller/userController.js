import routes from "../routers/routes";


export const join = (req, res) => {
    res.render("join", { pageTitle: "Join"});
}

export const login = (req, res) => {
    res.render("login", { pageTitle: "Login"});
}

export const logout = (req, res) => {
    res.render("logout", { pageTitle: "Logout"});
}

export const me = (req, res) => {
    res.render("me", { pageTitle: "Me"})
}
