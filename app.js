import express from 'express';
import hello from './hello.js';
import Lab5 from './lab5.js';
import cors from "cors"
import CourseRoutes from './Courses/routes.js';
import ModuleRoutes from './Modules/routes.js';
import "dotenv/config"
import mongoose from 'mongoose';
import UserRoutes from './users/routes.js';
import session from 'express-session';


const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING)
const app = express()
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL 
    })
);
const sessionOption = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
}
if (process.env.NODE_ENV !== "development") {
    sessionOption.proxy = true;
    sessionOption.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOption))
app.use(express.json())
UserRoutes(app)
CourseRoutes(app)
ModuleRoutes(app)
hello(app)
Lab5(app)
app.listen(process.env.PORT || 4000)