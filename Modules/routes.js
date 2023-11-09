import Database from "../Database/index.js"
import db from "../Database/index.js"


function ModuleRoutes(app){
    app.get("/api/courses/:cid/modules", (req,res) => {
        const {cid} = req.params
        const modules = db.moduleList.filter((item) => item.courseId === cid)
        res.send(modules)
    })

    app.post("/api/courses/:cid/modules", (req,res) => {
        const {cid} = req.params
        const newModule = {
            ...req.body,
            courseId:cid,
            _id: new Date().getTime().toString()
        }
        db.moduleList.push(newModule)
        res.send(newModule)
    })

    app.delete("/api/modules/:mid",(req,res) =>{
        const {mid} = req.params
        Database.moduleList = Database.moduleList.filter((item) => item._id !== mid)
        res.sendStatus(200)
    })

    app.put("/api/modules/:mid", (req,res) => {
        const {mid} = req.params
        const modulesIndex = db.moduleList.findIndex((m) => m._id === mid)
        db.moduleList[modulesIndex] = {
            ...db.moduleList[modulesIndex],
            ...req.body
        }
        res.sendStatus(204);
    })
}

export default ModuleRoutes