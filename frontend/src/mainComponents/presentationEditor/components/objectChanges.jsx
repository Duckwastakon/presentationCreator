import { useState } from "react";
import deleteIcon from "../images/trashcan.png";
import activeDeleteIcon from "../images/trashcanOpen.png";
import { useVariables } from "../../../presentationVariables";
import { saveSlide } from "../../../slideFunctions";
import { delObj, dupObj } from "../../../objectFunctions";

export const ObjectChanges = ({ posX, objectIndex, objectData }) => {
  const [hoverSrc, updateSrc] = useState(deleteIcon);

  const {
    currentSlideVariables,
    updateCurrentSlideVariables,
    updateAllSlides,
    allSlides,
    currentlySelectedSlideId,
    selectedObject,
    setUpdateVariable,
    setSelectedObject,
    saveNewChanges
  } = useVariables();

  function save(newSlide) {
    let newAllSlides = saveSlide(newSlide, updateAllSlides, allSlides, currentlySelectedSlideId);
    saveNewChanges({allSlidesOverride: newAllSlides, currentSlideVariablesOverride: newSlide})
  }

  function unselectObject() {
    setUpdateVariable("");
    setSelectedObject(["", ""]);
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: "-75px",
        left: `${(800 / 13.333) * (posX / 2) - 56}px`,
      }}
      className="extraButtonContainer"
    >
      <button
        className="choiceButton"
        onMouseLeave={() => updateSrc(deleteIcon)}
        onMouseEnter={() => updateSrc(activeDeleteIcon)}
        onMouseDown={() => {
          delObj(
            selectedObject[0],
            objectIndex,
            currentSlideVariables,
            updateCurrentSlideVariables,
            save,
          );
          unselectObject();
        }}
      >
        <img src={hoverSrc} style={{ width: "16px", height: "16px" }} />
      </button>
      <button
        className="choiceButton"
        onMouseDown={() =>
          dupObj(
            selectedObject[0],
            objectData,
            currentSlideVariables,
            updateCurrentSlideVariables,
            save,
          )
        }
      >
        Dup
      </button>
    </div>
  );
};
