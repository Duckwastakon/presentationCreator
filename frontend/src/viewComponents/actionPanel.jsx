import { useEffect } from "react";
import { clamp } from "../extraFunctions";
import { getImage } from "../fetchFunctions";
import { createObj, updObj } from "../objectFunctions";
import { useVariables } from "../presentationVariables";
import { saveSlide } from "../slideFunctions";
import "./componentStyling/actionPanelStyling.css";

import upArrow from "./changeUp.png"
import downArrow from "./changeDown.png"

export const ActionPanel = ({ selectedObject }) => {
  const {
    allSlides,
    updateAllSlides,
    currentSlideVariables,
    updateCurrentSlideVariables,
    currentlySelectedSlideId,
    selectedObjectsVariables,
    setSelectedObjectsVariables,
    usedImages,
    updateUsedImages,
    saveNewChanges,
    updateVariable,
  } = useVariables();

  function updateObject(dataType, index, variableName, newValue) {
    let newSaveables = updObj(
      dataType,
      index,
      variableName,
      newValue,
      currentSlideVariables,
      updateCurrentSlideVariables,
      updateAllSlides,
      allSlides,
      currentlySelectedSlideId,
    );

    saveNewChanges({
      currentSlideVariablesOverride: newSaveables[0],
      allSlidesOverride: newSaveables[1],
    });
  }

  function getNewImage(event) {
    console.log(updateVariable);
    console.log(selectedObject);

    getImage(
      event,
      usedImages,
      updateUsedImages,
      updateVariable,
      currentSlideVariables,
      updateObject,
    );
  }

  function saveTempValues() {
    let currentObject = structuredClone(selectedObjectsVariables);
    let slideClone = structuredClone(currentSlideVariables);

    console.log(currentObject);

    slideClone[selectedObject[0]][selectedObject[1]] = currentObject[1];

    updateCurrentSlideVariables(slideClone);

    let newSlides = {
      ...allSlides,
      [currentlySelectedSlideId.current]: slideClone,
    };
    updateAllSlides(newSlides);

    saveNewChanges({
      allSlidesOverride: newSlides,
      currentSlideVariablesOverride: slideClone,
    });
  }

  useEffect(() => {
    let slidePos = currentlySelectedSlideId.current;
    let currentVariables = currentSlideVariables;

    return () => {
      if (selectedObject[0] !== "") {
        let currentObject = structuredClone(selectedObjectsVariables);
        let slideClone = structuredClone(currentSlideVariables);

        console.log(currentObject);

        let changed = false;
        Object.entries(currentObject[1]).map((val) => {
          console.log(val[0], val[1]);
          console.log(
            currentVariables[selectedObject[0]][selectedObject[1]][val[0]],
          );
          if (
            val[1] !==
            currentVariables[selectedObject[0]][selectedObject[1]][val[0]]
          ) {
            if (
              val[0] != "x" &&
              val[0] != "y" &&
              val[0] != "w" &&
              val[0] != "h"
            ) {
              changed = true;
              console.log("newChange");
            }
          }
        });

        if (!changed) {
          console.log("nothing new");
          return;
        }

        slideClone[selectedObject[0]][selectedObject[1]] = currentObject[1];

        updateCurrentSlideVariables(slideClone);

        let newSlides = {
          ...allSlides,
          [slidePos]: slideClone,
        };
        updateAllSlides(newSlides);

        saveNewChanges({
          allSlidesOverride: newSlides,
          currentSlideVariablesOverride: slideClone,
        });
        console.log("saved");
      }
    };
  }, [updateVariable]);
  if (selectedObject[0] === "text") {
    return (
      <div className="actionPanel">
        <div className="simpleOptionContainer">
          <p className="simpleText">font size</p>
          <input
            style={{ width: "40px" }}
            className="simpleTextInput"
            name="fontSizeText"
            value={selectedObject[2]["fontSize"]}
            onInput={(newFontSize) => {
              updateObject(
                selectedObject[0],
                selectedObject[1],
                "fontSize",
                newFontSize.target.value,
              );
            }}
            type="number"
          />
        </div>
        <div className="simpleOptionContainer">
          <p className="simpleText">color</p>
          <input
            className="simpleColorInput"
            type="color"
            name="fontColorInput"
            value={selectedObjectsVariables[1]["textColor"] || "#000000"}
            onChange={(newVal) => {
              let newObjData = structuredClone(selectedObjectsVariables);
              newObjData[1].textColor = newVal.target.value;
              console.log(newObjData);
              setSelectedObjectsVariables(newObjData);
            }}
          />
        </div>
        <div className="simpleOptionContainer">
          <p className="simpleText">text align</p>
          <div className="multipleOptions">
            <button
              className="simpleInputButton"
              style={{
                backgroundColor:
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .textAlign == "left"
                    ? "#b5b5b5"
                    : currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].textAlign == undefined && "#b5b5b5",
                fontWeight: "500",
              }}
              onClick={() => {
                updateObject(
                  selectedObject[0],
                  selectedObject[1],
                  "textAlign",
                  "left",
                );
              }}
            >
              L
            </button>
            <button
              className="simpleInputButton"
              style={{
                backgroundColor:
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .textAlign == "center" && "#b5b5b5",
                fontWeight: "500",
              }}
              onClick={() => {
                updateObject(
                  selectedObject[0],
                  selectedObject[1],
                  "textAlign",
                  "center",
                );
              }}
            >
              C
            </button>
            <button
              className="simpleInputButton"
              style={{
                backgroundColor:
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .textAlign == "right" && "#b5b5b5",
                fontWeight: "500",
              }}
              onClick={() => {
                updateObject(
                  selectedObject[0],
                  selectedObject[1],
                  "textAlign",
                  "right",
                );
              }}
            >
              R
            </button>
          </div>
        </div>
        <div className="simpleOptionContainer">
          <p className="simpleText">font extras</p>
          <div className="multipleOptions">
            <button
              className="simpleInputButton"
              style={{
                backgroundColor:
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .bold == "700" && "#b5b5b5",
                fontWeight: "bold",
              }}
              onClick={() => {
                let currentVal =
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .bold;

                if (currentVal == "700") {
                  updateObject(
                    selectedObject[0],
                    selectedObject[1],
                    "bold",
                    "400",
                  );
                } else {
                  updateObject(
                    selectedObject[0],
                    selectedObject[1],
                    "bold",
                    "700",
                  );
                }
              }}
            >
              B
            </button>
            <button
              className="simpleInputButton"
              style={{
                backgroundColor:
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .textDecoration == "underline" && "#b5b5b5",
                textDecoration: "underline",
                fontWidth: "500",
              }}
              onClick={() => {
                let currentVal =
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .textDecoration;

                if (currentVal == "underline") {
                  updateObject(
                    selectedObject[0],
                    selectedObject[1],
                    "textDecoration",
                    "none",
                  );
                } else {
                  updateObject(
                    selectedObject[0],
                    selectedObject[1],
                    "textDecoration",
                    "underline",
                  );
                }
              }}
            >
              U
            </button>
            <button
              className="simpleInputButton"
              style={{
                backgroundColor:
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .fontStyle == "italic" && "#b5b5b5",
                fontStyle: "italic",
                fontWidth: "500",
              }}
              onClick={() => {
                let currentVal =
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .fontStyle;

                if (currentVal == "italic") {
                  updateObject(
                    selectedObject[0],
                    selectedObject[1],
                    "fontStyle",
                    "normal",
                  );
                } else {
                  updateObject(
                    selectedObject[0],
                    selectedObject[1],
                    "fontStyle",
                    "italic",
                  );
                }
              }}
            >
              I
            </button>
          </div>
        </div>
        <div className="simpleOptionContainer">
          <p className="simpleText">outline width</p>
          <div className="multipleOptions">
            <input
              style={{ width: "100px" }}
              value={selectedObjectsVariables[1]["outlineWidth"] || 0}
              onInput={(newOutlineWidth) => {
                let newObjData = structuredClone(selectedObjectsVariables);
                newObjData[1].outlineWidth = newOutlineWidth.target.value;
                setSelectedObjectsVariables(newObjData);
              }}
              onMouseUp={() => {
                saveTempValues();
              }}
              min={0}
              max={10}
              step={0.5}
              type="range"
            />
            <input
              style={{ width: "36px" }}
              className="simpleTextInput"
              type="number"
              value={selectedObjectsVariables[1]["outlineWidth"] ?? 0}
              max={10}
              min={0}
              step={0.5}
              onInput={(newOutlineWidth) => {
                let newObjData = structuredClone(selectedObjectsVariables);
                newObjData[1].outlineWidth = newOutlineWidth.target.value;
                setSelectedObjectsVariables(newObjData);
                updateObject(
                  selectedObject[0],
                  selectedObject[1],
                  "outlineWidth",
                  newOutlineWidth.target.value,
                );
              }}
            />
          </div>
        </div>
        <div className="simpleOptionContainer">
          <p className="simpleText">outline color</p>
          <input
            className="simpleColorInput"
            type="color"
            name="outlineColorInput"
            value={selectedObjectsVariables[1]["outlineColor"] || "#000000"}
            onChange={(newVal) => {
              let newObjData = structuredClone(selectedObjectsVariables);
              newObjData[1].outlineColor = newVal.target.value;
              setSelectedObjectsVariables(newObjData);
            }}
            onMouseUp={() => {
              console.log("stoppedChanging");
            }}
          />
        </div>
        <div className="simpleOptionContainer">
          <p className="simpleText">layer</p>
          <div className="multipleOptions">
            <button
              style={{
                backgroundColor:
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .layer == 0 && "#ff8181",
              }}
              className="simpleInputButton"
              onClick={() => {
                let val =
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .layer ?? 1;
                console.log(val);
                console.log(
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .layer,
                );
                updateObject(
                  selectedObject[0],
                  selectedObject[1],
                  "layer",
                  clamp(val - 1, 0, 99),
                );
              }}
            >
              <img src={downArrow}></img>
            </button>
            <p className="simpleTextSpecial">
              {currentSlideVariables[selectedObject[0]][selectedObject[1]]
                .layer ?? 1}
            </p>
            <button
              className="simpleInputButton"
              onClick={() => {
                let val =
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .layer ?? 1;
                console.log(val);
                console.log(
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .layer,
                );
                updateObject(
                  selectedObject[0],
                  selectedObject[1],
                  "layer",
                  clamp(val + 1, 0, 99),
                );
              }}
            >
              <img src={upArrow}></img>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedObject[0] === "images") {
    return (
      <div className="actionPanel">
        <div className="simpleOptionContainer">
          <p className="simpleText">Set image</p>
          <form className="inLine" onSubmit={getNewImage}>
            <input
              className="simpleTextInput"
              placeholder="example `ducks`"
              name="query"
              type="text"
            />
            <button className="submitButton" type="submit">
              <p className="simpleText">search</p>
            </button>
          </form>
        </div>
        <div className="simpleOptionContainer">
          <p className="simpleText">border width</p>
          <div className="multipleOptions">
            <input
              style={{ width: "100px" }}
              type="range"
              value={selectedObjectsVariables[1]["borderWidth"] || 0}
              min={0}
              max={20}
              step={1}
              onInput={(newOutlineWidth) => {
                let newObjData = structuredClone(selectedObjectsVariables);
                newObjData[1].borderWidth = newOutlineWidth.target.value;
                setSelectedObjectsVariables(newObjData);
              }}
              onMouseUp={() => {
                saveTempValues();
              }}
            />
            <input
              style={{ width: "36px" }}
              className="simpleTextInput"
              type="number"
              value={selectedObjectsVariables[1]["borderWidth"] ?? 0}
              min={0}
              max={20}
              step={1}
              onInput={(newOutlineWidth) => {
                let newObjData = structuredClone(selectedObjectsVariables);
                newObjData[1].borderWidth = newOutlineWidth.target.value;
                setSelectedObjectsVariables(newObjData);
                updateObject(
                  selectedObject[0],
                  selectedObject[1],
                  "borderWidth",
                  newOutlineWidth.target.value,
                );
              }}
            />
          </div>
        </div>
        <div className="simpleOptionContainer">
          <p className="simpleText">border color</p>
          <input
            className="simpleColorInput"
            type="color"
            value={selectedObjectsVariables[1]["borderColor"] || "#000000"}
            onChange={(newVal) => {
              let newObjData = structuredClone(selectedObjectsVariables);
              newObjData[1].borderColor = newVal.target.value;
              setSelectedObjectsVariables(newObjData);
              //updateObject(
              //  selectedObject[0],
              //  selectedObject[1],
              //  "borderColor",
              //  newVal.target.value,
              //);
            }}
          />
        </div>
        <div className="simpleOptionContainer">
          <p className="simpleText">corner radius</p>
          <div className="multipleOptions">
            <input
              type="range"
              value={selectedObjectsVariables[1]["cornerRadius"] || 0}
              min={0}
              max={16}
              step={1}
              onInput={(newOutlineWidth) => {
                let newObjData = structuredClone(selectedObjectsVariables);
                newObjData[1].cornerRadius = newOutlineWidth.target.value;
                setSelectedObjectsVariables(newObjData);
              }}
              onMouseUp={() => {
                saveTempValues();
              }}
            />
            <input
              style={{ width: "36px" }}
              className="simpleTextInput"
              type="number"
              value={selectedObjectsVariables[1]["cornerRadius"] ?? 0}
              min={0}
              max={16}
              step={1}
              onInput={(newOutlineWidth) => {
                let newObjData = structuredClone(selectedObjectsVariables);
                newObjData[1].cornerRadius = newOutlineWidth.target.value;
                setSelectedObjectsVariables(newObjData);
                updateObject(
                  selectedObject[0],
                  selectedObject[1],
                  "cornerRadius",
                  newOutlineWidth.target.value,
                );
              }}
            />
          </div>
        </div>
        <div className="simpleOptionContainer">
          <p className="simpleText">aspect ratio</p>
          <button
            onMouseUp={() => {
              let newVals = structuredClone(selectedObject);
              const aspectRatio = newVals[2].aspectRatio || 1;

              console.log(aspectRatio);

              if (newVals[2].x > newVals[2].y) {
                const val = newVals[2].w / aspectRatio;
                updateObject(selectedObject[0], selectedObject[1], "h", val);
              } else {
                const val = newVals[2].h * aspectRatio;
                updateObject(selectedObject[0], selectedObject[1], "w", val);
              }
            }}
            className="submitButton"
          >
            <p className="simpleText">restore</p>
          </button>
        </div>
        <div className="simpleOptionContainer">
          <p className="simpleText">layer</p>
          <div className="multipleOptions">
            <button
              style={{
                backgroundColor:
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .layer == 0 && "#ff8181",
              }}
              className="simpleInputButton"
              onClick={() => {
                let val =
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .layer ?? 1;
                console.log(val);
                console.log(
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .layer,
                );
                updateObject(
                  selectedObject[0],
                  selectedObject[1],
                  "layer",
                  clamp(val - 1, 0, 99),
                );
              }}
            >
              <img src={downArrow}></img>
            </button>
            <p className="simpleTextSpecial">
              {currentSlideVariables[selectedObject[0]][selectedObject[1]]
                .layer ?? 1}
            </p>
            <button
              className="simpleInputButton"
              onClick={() => {
                let val =
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .layer ?? 1;
                console.log(val);
                console.log(
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .layer,
                );
                updateObject(
                  selectedObject[0],
                  selectedObject[1],
                  "layer",
                  clamp(val + 1, 0, 99),
                );
              }}
            >
              <img src={upArrow}></img>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedObject[0] == "") {
    return (
      <div className="actionPanel">
        <div className="simpleOptionContainer">
          <p className="simpleText">background image</p>
          <form className="inLine" onSubmit={getNewImage}>
            <input
              className="simpleTextInput"
              placeholder="example `ducks`"
              name="query"
              type="text"
            />
            <button className="submitButton" type="submit">
              <p className="simpleText">search</p>
            </button>
          </form>
        </div>
        <div className="simpleOptionContainer">
          <p className="simpleText">background color</p>
          <input
            className="simpleColorInput"
            type="color"
            value={selectedObject[2]["backgroundColor"] || "#ffffff"}
            onChange={(newVal) => {
              updateObject(
                undefined,
                undefined,
                "backgroundColor",
                newVal.target.value,
              );
            }}
          />
        </div>
        <div className="simpleOptionContainer">
          <button
          style={{background: "linear-gradient(to right, #aa55fa, #ee32ff)"}}
            onMouseDown={() => {
              const [newInd, newObj] = createObj(
                "text",
                24,
                currentSlideVariables,
              );

              updateObject("text", newInd, undefined, newObj);
            }}
            className="createNewButton"
          >
            <p style={{color: "white"}}  className="simpleText">add new text</p>
          </button>
        </div>
        <div className="simpleOptionContainer">
          <button
          style={{background: "linear-gradient(to right, #52acff, #0044d7)"}}
            onMouseDown={() => {
              saveSlide();
              const [newInd, newObj] = createObj(
                "images",
                24,
                currentSlideVariables,
              );

              updateObject("images", newInd, undefined, newObj);
            }}
            className="createNewButton"
          >
            <p style={{color: "white"}} className="simpleText">add new image</p>
          </button>
        </div>
      </div>
    );
  }
};
