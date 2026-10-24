import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import APIRouter from "./routes/API.js"
import presentationFileRouter from "./routes/presentationFiles.js"
import styleRouter from "./routes/presentationDesigns.js";
import { env } from "cloudflare:workers";
import { httpServerHandler } from "cloudflare:node";

dotenv.config();

const app = express()

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/API", APIRouter)
app.use("/generateFile", presentationFileRouter)
app.use("/styles", styleRouter)

app.get("/", (req, res) => {
    res.json({ message: "Hello app is working!" });
});

const Port = process.env.PORT || 3000

app.listen(Port, ()=>{
    console.log(`App is listening on port ${Port}`)
})

export default httpServerHandler({ port: 3000 });