import express, { text } from "express";

const designs = {
  "intro slides": {
    0: {
      backgroundImageUrl: "",
      text: {},
      images: {},
    },
    1: {
      backgroundImageUrl: "",
      text: {
        0: {
          x: 13.333 / 2 - 3 / 2,
          y: 3.75 - 1.1,
          w: 3,
          h: 1.1,
          fontSize: 52,
          text: "Title",
          textAlign: "center",
        },
        1: {
          x: 13.333 / 2 - 1.5 / 2,
          y: 3.75 + 0.4333,
          w: 1.5,
          h: 0.4333,
          fontSize: 16,
          text: "name",
          textAlign: "center",
        },
      },
      images: {},
    },
    2: {
      backgroundImageUrl: "",
      text: {
        0: {
          x: 13.333 - 1 - 3,
          y: 7.5 / 2 - 1.111 / 2,
          w: 3,
          h: 1.111,
          fontSize: 56,
          text: "Title",
        },
        1: {
          x: 1 + 3,
          y: 7.5 / 2 - 1.111 / 2,
          w: 3,
          h: 1.111,
          text: "Name",
        },
      },
      images: {},
    },
    3: {
      backgroundImageUrl: "",
      text: {
        0: {
          x: 1,
          y: 2,
          w: 3,
          h: 1.5,
          fontSize: 24,
          text: "Hey",
        },
        1: {
          x: 1,
          y: 3,
          w: 1.5,
          h: 1.5,
          fontSize: 16,
          text: "Hi",
        },
      },
      images: {},
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
      images: {
        0: {
          x: 4,
          y: 2,
          w: 3,
          h: 3,
          src: "",
        },
        1: {
          x: 5,
          y: 4,
          w: 3,
          h: 3,
          src: "",
        },
      },
    },
    5: {
      backgroundImageUrl: "",
      text: {
        0: {
          x: 1,
          y: 2,
          w: 3,
          h: 0.5666,
          fontSize: 24,
          text: "Title",
        },
        1: {
          x: 1,
          y: 3,
          w: 1.5,
          h: 0.4333,
          fontSize: 16,
          text: "name",
        },
      },
      images: {},
    },
  },
  "info slides": {
    0: {
      backgroundImageUrl: "",
      text: {},
      images: {},
    },
  },
  "image slides": {
    0: {
      backgroundImageUrl: "",
      text: {},
      images: {},
    },
  },
  "credit slide": {},
  "outro slides": {
    0: {
      backgroundImageUrl: "",
      text: {},
      images: {},
    },
  },
};

const styleRouter = express.Router();

styleRouter.get("/", async (req, res) => {
  const gottenType = req.query.type;

  let data = designs[gottenType];
  res.json(data);
});

styleRouter.get("/all", async (req, res) => {
  res.json(Object.keys(designs));
});

export default styleRouter;
