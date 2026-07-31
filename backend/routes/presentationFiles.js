import express from "express";
import dotenv from "dotenv";
import pptxgenjs from "pptxgenjs";

dotenv.config();

const presentationFileRouter = express.Router();

presentationFileRouter.post("/", (req, res) => {
    const pptgen = new pptxgenjs()

    pptgen.layout = "LAYOUT_WIDE"

    const slide = pptgen.addSlide()
});

export default presentationFileRouter;
