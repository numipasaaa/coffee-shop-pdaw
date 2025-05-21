import express from 'express'
import cors from 'cors'
import {connectDB} from "./config/db.js";
import foodModel from "./models/foodModel.js";
import foodRouter from "./routes/foodRoute.js";
import e from "express";


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

app.get("/", (req, res)=>{
    res.send("API Working")
})

// listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
