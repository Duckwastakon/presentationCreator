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
    5: {
      backgroundImageUrl: "",
      images: {
        0: {
          h: 4.817636367971245,
          layer: 0,
          src: undefined,
          w: 13.33,
          x: 0.0030000000000001137,
          y: 2.682363632028755,
        },
      },
      text: {
        0: {
          fontSize: 48,
          h: 0.7668975222328943,
          layer: 3,
          text: "Presentation Title",
          textAlign: "center",
          w: 7.950629462508527,
          x: 2.6911852687457367,
          y: 0.648929576507912,
        },
        1: {
          fontSize: 24,
          h: 0.3762796119112687,
          layer: 3,
          text: "made by",
          textAlign: "center",
          w: 4.200000000000001,
          x: 4.5665,
          y: 1.9156969653620886,
        },
      },
    },
    6: {
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
      images: {
        0: {
          h: 7.5,
          layer: 0,
          src: undefined,
          w: 9,
          x: 0,
          y: 0,
        },
      },
    },
  },
  "info slides": {
    0: {
      backgroundImageUrl: "",
      text: {},
      images: {},
    },
    1: {
      backgroundImageUrl: "",
      text: {
        0: {
          fontSize: 56,
          h: 0.8855893625188422,
          text: "Title",
          textAlign: "left",
          w: 3,
          x: 1.0736738979758886,
          y: 1.6346594884058643,
        },
        1: {
          fontSize: 28,
          h: 3.5446932665667457,
          text: "Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text",
          textAlign: "left",
          w: 11.185652204048223,
          x: 1.0736738979758886,
          y: 2.958744176533534,
        },
      },
      images: {},
    },
    2: {
      backgroundImageUrl: "",
      text: {
        0: {
          fontSize: 56,
          h: 0.8855893625188422,
          text: "Slide x",
          textAlign: "center",
          w: 11.185652204048223,
          x: 1.0736738979758886,
          y: 1.6346594884058643,
        },
        1: {
          fontSize: 28,
          h: 3.5446932665667457,
          text: "Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text Text text",
          textAlign: "center",
          w: 11.185652204048223,
          x: 1.0736738979758886,
          y: 2.958744176533534,
        },
      },
      images: {},
    },
    3: {
      backgroundImageUrl: "",
      text: {
        0: {
          fontSize: 56,
          h: 0.8970653384480248,
          text: "Title1",
          w: 8.528595877026847,
          x: 1.4714041229731532,
          y: 1.3014673307759876,
        },
        1: {
          fontSize: 56,
          h: 0.8970653384480248,
          text: "Title2",
          textAlign: "right",
          w: 8.528595877026847,
          x: 3.333,
          y: 3.75,
        },
        2: {
          fontSize: 28,
          h: 1.6917676015220877,
          text: "line1\nline2\nline3\nline4",
          w: 8.528595877026849,
          x: 1.526890473474901,
          y: 2.1985326692240124,
        },
        4: {
          fontSize: 28,
          h: 1.6694764679233578,
          text: "line1\nline2\nline3\nline4",
          textAlign: "right",
          w: 8.528595877026847,
          x: 3.333,
          y: 4.647065338448025,
        },
      },
      images: {},
    },
    4: {
      backgroundImageUrl: "",
      text: {
        0: {
          fontSize: 24,
          h: 2.7156657803098883,
          layer: 3,
          text: "textbox1\n\nline1\nline2\nline3\nline4\nline5\nline6",
          textAlign: "center",
          w: 4.9252201425622255,
          x: 1.7412798574377746,
          y: 1.0343342196901117,
        },
        1: {
          fontSize: 24,
          h: 2.7156657803098883,
          layer: 3,
          text: "textbox1\n\nline1\nline2\nline3\nline4\nline5\nline6",
          textAlign: "center",
          w: 4.9252201425622255,
          x: 6.6665,
          y: 3.75,
        },
      },
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
          x: 13.333 - 0.9443963117768162,
          y: 0.9344826362214995,
        },
      },
      text: {
        0: {
          fontSize: 48,
          h: 0.7525579012330925,
          text: "Image 2",
          textAlign: "right",
          w: 13.333 - 4.199999999999999,
          x: 5.653491747745976,
          y: 0.9344826362214995,
        },
        1: {
          fontSize: 32,
          h: 4.072660686444728,
          text: "text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text",
          w: 5.065408093010376,
          x: 13.333 - 5.653491747745976,
          y: 2.492856677333773,
          textAlign: "right",
        },
      },
    },
    2: {
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
    3: {
      backgroundImageUrl: "",
      images: {
        0: {
          h: 2.8362058191329407,
          layer: 0,
          src: undefined,
          w: 2.8362058191329407,
          x: 1.6763282143593612,
          y: 2.75,
        },
        3: {
          h: 2.8362058191329407,
          layer: 0,
          src: undefined,
          w: 2.8362058191329407,
          x: 5.24839709043353,
          y: 2.75,
        },
        4: {
          h: 2.8362058191329407,
          layer: 0,
          src: undefined,
          w: 2.8362058191329407,
          x: 8.820465966507697,
          y: 2.75,
        },
      },
      text: {
        0: {
          fontSize: 72,
          h: 1.1,
          text: "Title",
          textAlign: "center",
          w: 3,
          x: 5.1665,
          y: 2.65,
        },
      },
    },
    4: {
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
    5: {
      backgroundImageUrl: "",
      text: {},
      images: {
        0: {
          h: 5.783848190522906,
          layer: 0,
          src: undefined,
          w: 4.743222276039976,
          x: 7.6665,
          y: 0.8580759047385471,
        },
        1: {
          h: 5.783848190522906,
          layer: 0,
          src: undefined,
          w: 4.743222276039976,
          x: 0.923277723960024,
          y: 0.8580759047385471,
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
    1: {
      backgroundImageUrl: "",
      text: {
        0: {
          fontSize: 52,
          h: 1.5584401172902262,
          text: "Thank you for listening",
          textAlign: "center",
          w: 4.261253363186806,
          x: 4.535873318406598,
          y: 2.9707799413548868,
        },
      },
      images: {},
    },
    2: {
      backgroundImageUrl: "",
      text: {
        0: {
          fontSize: 52,
          h: 1.5584401172902262,
          text: "Thank you for listening",
          textAlign: "center",
          w: 4.261253363186806,
          x: 6.535873318406598,
          y: 2.9707799413548868,
        },
      },
      images: {},
    },
    3: {
      backgroundImageUrl: "",
      text: {
        0: {
          fontSize: 52,
          h: 1.5584401172902262,
          text: "Thank you for listening",
          textAlign: "center",
          w: 4.261253363186806,
          x: 2.535873318406598,
          y: 2.9707799413548868,
        },
      },
      images: {},
    },
    4: {
      backgroundImageUrl: "",
      text: {
        0: {
          fontSize: 52,
          h: 1.5584401172902262,
          text: "Thank you for listening",
          textAlign: "center",
          w: 4.261253363186806,
          x: 6.535873318406598,
          y: 5,
        },
      },
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
