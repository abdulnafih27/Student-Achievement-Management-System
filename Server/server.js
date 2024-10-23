require("dotenv").config();
const express = require("express");
const app = express();

// ConnectDb
const connectDb = require("./db/connect");

// Routers
const studentRouter = require('./router/student');
const projectRouter = require('./router/projects');
const achievementRouter = require('./router/achievements');
const internshipRouter = require('./router/internships')
const marksRouter = require('./router/marks')

//Middleware
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/errorMiddleware')
const authenticationMiddleware = require('./middleware/authentication')
const cors = require('cors');
const Port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Update to your frontend's URL
  })
);

app.use('/student', studentRouter);
app.use('/student/projects', authenticationMiddleware,projectRouter);
app.use('/student/achievements', authenticationMiddleware,achievementRouter);
app.use('/student/internships', authenticationMiddleware, internshipRouter);
app.use('/student/marks',authenticationMiddleware, marksRouter)

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(Port, () => {
          console.log(`Server listening to Port ${Port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();