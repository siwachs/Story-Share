import express from "express";
import path from "path";
import { connectToDB } from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoute.js";
import storyRoutes from "./routes/storyRoutes.js";
import dotEnv from "dotenv";

const app = express();

//Env variable Handler
dotEnv.config();

connectToDB();

//Body parser
app.use(express.json());

//Middleware for static file serve
app.use("/uploads/images", express.static(path.join("uploads", "images")));

//CORS ERROR
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Routes
app.use("/api/users", userRoutes);
app.use("/api/stories", storyRoutes);

//Testing
app.use("/api/testing", (req, res) => {
  res.send("API is Working");
});

//Error Handeling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running on PORT ${PORT} in ${process.env.NODE_ENV} mode`
  )
);
