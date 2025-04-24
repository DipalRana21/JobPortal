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
const PORT=process.env.PORT || 5001;


app.use(cors({

    origin: "https://job-portal-three-mauve.vercel.app",
    credentials: true
}));

// app.use(cors({
//     origin:"https://localhost:5173",
//     credentials: true, // Allow cookies if you're using authentication
// }))
    

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

//api
app.use('/api/v1/user',userRoute);
app.use('/api/v1/company',companyRoute);
app.use('/api/v1/job',jobRoute);
app.use('/api/v1/application',applicationRoute);



mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log("MongoDB Atlas Connected"))
.catch(err=> console.log("Connection error"+ err));


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})

