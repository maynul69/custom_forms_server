require('dotenv').config();
const express = require ('express');
const app = express();
const cors= require("cors")
const mongoose = require("mongoose");
const password= process.env.PASSWORD;
const user= process.env.USER;
const userRoutes= require("./routes/users")
const authRoutes= require("./routes/auth")

//middleware
app.use(express.json())
app.use(cors());

const port=process.env.PORT||5000;

//database connection
const MONGO_URI = `mongodb+srv://${user}:${password}@crud.dstdd.mongodb.net/`;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Database connected successfully!");
  }).catch((error) => {
    console.error("Database connection failed:", error); 
  });
  

  //routes
  app.use("/api/users", userRoutes);
  app.use("/api/auth", authRoutes);

app.listen(port,()=>console.log(`server started on port: ${port}`));
