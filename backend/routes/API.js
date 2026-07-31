import express from "express";
import dotenv from "dotenv";

dotenv.config();

const APIRouter = express.Router();

APIRouter.get("/", async (req, res) => {
    const gottenQuery = req.query.query;
    console.log(gottenQuery)
    const resp = await fetch(`https://api.pexels.com/v1/search?query=${gottenQuery}`, {
    headers: {
      Authorization: process.env.IMAGE_API_KEY,
    },
  });

  const data = await resp.json();
  res.json(data.photos[Math.round(Math.random()*14)].src.original);
});

export default APIRouter;
