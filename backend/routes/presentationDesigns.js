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
          x: 5.1665,
          y: 2.65,
          w: 2.999999999999999,
          h: 0.8416135323514228,
          fontSize: 52,
          text: "Title",
          textAlign: "center",
        },
        1: {
          x: 5.9165,
          y: 4.1833,
          w: 1.5,
          h: 0.24355453667059176,
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
          x: 1,
          y: 2.864410637481158,
          w: 3,
          h: 0.8855893625188422,
          fontSize: 56,
          textAlign: "left",
          text: "Title",
        },
        1: {
          x: 1,
          y: 4.126272671780083,
          w: 3,
          h: 0.44316954946869214,
          fontSize: 28,
          textAlign: "left",
          text: "Name",
        },
      },
      images: {},
    },
    3: {
      backgroundImageUrl: "",
      text: {
        0: {
          x: 9.333,
          y: 2.8642412673677917,
          w: 3,
          h: 0.8857587326322085,
          fontSize: 56,
          textAlign: "right",
          text: "Title",
        },
        1: {
          x: 9.333,
          y: 4.126272671780083,
          w: 3,
          h: 0.44300975979350504,
          fontSize: 28,
          textAlign: "right",
          text: "Name",
        },
      },
      images: {},
    },
    4: {
      backgroundImageUrl: "",
      text: {
        0: {
          x: 5.1665,
          y: 3.2,
          w: 3,
          h: 1.1,
          fontSize: 72,
          textAlign: "center",
          text: "Title",
        },
        1: {
          x: 3.3861301172540585,
          y: 5.387372836769533,
          w: 6.560739765491883,
          h: 0.44270751786671614,
          fontSize: 24,
          textAlign: "center",
          text: "made by",
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
    1: {
      backgroundImageUrl: "",
      images: {
        0: {
          h: 5.631034727557001,
          src: undefined,
          w: 3.8436902136196847,
          x: 0.9443963117768162,
          y: 0.9344826362214995,
        },
      },
      text: {
        0: {
          fontSize: 48,
          h: 0.7525579012330925,
          text: "Image 1",
          textAlign: "left",
          w: 4.199999999999999,
          x: 5.653491747745976,
          y: 0.9344826362214995,
        },
        1: {
          fontSize: 32,
          h: 4.072660686444728,
          text: "text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text",
          w: 5.065408093010376,
          x: 5.653491747745976,
          y: 2.492856677333773,
        },
      },
    },
    2: {
      backgroundImageUrl: "",
      images: {
        0: {
          h: 2,
          w: 2,
          x: 1.333,
          y: 0.75,
          src: undefined,
        },
        1: {
          h: 2,
          w: 2,
          x: 10,
          y: 2.75,
          src: undefined,
        },
        2: {
          h: 2,
          w: 2,
          x: 1.333,
          y: 4.75,
          src: undefined,
        },
      },
      text: {
        0: {
          fontSize: 56,
          h: 0.8970653384480248,
          text: "Image 1",
          w: 8.528595877026847,
          x: 3.471404122973153,
          y: 1.3014673307759876,
        },
        1: {
          fontSize: 56,
          h: 0.8970653384480248,
          text: "Image 2",
          textAlign: "right",
          w: 8.528595877026847,
          x: 1.264459614309434,
          y: 3.3014673307759876,
        },
        2: {
          fontSize: 56,
          h: 0.8970653384480248,
          text: "Image 3",
          w: 8.528595877026847,
          x: 3.471404122973153,
          y: 5.301467330775988,
        },
      },
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
