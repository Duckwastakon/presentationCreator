import { useState } from "react";
import saveButton from "./images/save.png";
import arrow from "./images/arrow.png";
import closeCross from "./images/close.png";
import { useVariables } from "../../presentationVariables";
import { savePresentation } from "../../fetchFunctions";
import "./style.css";

export const HeaderBar = () => {
  const {
    allSlides,
    updateAllSlides,
    updateCurrentSlideVariables,
    updateCurrentlySelectedSlideId,
    changeCreateNewSlideId,
    setSelectedObject,
    saveNewChanges,
    changeLoading,
  } = useVariables();

  const [presentationName, updateName] = useState("Presentation name");
  const [saveWindow, updateSave] = useState(false);

  return (
    <div className="headerBar" style={{ zIndex: 110 }}>
      {saveWindow && (
        <div
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            top: "0",
            left: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "120",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="backgroundDiv">
            <button
              className="closeButton"
              onMouseDown={() => {
                updateSave(false);
              }}
            >
              <img className="closeImage" src={closeCross} />
            </button>
            <p>Save presentation to files</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                placeholder="enter presentation name"
                className="presentationNameInput"
                value={presentationName}
                onInput={(newVal) => {
                  updateName(newVal.target.value);
                }}
              />
              <button
                onMouseUp={async () => {
                  changeLoading(true);
                  await savePresentation(allSlides, presentationName);
                  updateSave(false);
                  changeLoading(false);
                }}
                className="confirmButton"
              >
                <p>save</p>
              </button>
            </div>
            <p>Exporting might take a few moments</p>
          </div>
        </div>
      )}
      <button
        onMouseUp={() => {
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
      {/* <input
      placeholder="enter presentation name"
        className="presentationNameInput"
        value={presentationName}
        onInput={(newVal) => {
          updateName(newVal.target.value);
        }}
      /> */}
      <button
        onMouseUp={() => {
          updateSave(true);
        }}
        className="saveButton"
      >
        <img className="saveImage" src={saveButton} />
        <img className="saveImage" src={arrow} />
      </button>
    </div>
  );
};
