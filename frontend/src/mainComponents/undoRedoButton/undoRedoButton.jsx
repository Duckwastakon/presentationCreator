import "./style.css";

import { changeHistory, getButtonStates } from "../../keyBindFunctions";
import { useVariables } from "../../presentationVariables";

import undoIcon from "./images/undo.png";
import redoIcon from "./images/redo.png";
import { useState } from "react";

import saveButton from "./images/save.png";
import arrow from "./images/arrow.png";
import closeCross from "./images/close.png";
import { savePresentation } from "../../fetchFunctions";

export const UndoRedo = () => {
  let buttonStates = getButtonStates();

  const {
    updateAllSlides,
    updateCurrentSlideVariables,
    setUpdateVariable,
    setSelectedObject,
    updateNewSlidePrefabs,
    updatePageNumber,
    changeSelectedPrefabType,
    updateModal,
    updateCurrentlySelectedSlideId,
    changeCreateNewSlideId,
    setSelectedObjectsVariables,
    allSlides,
    saveNewChanges,
    changeLoading,
  } = useVariables();

  const [presentationName, updateName] = useState("Presentation name");
  const [saveWindow, updateSave] = useState(false);

  return (
    <div className="headerDiv">
      <div className="buttonContainer">
        <button
          disabled={buttonStates[0]}
          onPointerDown={() => {
            if (buttonStates[0]) return;
            changeHistory(
              -1,
              updateAllSlides,
              updateCurrentSlideVariables,
              setUpdateVariable,
              setSelectedObject,
              updateNewSlidePrefabs,
              updatePageNumber,
              changeSelectedPrefabType,
              updateModal,
              updateCurrentlySelectedSlideId,
              changeCreateNewSlideId,
              setSelectedObjectsVariables,
            );
          }}
          className="redoundoButton"
        >
          <img className="btnImage" src={undoIcon} />
          <p className="btnText">undo</p>
        </button>
        <button
          disabled={buttonStates[1]}
          onPointerDown={() => {
            if (buttonStates[1]) return;
            changeHistory(
              1,
              updateAllSlides,
              updateCurrentSlideVariables,
              setUpdateVariable,
              setSelectedObject,
              updateNewSlidePrefabs,
              updatePageNumber,
              changeSelectedPrefabType,
              updateModal,
              updateCurrentlySelectedSlideId,
              changeCreateNewSlideId,
              setSelectedObjectsVariables,
            );
          }}
          className="redoundoButton"
        >
          <img className="btnImage" src={redoIcon} />
          <p className="btnText">redo</p>
        </button>
      </div>
      <div className="buttonContainer">
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
          <p className="btnText">restart</p>
        </button>

        <button
          onMouseUp={() => {
            updateSave(true);
          }}
          className="saveButton"
        >
          <img className="btnImage" src={saveButton} />
          {/* <img className="btnImage" src={arrow} /> */}
        </button>
      </div>
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
    </div>
  );
};
