import express from "express";
import cors from "cors";
import APIRouter from "../routes/API.js"
import presentationFileRouter from "../routes/presentationFiles.js"
import styleRouter from "../routes/presentationDesigns.js";
import { httpServerHandler } from "cloudflare:node";

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

app.listen(3000)
export default httpServerHandler({ port: 3000 });