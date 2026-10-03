import "./style.css";
import upArrow from "./images/changeUp.png";
import downArrow from "./images/changeDown.png";
import search from "./images/search.png";
import alignRight from "./images/alignRight.png";
import alignLeft from "./images/alignLeft.png";
import alignCenter from "./images/alignCenter.png";
import { useVariables } from "../../presentationVariables";
import { createObj, delObj, dupObj, updObj } from "../../objectFunctions";
import { getImage } from "../../fetchFunctions";
import { clamp } from "../../extraFunctions";
import { saveSlide } from "../../slideFunctions";

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
    imageArtists,
    updateArtists,
    setUpdateVariable,
    setSelectedObject,
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

  function save(newSlide) {
    let newAllSlides = saveSlide(
      newSlide,
      updateAllSlides,
      allSlides,
      currentlySelectedSlideId,
    );
    saveNewChanges({
      allSlidesOverride: newAllSlides,
      currentSlideVariablesOverride: newSlide,
    });
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
      imageArtists,
      updateArtists,
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
          <div className="simpleOptionContainer_Column">
            <p className="simpleText">font size</p>
            <div className="inLine">
              <button
                onPointerDown={() => {
                  let newObjData = structuredClone(selectedObjectsVariables);
                  newObjData[1].fontSize = selectedObject[2]["fontSize"] - 1;
                  setSelectedObjectsVariables(newObjData);

                  updateObject(
                    selectedObject[0],
                    selectedObject[1],
                    "fontSize",
                    selectedObject[2]["fontSize"] - 1,
                  );
                }}
                className="incrementButton"
              >
                -
              </button>
              <input
                style={{ width: "50%" }}
                className="simpleTextInput"
                name="fontSizeText"
                value={selectedObject[2]["fontSize"]}
                onInput={(newFontSize) => {
                  if (
                    newFontSize.target.value ==
                    newFontSize.target.value.replace(/\D/g, "")
                  ) {
                    let newObjData = structuredClone(selectedObjectsVariables);
                    newObjData[1].fontSize = newFontSize.target.value.replace(
                      /\D/g,
                      "",
                    );
                    setSelectedObjectsVariables(newObjData);

                    updateObject(
                      selectedObject[0],
                      selectedObject[1],
                      "fontSize",
                      Number(newFontSize.target.value.replace(/\D/g, "")),
                    );
                  }
                }}
                type="text"
                inputMode="numeric"
              />
              <button
                onPointerDown={() => {
                  let newObjData = structuredClone(selectedObjectsVariables);
                  newObjData[1].fontSize = selectedObject[2]["fontSize"] + 1;
                  setSelectedObjectsVariables(newObjData);

                  updateObject(
                    selectedObject[0],
                    selectedObject[1],
                    "fontSize",
                    selectedObject[2]["fontSize"] + 1,
                  );
                }}
                className="incrementButton"
              >
                +
              </button>
            </div>
          </div>
          <div className="simpleOptionContainer_Column">
            <div className="inLine">
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
          </div>
          <div className="simpleOptionContainer_Row">
            <div className="simpleOptionContainer_Column">
              <p className="simpleText">text align</p>
              <div className="inLine">
                <button
                  className="simpleInputButton"
                  style={{
                    opacity:
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].textAlign == "left"
                        ? 0.5
                        : currentSlideVariables[selectedObject[0]][
                            selectedObject[1]
                          ].textAlign == undefined && 0.5,
                    borderColor:
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].textAlign == "left"
                        ? "var(--accentColor2)"
                        : currentSlideVariables[selectedObject[0]][
                            selectedObject[1]
                          ].textAlign == undefined && "var(--accentColor2)",
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
                  <img className="submitImage" src={alignLeft} />
                </button>
                <button
                  className="simpleInputButton"
                  style={{
                    opacity:
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].textAlign == "center" && 0.5,
                    borderColor:
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].textAlign == "center" && "var(--accentColor2)",
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
                  <img className="submitImage" src={alignCenter} />
                </button>
                <button
                  className="simpleInputButton"
                  style={{
                    opacity:
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].textAlign == "right" && 0.5,
                    borderColor:
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].textAlign == "right" && "var(--accentColor2)",
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
                  <img className="submitImage" src={alignRight} />
                </button>
              </div>
            </div>
            <div className="simpleOptionContainer_Column">
              <p className="simpleText">font extras</p>
              <div className="inLine">
                <button
                  className="simpleInputButton"
                  style={{
                    opacity:
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].bold == "700" && 0.5,
                    borderColor:
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].bold == "700" && "var(--accentColor2)",
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
                    opacity:
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].textDecoration == "underline" && 0.5,
                    borderColor:
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].textDecoration == "underline" && "var(--accentColor2)",
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
                    opacity:
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].fontStyle == "italic" && 0.5,
                    borderColor:
                      currentSlideVariables[selectedObject[0]][
                        selectedObject[1]
                      ].fontStyle == "italic" && "var(--accentColor2)",
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
            <div className="inLine">
              <input
                style={{ width: "7vw" }}
                className="simpleSlider"
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
                style={{ width: "3vw" }}
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
                    clamp(
                      Number(newOutlineWidth.target.value.replace(/\D/g, "")),
                      0,
                      10,
                    ),
                  );
                }}
                type="text"
                inputMode="numeric"
                max={"10"}
              />
            </div>
          </div>
          <div className="simpleOptionContainer_Column">
            <div className="inLine">
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
          </div>
          <div className="simpleOptionContainer_Column">
            <p className="simpleText">layer</p>
            <div className="inLine">
              <button
                style={{
                  backgroundColor:
                    currentSlideVariables[selectedObject[0]][selectedObject[1]]
                      .layer == 0 && "var(--accentColor1)",
                }}
                className="simpleInputButton"
                onClick={() => {
                  let val =
                    currentSlideVariables[selectedObject[0]][selectedObject[1]]
                      .layer ?? 1;
                  updateObject(
                    selectedObject[0],
                    selectedObject[1],
                    "layer",
                    clamp(val - 1, 0, 99),
                  );
                }}
              >
                <img className="submitImage" src={downArrow}></img>
              </button>
              <input
                style={{ width: "50%" }}
                className="simpleTextInput"
                name="layerText"
                value={
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .layer ?? 1
                }
                onInput={(newLayer) => {
                  if (
                    newLayer.target.value ==
                    newLayer.target.value.replace(/\D/g, "")
                  ) {
                    let newObjData = structuredClone(selectedObjectsVariables);
                    newObjData[1].layer = clamp(
                      Number(newLayer.target.value.replace(/\D/g, "")),
                      0,
                      99,
                    );
                    setSelectedObjectsVariables(newObjData);

                    updateObject(
                      selectedObject[0],
                      selectedObject[1],
                      "layer",
                      clamp(
                        Number(newLayer.target.value.replace(/\D/g, "")),
                        0,
                        99,
                      ),
                    );
                  }
                }}
                type="text"
                inputMode="numeric"
              />
              <button
                className="simpleInputButton"
                style={{
                  backgroundColor:
                    currentSlideVariables[selectedObject[0]][selectedObject[1]]
                      .layer >= 99 && "var(--accentColor1)",
                }}
                onClick={() => {
                  let val =
                    currentSlideVariables[selectedObject[0]][selectedObject[1]]
                      .layer ?? 1;
                  updateObject(
                    selectedObject[0],
                    selectedObject[1],
                    "layer",
                    clamp(val + 1, 0, 99),
                  );
                }}
              >
                <img className="submitImage" src={upArrow}></img>
              </button>
            </div>
          </div>
          <div className="simpleOptionContainer_Column">
            <div className="inLine">
              <button
                className="delBut"
                onPointerUp={() => {
                  delObj(
                    selectedObject[0],
                    selectedObject[1],
                    currentSlideVariables,
                    updateCurrentSlideVariables,
                    save,
                  );
                  setUpdateVariable("");
                  setSelectedObject(["", ""]);
                }}
              >
                Delete
              </button>
              <button
                className="dupBut"
                onPointerUp={() =>
                  dupObj(
                    selectedObject[0],
                    selectedObjectsVariables,
                    currentSlideVariables,
                    updateCurrentSlideVariables,
                    save,
                  )
                }
              >
                Duplicate
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
          <div className="sectionDiv">
            <div className="simpleOptionContainer_Column">
              <p className="simpleText">Set image</p>
              <form
                className="simpleOptionContainer_Row"
                onSubmit={getNewImage}
              >
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
              <div className="inLine">
                <button
                  onPointerUp={() => {
                    if (
                      selectedObjectsVariables[1].src !== "" &&
                      selectedObjectsVariables[1].src !== undefined
                    ) {
                      updateObject(
                        selectedObject[0],
                        selectedObject[1],
                        "src",
                        "",
                      );
                    }
                  }}
                  className="delBut"
                >
                  Remove image
                </button>
                <button
                  className="dupBut"
                  onMouseUp={() => {
                    let newVals = structuredClone(selectedObject);
                    const aspectRatio = newVals[2].aspectRatio || 1;

                    if (newVals[2].x > newVals[2].y) {
                      const val = newVals[2].w / aspectRatio;
                      updateObject(
                        selectedObject[0],
                        selectedObject[1],
                        "h",
                        val,
                      );
                    } else {
                      const val = newVals[2].h * aspectRatio;
                      updateObject(
                        selectedObject[0],
                        selectedObject[1],
                        "w",
                        val,
                      );
                    }
                  }}
                >
                  Restore aspect ratio
                </button>
              </div>
            </div>
          </div>
          <div className="simpleOptionContainer_Column">
            <p className="simpleText">border width</p>
            <div className="inLine">
              <input
                className="simpleSlider"
                style={{ width: "7vw" }}
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
                style={{ width: "3vw" }}
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
                    clamp(
                      Number(newOutlineWidth.target.value.replace(/\D/g, "")),
                      0,
                      20,
                    ),
                  );
                }}
                type="text"
                inputMode="numeric"
                max={"20"}
              />
            </div>
          </div>
          <div className="simpleOptionContainer_Column">
            <div className="inLine">
              <p className="simpleText">border color</p>
              <input
                className="simpleColorInput"
                type="color"
                value={selectedObjectsVariables[1]["borderColor"] || "#000000"}
                onChange={(newVal) => {
                  let newObjData = structuredClone(selectedObjectsVariables);
                  newObjData[1].borderColor = newVal.target.value;
                  setSelectedObjectsVariables(newObjData);
                }}
              />
            </div>
          </div>
          <div className="simpleOptionContainer_column">
            <p className="simpleText">layer</p>
            <div className="inLine">
              <button
                className="simpleInputButton"
                style={{
                  backgroundColor:
                    currentSlideVariables[selectedObject[0]][selectedObject[1]]
                      .layer == 0 && "var(--accentColor1)",
                }}
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
                <img className="submitImage" src={downArrow}></img>
              </button>
              <input
                style={{ width: "50%" }}
                className="simpleTextInput"
                name="layerText"
                value={
                  currentSlideVariables[selectedObject[0]][selectedObject[1]]
                    .layer ?? 1
                }
                onInput={(newLayer) => {
                  if (
                    newLayer.target.value ==
                    newLayer.target.value.replace(/\D/g, "")
                  ) {
                    let newObjData = structuredClone(selectedObjectsVariables);
                    newObjData[1].layer = clamp(
                      Number(newLayer.target.value.replace(/\D/g, "")),
                      0,
                      99,
                    );
                    setSelectedObjectsVariables(newObjData);

                    updateObject(
                      selectedObject[0],
                      selectedObject[1],
                      "layer",
                      clamp(
                        Number(newLayer.target.value.replace(/\D/g, "")),
                        0,
                        99,
                      ),
                    );
                  }
                }}
                type="text"
                inputMode="numeric"
              />
              <button
                className="simpleInputButton"
                style={{
                  backgroundColor:
                    currentSlideVariables[selectedObject[0]][selectedObject[1]]
                      .layer >= 99 && "var(--accentColor1)",
                }}
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
                <img className="submitImage" src={upArrow}></img>
              </button>
            </div>
          </div>
          <div className="simpleOptionContainer_Column">
            <div className="inLine">
              <button
                className="delBut"
                onPointerUp={() => {
                  delObj(
                    selectedObject[0],
                    selectedObject[1],
                    currentSlideVariables,
                    updateCurrentSlideVariables,
                    save,
                  );
                  setUpdateVariable("");
                  setSelectedObject(["", ""]);
                }}
              >
                Delete
              </button>
              <button
                className="dupBut"
                onPointerUp={() =>
                  dupObj(
                    selectedObject[0],
                    selectedObjectsVariables,
                    currentSlideVariables,
                    updateCurrentSlideVariables,
                    save,
                  )
                }
              >
                Duplicate
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
          <div className="sectionDiv">
            <div className="simpleOptionContainer_Column">
              <p className="simpleText">background image</p>
              <form
                className="simpleOptionContainer_Row"
                onSubmit={getNewImage}
              >
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
              <button
                onPointerUp={() => {
                  if (
                    currentSlideVariables.backgroundImageUrl !== "" &&
                    currentSlideVariables.backgroundImageUrl !== undefined
                  ) {
                    updateObject(
                      undefined,
                      undefined,
                      "backgroundImageUrl",
                      undefined,
                    );
                  }
                }}
                className="deleteGeneratedImageButton"
              >
                remove background image
              </button>
            </div>
            <div className="simpleOptionContainer_Column">
              <div className="inLine">
                <p className="simpleText">background color</p>
                <input
                  className="simpleColorInput"
                  type="color"
                  value={
                    selectedObjectsVariables["backgroundColor"] ||
                    currentSlideVariables["backgroundColor"] ||
                    "#ffffff"
                  }
                  onChange={(newVal) => {
                    let newObjData = structuredClone(selectedObjectsVariables);
                    newObjData.backgroundColor = newVal.target.value;
                    setSelectedObjectsVariables(newObjData);
                    //updateObject(
                    // undefined,
                    // undefined,
                    // "backgroundColor",
                    // newVal.target.value,
                    //);
                  }}
                />
              </div>
            </div>
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
