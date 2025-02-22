require('dotenv').config();
const express = require ('express');
const app = express();
const cors= require("cors")
const mongoose = require("mongoose");
const password= process.env.PASSWORD;
const user= process.env.USER;
const userRoutes= require("./routes/users")
const authRoutes= require("./routes/auth");
const questionRoutes = require('./routes/question')
const answer = require("./routes/answer");


//middleware
app.use(express.json())
app.use(cors());

const port=process.env.PORT||5000;

//database connection
// const MONGO_URI = `mongodb+srv://${user}:${password}@crud.dstdd.mongodb.net/`;

const MONGO_URI = 'mongodb+srv://maynulhossain69:1234@crud.dstdd.mongodb.net/forms?retryWrites=true&w=majority&appName=crud'

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

  

  //routes
  app.use("/api/users", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api", questionRoutes);
  app.use("/api", answer);


app.listen(port,()=>console.log(`server started on port: ${port}`));
