import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import APIRouter from "./routes/API.js"

dotenv.config();

const app = express()

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/API", APIRouter)

app.get("/", (req, res) => {
    res.json({ message: "Hello from Express!" });
});

const Port = process.env.PORT || 5000

app.listen(Port, ()=>{
    console.log(`App is listening on http://localhost:${Port}`)
})