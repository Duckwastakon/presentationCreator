import express, { json, text } from "express";
import dotenv from "dotenv";
import pptxgenjs from "pptxgenjs";

dotenv.config();

const presentationFileRouter = express.Router();

presentationFileRouter.post("/", async (req, res) => {
  const gottenBody = req.body.slides;
  const presentationName = JSON.stringify(req.body.presentationName)
  console.log(presentationName)

  const pptgen = new pptxgenjs();

  pptgen.layout = "LAYOUT_WIDE";

  Object.entries(gottenBody).map((slideVariables) => {
    const newSlide = pptgen.addSlide();

    newSlide.background = {
      color: slideVariables[1]["backgroundColor"] || "#ffffff",
      path: slideVariables[1]["backgroundImageUrl"],
    };

    Object.entries(slideVariables[1]["text"]).map((textVariables) => {
      newSlide.addText(textVariables[1].text, {
        x: textVariables[1].x,
        y: textVariables[1].y,
        w: textVariables[1].w,
        h: textVariables[1].h,
        color: textVariables[1].textColor || "#000000",
        outline: {
          color: textVariables[1].outlineColor || "#000000",
          size: textVariables[1].outlineWidth || 0,
        },
        fontSize: textVariables[1].fontSize,
        bold: textVariables[1].bold == "700",
        italic: textVariables[1].fontStyle == "italic",
        underline: textVariables[1].textDecoration == "underline",
      });
    });

    Object.entries(slideVariables[1]["images"]).map((imageVariables) => {
      let borderWidth = imageVariables[1].borderWidth
      if (borderWidth !== 0 && borderWidth !== undefined) {
        newSlide.addShape(pptgen.ShapeType.rect, {
          x: imageVariables[1].x,
          y: imageVariables[1].y,
          w: imageVariables[1].w,
          h: imageVariables[1].h,

          fill: {
            transparency: 100
          },

          line: {
            color: "#000000",
            width: borderWidth * 1.5
          }
        });
      }
      console.log(imageVariables);
      newSlide.addImage({
        altText: "failed to load",
        x: imageVariables[1].x,
        y: imageVariables[1].y,
        w: imageVariables[1].w,
        h: imageVariables[1].h,
        path: imageVariables[1].src,
        rounding: imageVariables[1].rounded || false,
      });
    });
  });

  const generatedPresentation = await pptgen.write({
    outputType: "nodebuffer",
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${presentationName}.pptx"`,
  );

  res.send(generatedPresentation);
});

export default presentationFileRouter;
