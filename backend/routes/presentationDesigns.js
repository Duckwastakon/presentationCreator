import express, { text } from "express";

const designs = {
  intro: {
    0: {
      text: {
        0: {
          x: 1,
          y: 2,
          w: 3,
          h: 0.5,
          fontSize: 24,
          text: "Hey",
        },
        1: {
          x: 1,
          y: 3,
          w: 1.5,
          h: 0.5,
          fontSize: 16,
          text: "Hi",
        },
      },
    },
    1: {
      text: {
        0: {
          x: 1,
          y: 2,
          w: 3,
          h: 0.5,
          fontSize: 24,
          text: "Hey",
        },
        1: {
          x: 1,
          y: 3,
          w: 1.5,
          h: 0.5,
          fontSize: 16,
          text: "Hi",
        },
      },
    },
        2: {
      text: {
        0: {
          x: 1,
          y: 2,
          w: 3,
          h: 0.5,
          fontSize: 24,
          text: "Hey",
        },
        1: {
          x: 1,
          y: 3,
          w: 1.5,
          h: 0.5,
          fontSize: 16,
          text: "Hi",
        },
      },
    },
  },
};

const styleRouter = express.Router();

styleRouter.get("/", async (req, res) => {
  const gottenType = req.query.type;
  console.log(gottenType);

  const data = designs[gottenType];
  console.log(data);
  res.json(data);
});

export default styleRouter;
