import "./componentStyling/slidePickerStyling.css";
import arrowLeft from "./arrowLeft.png"
import arrowRight from "./arrowRight.png"

import { MiniDisplay } from "./miniComponents/slideStyleComponents/miniDisplay";

export const SlideStylePicker = ({
  newSlidePrefabs,
  updateCurrentSlideVariables,
  currentPageNumber,
  updatePageNumber,
  createSlide,
  
}) => {
  function changePage(allObj, objPerPage, newPageVal, changeFunc) {
    const possiblePages = Math.ceil(allObj / objPerPage);
    if (newPageVal > possiblePages) {
      newPageVal = 0;
    }
    if (newPageVal < 0) {
      newPageVal = possiblePages;
    }

    changeFunc(newPageVal);
  }

  let possibleStyles = {};
  for (let i = 0; i < 4; i++) {
    if (newSlidePrefabs[i + currentPageNumber * 4] != null) {
      possibleStyles = {
        ...possibleStyles,
        [i]: newSlidePrefabs[i + currentPageNumber * 4],
      };
    }
  }

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
            4,
            currentPageNumber - 1,
            updatePageNumber,
          );
        }}
        className="changePageButton"
      >
        <img className="arrowImage" src={arrowLeft}/>
      </button>
      <div className="styleChoiceContainer">
        {Object.entries(possibleStyles).map((vars, index) => (
          <MiniDisplay
            key={index}
            vars={vars[1]}
            updateCurrentSlideVariables={updateCurrentSlideVariables}
            createSlide={createSlide}
          />
        ))}
      </div>
      <button
        onClick={() => {
          changePage(
            Object.entries(possibleStyles).length,
            4,
            currentPageNumber + 1,
            updatePageNumber,
          );
        }}
        className="changePageButton"
      >
        <img className="arrowImage" src={arrowRight}/>
      </button>
    </div>
  );
};
