import express from 'express';
import hello from './hello.js';
import Lab5 from './lab5.js';
import cors from "cors"
import CourseRoutes from './Courses/routes.js';
import ModuleRoutes from './Modules/routes.js';
import "dotenv/config"
const app = express()
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL
    })
);

app.use(express.json())
CourseRoutes(app)
ModuleRoutes(app)
hello(app)
Lab5(app)
app.listen(process.env.PORT || 4000)