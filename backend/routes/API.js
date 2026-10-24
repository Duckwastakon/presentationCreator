import express from "express";
import { env } from "cloudflare:workers";

const APIRouter = express.Router();

let i = 0;

APIRouter.get("/", async (req, res) => {
    const gottenQuery = req.query.query;
    console.log(gottenQuery)
    const resp = await fetch(`https://api.pexels.com/v1/search?query=${gottenQuery}`, {
    headers: {
      Authorization: env.IMAGE_API_KEY,
    },
  });

  i+=1

  const data = await resp.json();
  res.json(data.photos);
});

export default APIRouter;
