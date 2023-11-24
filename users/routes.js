import * as dao from "./dao.js"

function UserRoutes(app) {
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body)
        res.json(user)
    };
    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.uid)
        res.json(status)
    };
    const findAllUser = async (req, res) => {
        const users = await dao.findAllUser()
        res.json(users)
    };
    const findUserById = async (req, res) => {
        const { uid } = req.params
        const user = await dao.findUserById(uid)
        res.json(user)
    };
    const updateUser = async (req, res) => {
        const { uid } = req.params
        const status = await dao.updateUser(uid, req.body)
        const currentUser = await dao.findUserById(uid)
        req.session['currentUser'] = currentUser
        res.json(status)
    }
    const signOut = async (req, res) => {
        req.session.destory();
        res.json(200)
    }
    const login = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredential(username, password)
        req.session['currentUser'] = currentUser
        console.log(currentUser);
        res.json(currentUser)
    }
    const account = async (req, res) => {
        res.json(req.session['currentUser'])
    }
    const signUp = async (req, res) => {
        const user = await dao.findUserByUserName(req.body.username)
        if (user) {
            res.status(400).json({ message: "Username already exist" })
        }
        else {
            const currentUser = await dao.createUser(req.body)
            req.session['currentUser'] = currentUser
            res.json(currentUser)
        }

    }
    app.post("/api/users/signup", signUp)
    app.post("/api/users", createUser)
    app.get("/api/users", findAllUser)
    app.get("/api/users/:uid", findUserById)
    app.delete("/api/users/:uid", deleteUser)
    app.put("/api/users/:uid", updateUser)
    app.post("/api/users/signin", login)
    app.post("/api/users/signout", signOut)
    app.post("/api/users/account", account)
}

export default UserRoutes;