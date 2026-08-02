import express, { text } from "express";

const designs = {
  intro: {
    0: {
      backgroundImageUrl: "",
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
      backgroundImageUrl: "",
      text: {
        0: {
          x: 1,
          y: 2,
          w: 3,
          h: 0.5,
          fontSize: 24,
          text: "broski",
        },
        1: {
          x: 1,
          y: 3,
          w: 1.5,
          h: 0.5,
          fontSize: 16,
          text: "good design",
        },
      },
    },
    2: {
      backgroundImageUrl: "",
      text: {
        0: {
          x: 1,
          y: 2,
          w: 3,
          h: 0.5,
          fontSize: 24,
          text: "Title",
        },
        1: {
          x: 1,
          y: 3,
          w: 1.5,
          h: 0.5,
          fontSize: 16,
          text: "Name",
        },
      },
    },
    3: {
      backgroundImageUrl: "",
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
      img: {
        0: {
          x: 4,
          y: 2,
          w: 3,
          h: 0.5,
          url: "",
        },
      },
    },
    4: {
      backgroundImageUrl: "",
      text: {
        0: {
          x: 1,
          y: 2,
          w: 3,
          h: 0.5,
          fontSize: 24,
          text: "fifth design",
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

  let data = designs[gottenType];
  console.log(data);
  console.log(Object.entries(data));
  res.json(data);
});

export default styleRouter;
