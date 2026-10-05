import "./style.css";
import arrowLeft from "./images/arrowLeft.png";
import arrowRight from "./images/arrowRight.png";

import { useVariables } from "../../presentationVariables";
import { MiniDisplay } from "./components/miniDisplay";
import { useEffect, useRef, useState } from "react";
import { clamp } from "../../extraFunctions";
import { createNewSlide } from "../../slideFunctions";

export const SlideStylePicker = () => {
  const {
    newSlidePrefabs,
    currentPageNumber,
    updatePageNumber,
    selectedPrefabType,

    createNewSlideId,
    changeCreateNewSlideId,
    currentlySelectedSlideId,
    updateCurrentlySelectedSlideId,
    allSlides,
    updateAllSlides,
    saveNewChanges,
    updateCurrentSlideVariables,

    usedImages,
  } = useVariables();

  const [maxDisplayedPrefabs, updateMaxDisplayedPrefabs] = useState(4);
  const prefabContainer = useRef(null);

  function changePage(allObj, objPerPage, newPageVal, changeFunc) {
    const possiblePages = Math.ceil(allObj / objPerPage);
    if (newPageVal > possiblePages) {
      newPageVal = 0;
    }
    if (newPageVal < 0) {
      newPageVal = possiblePages;
    }

    changeFunc(newPageVal);
    getNewStyles(objPerPage);
  }

  const [possibleStyles, updateStyles] = useState({});

  function getNewStyles(maxStyles) {
    let newPrefabs = {};
    for (let i = 0; i < maxStyles; i++) {
      if (newSlidePrefabs[i + currentPageNumber * maxStyles] != null) {
        newPrefabs = {
          ...newPrefabs,
          [i]: newSlidePrefabs[i + currentPageNumber * maxStyles],
        };
      }
    }

    updateStyles(newPrefabs);
  }

  function getLinkAndCreator(APIReturn) {
    const currentInUseImages = usedImages.current;

    for (let imageType of Object.entries(currentInUseImages)) {
      for (let imageVals of imageType[1]) {
        if (imageVals.src.original == APIReturn) {
          let newVals = [imageVals.photographer, imageVals.url];
          return newVals;
        }
      }
    }

    return ["failed to get", "failed to get link"];
  }

  function generateCreditSlide() {
    const generatedSlide = {
      backgroundImageUrl: "",
      text: {
        0: {
          x: 0,
          y: 0,
          w: 13.333,
          h: 0.5,
          text: "Image authors",
          fontSize: 24,
          textAlign: "center",
        },
        1: {
          x: 0,
          y: 0.5,
          w: 13.333,
          h: 0.5,
          text: "Find them on pexels.com",
          fontSize: 24,
          textAlign: "center",
        },
      },
      images: {},
    };

    let toDisplay = [];

    Object.entries(allSlides).map(async (val) => {
      if (
        val[1].backgroundImageUrl !== undefined &&
        val[1].backgroundImageUrl !== ""
      ) {
        toDisplay.push(getLinkAndCreator(val[1].backgroundImageUrl));
      }
      Object.entries(val[1].images).map((imageObj) => {
        if (imageObj[1].src !== undefined && imageObj[1].src !== "") {
          toDisplay.push(getLinkAndCreator(imageObj[1].src));
        }
      });
    });

    const namesPerColumn = 10;
    let namesToDisplay = toDisplay.length;
    const columns = Math.ceil(namesToDisplay / namesPerColumn);
    toDisplay.map((val, index) => {
      let newText = {
        x: (13.333 / columns) * Math.floor(index / 10),
        y: 1 + (6.5 / clamp(namesToDisplay, 1, 10)) * (index % 10),
        w: 13.333 / columns,
        h: 7.5 / 10 / 2,
        text: val[0].toString(),
        fontSize: 16,
        textAlign: "center",
      };
      let newText2 = {
        x: (13.333 / columns) * Math.floor(index / 10),
        y: 1 + (6.5 / clamp(namesToDisplay, 1, 10)) * (index % 10) + ((7.5 / 10) / 2),
        w: 13.333 / columns,
        h: 7.5 / 10 / 2,
        text: val[1].toString(),
        fontSize: 16,
        textAlign: "center",
      };

      generatedSlide["text"][2 + index * 2] = newText;
      generatedSlide["text"][2 + index * 2 + 1] = newText2;
    });

    updateCurrentSlideVariables(generatedSlide);
    let newValues = createNewSlide(
      generatedSlide,
      createNewSlideId,
      changeCreateNewSlideId,
      currentlySelectedSlideId,
      updateCurrentlySelectedSlideId,
      allSlides,
      updateAllSlides,
    );

    saveNewChanges({
      currentlySelectedSlideIdOverride: newValues[1],
      allSlidesOverride: newValues[0],
      currentSlideVariablesOverride: generatedSlide,
      createNewSlideIdOverride: -1,
    });
  }

  useEffect(() => {
    function setMaxRowAndColumn() {
      let fullWidth =
        prefabContainer.current.getBoundingClientRect().width * 0.7;
      let prefabsRows = Math.floor(fullWidth / 245);

      updateMaxDisplayedPrefabs(clamp(prefabsRows * 2, 1, 4));
      getNewStyles(clamp(prefabsRows * 2, 1, 4));
    }

    setMaxRowAndColumn();

    window.addEventListener("resize", setMaxRowAndColumn);
  }, [newSlidePrefabs]);

  return (
    <div
      ref={prefabContainer}
      style={{
        display: "flex",
        width: "100%",
        flex: "1",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <button
        onClick={() => {
          changePage(
            Object.entries(possibleStyles).length,
            maxDisplayedPrefabs,
            currentPageNumber - 1,
            updatePageNumber,
          );
        }}
        className="changePageButton"
      >
        <img className="arrowImage" src={arrowLeft} />
      </button>
      <div className="styleChoiceContainer">
        {selectedPrefabType == "credit slide" && (
          <button
            onClick={() => {
              generateCreditSlide();
            }}
            className="generateCreditsButton"
          >
            <p>generate image credits</p>
          </button>
        )}
        {Object.entries(possibleStyles).map((vars, index) => (
          <MiniDisplay key={index} ind={index} vars={vars[1]} />
        ))}
      </div>
      <button
        onClick={() => {
          changePage(
            Object.entries(possibleStyles).length,
            maxDisplayedPrefabs,
            currentPageNumber + 1,
            updatePageNumber,
          );
        }}
        className="changePageButton"
      >
        <img className="arrowImage" src={arrowRight} />
      </button>
    </div>
  );
};
