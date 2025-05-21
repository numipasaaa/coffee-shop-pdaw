import express from 'express'
import cors from 'cors'
import {connectDB} from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';


// app config
const app = express()
const PORT = 4000

// middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter, () => {
    console.log("User route is working")
})


app.get("/", (req, res)=>{
    res.send("API Working")
})

// listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} ( http://localhost:${PORT} ).`)
})
