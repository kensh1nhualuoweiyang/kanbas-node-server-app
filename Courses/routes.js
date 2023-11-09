import Database from "../Database/index.js";

function CourseRoutes(app) {

    app.get("/api/courses/:id", (req, res) => {
        const { id } = req.params
        const course = Database.courseList.find((item) => item._id === id)

        if (!course) {
            res.status(404).send("Course Not Found")
        }
        res.send(course)
    })

    app.get("/api/courses", (req, res) => {
        const courses = Database.courseList;
        res.send(courses)
    })

    app.post("/api/courses", (req, res) => {
        const course = {
            ...req.body,
            _id: new Date().getTime().toString()
        }
        Database.courseList.push(course)
        res.send(course)
    })

    app.delete("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        Database.courseList = Database.courseList.filter((item) => item._id != id)
        res.sendStatus(204);
    })


    app.put("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = req.body
        Database.courseList = Database.courseList.map((item) => item._id == id ? course : item)
        res.sendStatus(204)
    })


}

export default CourseRoutes