import "./style.css";
import arrowLeft from "./images/arrowLeft.png";
import arrowRight from "./images/arrowRight.png";

import { useVariables } from "../../presentationVariables";
import { MiniDisplay } from "../slidesTab/components/miniDisplay";
import { useEffect, useRef, useState } from "react";
import { clamp } from "../../extraFunctions";

export const SlideStylePicker = () => {
  const { newSlidePrefabs, currentPageNumber, updatePageNumber } =
    useVariables();

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

  useEffect(() => {
    let fullWidth = prefabContainer.current.getBoundingClientRect().width;
    let prefabsRows = Math.round(fullWidth / 320)
    let width = clamp(fullWidth, 0, 320)
    let onePrefabHeight = (width / 800) * 450;
    let height = window.innerHeight * 0.5;

    updateMaxDisplayedPrefabs(clamp(Math.round(height / (onePrefabHeight + 8))  * prefabsRows, 1, 4));
    getNewStyles(clamp(Math.round(height / (onePrefabHeight + 8))  * prefabsRows, 1, 4));
  }, [newSlidePrefabs]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "85%",
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
      <div ref={prefabContainer} className="styleChoiceContainer">
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
