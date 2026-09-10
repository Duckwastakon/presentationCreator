import { useState } from "react";
import { savePresentation } from "../fetchFunctions";
import { useVariables } from "../presentationVariables";
import saveButton from "./save.png";

export const HeaderBar = () => {
  const {
    allSlides,
    updateAllSlides,
    updateCurrentSlideVariables,
    updateCurrentlySelectedSlideId,
    changeCreateNewSlideId,
    setSelectedObject,
    saveNewChanges,
  } = useVariables();

  const [presentationName, updateName] = useState("New presentation");

  return (
    <div className="headerBar" style={{ zIndex: 110 }}>
      <button
        onMouseUp={() => {
          console.log("hey");
          updateAllSlides({});
          updateCurrentSlideVariables({});
          updateCurrentlySelectedSlideId(-1);
          changeCreateNewSlideId(0);
          setSelectedObject(["", ""]);

          saveNewChanges({
            allSlidesOverride: {},
            currentSlideVariablesOverride: {},
            currentlySelectedSlideIdOverride: -1,
            createNewSlideIdOverride: 0,
            selectedObjectOverride: ["", ""],
          });
        }}
        className="clearButton"
      >
        start new presentation
      </button>
      <input
        className="presentationNameInput"
        value={presentationName}
        onInput={(newVal) => {
          updateName(newVal.target.value);
        }}
      />
      <button
        onMouseUp={() => {
          savePresentation(allSlides, presentationName);
        }}
        className="saveButton"
      >
        <img className="saveImage" src={saveButton} />
      </button>
    </div>
  );
};
