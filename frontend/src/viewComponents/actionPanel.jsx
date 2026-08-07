import "./componentStyling/actionPanelStyling.css";

export const ActionPanel = ({ selectedObject, getNewImage, updateObject }) => {
  console.log(selectedObject);

  if (selectedObject[0] === "text") {
    const textAlign = selectedObject[2]["textAlign"] || "left"
    return (
      <div className="actionPanel">
        <div className="simpleOptionContainer">
          <p className="simpleText">font size</p>
          <input
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
          <p className="simpleText">font color</p>
          <input
            className="simpleColorInput"
            type="color"
            name="fontColorInput"
            value={selectedObject[2]["textColor"] || "#000000"}
            onChange={(newVal) => {
              console.log(newVal.target.value);
              updateObject(
                selectedObject[0],
                selectedObject[1],
                "textColor",
                newVal.target.value,
              );
            }}
          />
        </div>
        <div className="simpleOptionsContainer">
          <p className="simpleText">text align</p>
          <div className="multipleOptions">
            <input
              value="left"
              name="alignLeft"
              type="radio"
              onChange={(newVal) => {
                updateObject(
                  selectedObject[0],
                  selectedObject[1],
                  "textAlign",
                  newVal.target.value,
                );
              }}
              checked={textAlign == "left"}
            />
            <input
              value="center"
              name="alignMiddle"
              type="radio"
              onChange={(newVal) => {
                updateObject(
                  selectedObject[0],
                  selectedObject[1],
                  "textAlign",
                  newVal.target.value,
                );
              }}
              checked={textAlign == "center"}
            />
            <input
              value="right"
              name="alignRight"
              type="radio"
              onChange={(newVal) => {
                updateObject(
                  selectedObject[0],
                  selectedObject[1],
                  "textAlign",
                  newVal.target.value,
                );
              }}
              checked={textAlign == "right"}
            />
          </div>
        </div>
        <div className="simpleOptionContainer">
          <p className="simpleText">font extras</p>
          <div className="multipleOptions">
            <input
              className="simpleInputCheckbox"
              value={selectedObject[2]["bold"] === "700" || false}
              type="checkbox"
              onChange={(newVal) => {
                if (newVal.target.value === "false") {
                  updateObject(
                    selectedObject[0],
                    selectedObject[1],
                    "bold",
                    "700",
                  );
                } else {
                  updateObject(
                    selectedObject[0],
                    selectedObject[1],
                    "bold",
                    "400",
                  );
                }
              }}
            />
            <input
              className="simpleInputCheckbox"
              value={
                selectedObject[2]["textDecoration"] === "underline" || false
              }
              type="checkbox"
              onChange={(newVal) => {
                if (newVal.target.value === "false") {
                  updateObject(
                    selectedObject[0],
                    selectedObject[1],
                    "textDecoration",
                    "underline",
                  );
                } else {
                  updateObject(
                    selectedObject[0],
                    selectedObject[1],
                    "textDecoration",
                    "none",
                  );
                }
              }}
            />
            <input
              className="simpleInputCheckbox"
              value={selectedObject[2]["fontStyle"] === "italic" || false}
              type="checkbox"
              onChange={(newVal) => {
                if (newVal.target.value === "false") {
                  updateObject(
                    selectedObject[0],
                    selectedObject[1],
                    "fontStyle",
                    "italic",
                  );
                } else {
                  updateObject(
                    selectedObject[0],
                    selectedObject[1],
                    "fontStyle",
                    "normal",
                  );
                }
              }}
            />
          </div>
        </div>
        <div className="simpleOptionContainer">
          <p className="simpleText"> font outline width</p>
          <input
            value={(selectedObject[2]["outlineWidth"] * 100) / 2 || 0}
            onInput={(newOutlineWidth) => {
              updateObject(
                selectedObject[0],
                selectedObject[1],
                "outlineWidth",
                (newOutlineWidth.target.value / 100) * 2,
              );
            }}
            min={0}
            max={100}
            step={1}
            type="range"
          />
        </div>
        <div className="simpleOptionContainer">
          <p className="simpleText"> font outline color</p>
          <input
            className="simpleColorInput"
            type="color"
            name="outlineColorInput"
            colorspace="display-p3"
            value={selectedObject[2]["outlineColor"] || "#000000"}
            onChange={(newVal) => {
              updateObject(
                selectedObject[0],
                selectedObject[1],
                "outlineColor",
                newVal.target.value,
              );
            }}
          />
        </div>
      </div>
    );
  }

  if (selectedObject[0] === "images") {
    return (
      <div className="actionPanel">
        <p className="infoText">what image would you like?</p>
        <form className="formStyling" onSubmit={getNewImage}>
          <input className="imageInputField" name="query" type="text" />
          <button className="inputSubmitButton" type="submit">
            submit
          </button>
        </form>
        <div>ColorSelector</div>
      </div>
    );
  }

  if (selectedObject[0] == "") {
    return (
      <div className="actionPanel">
        <p className="infoText">what would you like in the background?</p>
        <form className="formStyling" onSubmit={getNewImage}>
          <input className="imageInputField" name="query" type="text" />
          <button className="inputSubmitButton" type="submit">
            submit
          </button>
        </form>
      </div>
    );
  }
};
