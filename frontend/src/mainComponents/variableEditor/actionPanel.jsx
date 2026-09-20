import { useEffect, useRef } from "react";
import "./style.css";
import upArrow from "./images/changeUp.png";
import downArrow from "./images/changeDown.png";
import search from "./images/search.png";
import { useVariables } from "../../presentationVariables";
import { createObj, updObj } from "../../objectFunctions";
import { getImage } from "../../fetchFunctions";
import { clamp } from "../../extraFunctions";

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
    changeLoading,
  } = useVariables();

  function updateObject(
    dataType,
    index,
    variableName,
    newValue,
    newSlide = undefined,
    save = true,
  ) {
    let newSaveables = updObj(
      dataType,
      index,
      variableName,
      newValue,
      newSlide ?? currentSlideVariables,
      updateCurrentSlideVariables,
      updateAllSlides,
      allSlides,
      currentlySelectedSlideId,
    );

    if (save) {
      saveNewChanges({
        currentSlideVariablesOverride: newSaveables[0],
        allSlidesOverride: newSaveables[1],
      });
    }
    return newSaveables[0];
  }

  async function getNewImage(event) {
    console.log(updateVariable);
    console.log(selectedObject);

    changeLoading(true);
    await getImage(
      event,
      usedImages,
      updateUsedImages,
      updateVariable,
      currentSlideVariables,
      updateObject,
    );
    changeLoading(false);
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
  
  if (selectedObject[0] === "text") {
    return (
      <div className="actionPanel">
        <div className="variableContainer">
          <div className="simpleOptionContainer_Row">
            <p className="simpleText">font size</p>
            <div className="inLine">
              <button>-</button>
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
                    newFontSize.target.value.replace(/\D/g, ""),
                  );
                }}
                type="text"
                inputMode="numeric"
              />
              <button>+</button>
            </div>
          </div>
          <div className="simpleOptionContainer_Column">
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
          <div className="simpleOptionContainer_Row">
            <div className="simpleOptionContainer_Column">
              <p className="simpleText">text align</p>
              <div className="multipleOptions">
                <button
                  className="simpleInputButton"
                  style={{
                    backgroundColor:
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].textAlign == "left"
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
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].textAlign == "center" && "#b5b5b5",
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
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].textAlign == "right" && "#b5b5b5",
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
            <div className="simpleOptionContainer_Column">
              <p className="simpleText">font extras</p>
              <div className="multipleOptions">
                <button
                  className="simpleInputButton"
                  style={{
                    backgroundColor:
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].bold == "700" && "#b5b5b5",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    let currentVal =
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].bold;

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
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].textDecoration == "underline" && "#b5b5b5",
                    textDecoration: "underline",
                    fontWidth: "500",
                  }}
                  onClick={() => {
                    let currentVal =
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].textDecoration;

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
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].fontStyle == "italic" && "#b5b5b5",
                    fontStyle: "italic",
                    fontWidth: "500",
                  }}
                  onClick={() => {
                    let currentVal =
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].fontStyle;

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
          </div>
          <div className="simpleOptionContainer_Column">
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
                value={selectedObjectsVariables[1]["outlineWidth"] || 0}
                onInput={(newOutlineWidth) => {
                  let newObjData = structuredClone(selectedObjectsVariables);
                  newObjData[1].outlineWidth = clamp(
                    Number(newOutlineWidth.target.value.replace(/\D/g, "")),
                    0,
                    10,
                  );

                  setSelectedObjectsVariables(newObjData);
                  updateObject(
                    selectedObject[0],
                    selectedObject[1],
                    "outlineWidth",
                    newOutlineWidth.target.value,
                  );
                }}
                type="text"
                inputMode="numeric"
                max={"10"}
              />
            </div>
          </div>
          <div className="simpleOptionContainer_Column">
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
          <div className="simpleOptionContainer_Column">
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
      </div>
    );
  }

  if (selectedObject[0] === "images") {
    return (
      <div className="actionPanel">
        <div className="variableContainer">
          <div className="simpleOptionContainer_Column">
            <p className="simpleText">Set image</p>
            <form className="simpleOptionContainer_Row" onSubmit={getNewImage}>
              <input
                className="simpleTextInput"
                placeholder="example `ducks`"
                name="query"
                type="text"
              />
              <button className="submitButton" type="submit">
                <img className="submitImage" src={search} />
              </button>
            </form>
          </div>
          <div className="simpleOptionContainer_Column">
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
                value={selectedObjectsVariables[1]["borderWidth"] || 0}
                onInput={(newOutlineWidth) => {
                  let newObjData = structuredClone(selectedObjectsVariables);
                  newObjData[1].borderWidth = clamp(
                    Number(newOutlineWidth.target.value.replace(/\D/g, "")),
                    0,
                    20,
                  );
                  setSelectedObjectsVariables(newObjData);
                  updateObject(
                    selectedObject[0],
                    selectedObject[1],
                    "borderWidth",
                    newOutlineWidth.target.value,
                  );
                }}
                type="text"
                inputMode="numeric"
                max={"20"}
              />
            </div>
          </div>
          <div className="simpleOptionContainer_Column">
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
          <div className="simpleOptionContainer_Row">
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
          <div className="simpleOptionContainer_column">
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
      </div>
    );
  }

  if (selectedObject[0] == "") {
    return (
      <div className="actionPanel">
        <div className="variableContainer">
          <div className="simpleOptionContainer_Column">
            <p className="simpleText">background image</p>
            <form className="simpleOptionContainer_Row" onSubmit={getNewImage}>
              <input
                className="simpleTextInput"
                placeholder="example `ducks`"
                name="query"
                type="text"
              />
              <button className="submitButton" type="submit">
                <img className="submitImage" src={search} />
              </button>
            </form>
          </div>
          <div className="simpleOptionContainer_Column">
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
          <div className="simpleOptionContainer_Column">
            <div className="simpleOptionContainer_Column">
              <button
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
                + add new text
              </button>
            </div>
            <div className="simpleOptionContainer_Column">
              <button
                onMouseDown={() => {
                  const [newInd, newObj] = createObj(
                    "images",
                    24,
                    currentSlideVariables,
                  );

                  updateObject("images", newInd, undefined, newObj);
                }}
                className="createNewButton"
              >
                + add new image
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
