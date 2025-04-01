import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import cookieParser from "cookie-parser";
import mongoose from "mongoose";


import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app=express();
const PORT=process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
    credentials: true, // Allow cookies if you're using authentication
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//api
app.use('/api/v1/user',userRoute);
app.use('/api/v1/company',companyRoute);
app.use('/api/v1/job',jobRoute);
app.use('/api/v1/application',applicationRoute);

app.use(cors({credentials: true, origin: "http://localhost:5173"}))

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log("MongoDB Atlas Connected"))
.catch(err=> console.log("Connection error"+ err));


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})