import { useRef, useState } from "react";
import { ResizeDots } from "./resizeDots";
import "./componentStyling/presentationDisplayStyling.css"

export const MainPresentationDisplay = ({
  vars,
  ind,
  updateObject,
  updateSelectedObject,
}) => {
  const [selectedObject, setSelectedObject] = useState(["", ""]);
  const [selectedObjectsVariables, setSelectedObjectsVariables] = useState({});

  let changingState = useRef(0);
  let startX = useRef(0);
  let startY = useRef(0);

  function handleMouseMovement(event) {
    if (changingState.current === 0) return;

    if (changingState.current < 9) {
      handleMouseResize(event);
    } else {
      handleObjectMove(event);
    }
  }

  function startResizing(event, newState) {
    startX.current = event.clientX;
    startY.current = event.clientY;
    changingState.current = newState;
  }

  function stopResizing() {
    if (changingState.current == 0) return;
    changingState.current = 0;
    if (selectedObject[0] === "") return;
    let newVars = { ...vars[selectedObject[0]][selectedObject[1]] };
    ((newVars.x = selectedObjectsVariables[1].x),
      (newVars.y = selectedObjectsVariables[1].y),
      (newVars.w = selectedObjectsVariables[1].w),
      (newVars.h = selectedObjectsVariables[1].h),
      updateObject(selectedObject[0], selectedObject[1], undefined, newVars));
  }

  function handleMouseResize(event) {
    const xDiff = startX.current - event.clientX;
    const yDiff = startY.current - event.clientY;

    let dotTLPos = [
      selectedObjectsVariables[1].x,
      selectedObjectsVariables[1].y,
    ];
    let dotTRPos = [
      selectedObjectsVariables[1].x + selectedObjectsVariables[1].w,
      selectedObjectsVariables[1].y,
    ];
    let dotBLPos = [
      selectedObjectsVariables[1].x,
      selectedObjectsVariables[1].y + selectedObjectsVariables[1].h,
    ];
    let dotBRPos = [
      selectedObjectsVariables[1].x + selectedObjectsVariables[1].w,
      selectedObjectsVariables[1].y + selectedObjectsVariables[1].h,
    ];

    let valDifference = [13.333 * (xDiff / 800), 7.5 * (yDiff / 450)];

    let newVals = structuredClone(selectedObjectsVariables);

    switch (changingState.current) {
      case 1:
        dotTLPos[0] -= valDifference[0];
        dotTLPos[1] -= valDifference[1];

        dotBLPos[0] = dotTLPos[0];
        dotTRPos[1] = dotTLPos[1];
        break;
      case 2:
        dotTRPos[0] -= valDifference[0];
        dotTRPos[1] -= valDifference[1];

        dotBRPos[0] = dotTRPos[0];
        dotTLPos[1] = dotTRPos[1];
        break;
      case 3:
        dotBLPos[0] -= valDifference[0];
        dotBLPos[1] -= valDifference[1];

        dotTLPos[0] = dotBLPos[0];
        dotBRPos[1] = dotBLPos[1];
        break;
      case 4:
        dotBRPos[0] -= valDifference[0];
        dotBRPos[1] -= valDifference[1];

        dotTRPos[0] = dotBRPos[0];
        dotBLPos[1] = dotBRPos[1];
        break;

      case 5:
        dotTLPos[1] -= valDifference[1];
        dotTRPos[1] = dotTLPos[1];

        break;

      case 6:
        dotTRPos[0] -= valDifference[0];
        dotBRPos[0] = dotTRPos[0];

        break;

      case 7:
        dotBRPos[1] -= valDifference[1];
        dotBLPos[1] = dotBRPos[1];

        break;

      case 8:
        dotBLPos[0] -= valDifference[0];
        dotTLPos[0] = dotBLPos[0];

        break;

      default:
        return;
    }
    newVals[1].x = dotTLPos[0];
    newVals[1].y = dotTLPos[1];
    newVals[1].w = Math.abs(dotTRPos[0] - dotTLPos[0]);
    newVals[1].h = Math.abs(dotBLPos[1] - dotTLPos[1]);

    startX.current = event.clientX;
    startY.current = event.clientY;

    setSelectedObjectsVariables(newVals);
  }

  function handleObjectMove(event) {
    const xDiff = startX.current - event.clientX;
    const yDiff = startY.current - event.clientY;
    if (Object.entries(selectedObjectsVariables).length < 1) {
      return;
    }
    let newVals = structuredClone(selectedObjectsVariables);

    newVals[1].x -= 13.333 * (xDiff / 800);
    newVals[1].y -= 7.5 * (yDiff / 450);

    startX.current = event.clientX;
    startY.current = event.clientY;

    setSelectedObjectsVariables(newVals);
  }

  return (
    <div
      className="presentationBackground"
      style={{
        backgroundImage: `url(${vars.backgroundImageUrl})`,
        backgroundColor: `${vars.backgroundColor}`,
      }}
      key={ind}
      onMouseMove={(event) => handleMouseMovement(event)}
      onMouseLeave={() => {
        stopResizing();
      }}
      onMouseUp={() => {
        stopResizing();
      }}
    >
      <button
        className="backgroundButton"
        onMouseDown={() => {
          updateSelectedObject("");
          setSelectedObject(["", ""]);
        }}
      />
      {Object.entries(vars.text).map((variables, indv) => {
        const selected =
          "text" == selectedObject[0] && variables[0] == selectedObject[1];

        let useForSize = variables[1];
        if (selected) {
          useForSize = selectedObjectsVariables[1];
        }

        const outlineWidth = variables[1].outlineWidth || 0;
        const outlineColor = variables[1].outlineColor || "black";

        return (
          <div
            style={{
              position: "absolute",
              top: (100 * (useForSize.y / 7.5)).toString() + "%",
              height: (100 * (useForSize.h / 7.5)).toString() + "%",
              left: (100 * (useForSize.x / 13.333)).toString() + "%",
              width: (100 * (useForSize.w / 13.333)).toString() + "%",
              alignItems: "center",
              justifyContent: "center",
            }}
            key={indv}
          >
            <input
              type="text"
              value={variables[1].text}
              onChange={(newVal) =>
                updateObject("text", variables[0], "text", newVal.target.value)
              }
              onSelect={() => {
                console.log(["text", variables[0]]);
                updateSelectedObject(["text", variables[0], undefined]);
                setSelectedObjectsVariables(structuredClone(variables));
                setSelectedObject(["text", variables[0]]);
              }}
              onMouseDown={(event) => {
                startResizing(event, 9);
              }}
              className="presentationTextEditBox"
              style={{
                width: "100%",
                height: "100%",
                fontSize: (variables[1].fontSize * 2.5).toString() + "px",
                color: variables[1].textColor || "black",
                fontWeight: variables[1].bold || "400",
                textShadow: `${outlineWidth}px ${outlineWidth}px 0px ${outlineColor},
                ${-outlineWidth}px ${-outlineWidth}px 0px ${outlineColor},
                ${outlineWidth}px ${-outlineWidth}px 0px ${outlineColor},
                ${-outlineWidth}px ${outlineWidth}px 0px ${outlineColor}`,
                textDecoration: variables[1].textDecoration || "none",
                fontStyle: variables[1].fontStyle || "normal",
                textAlign: variables[1].textAlign || "left",
              }}
            />
            {selected && (
              <ResizeDots
                startResizing={startResizing}
                stopResizing={stopResizing}
              />
            )}
          </div>
        );
      })}

      {Object.entries(vars.images).map((variables, indv) => {
        const selected =
          "images" == selectedObject[0] && variables[0] == selectedObject[1];

        let useForSize = variables[1];

        if (selected) {
          useForSize = selectedObjectsVariables[1];
        }
        return (
          <div
            key={indv}
            style={{
              position: "absolute",
              top: (100 * (useForSize.y / 7.5)).toString() + "%",
              height: (100 * (useForSize.h / 7.5)).toString() + "%",
              left: (100 * (useForSize.x / 13.333)).toString() + "%",
              width: (100 * (useForSize.w / 13.333)).toString() + "%",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }}
          >
            <button
            className="imageButton"
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
              onMouseDown={(event) => {
                if (selected) {
                  startResizing(event, 9);
                } else {
                  updateSelectedObject(["images", variables[0], "src"]);
                  setSelectedObjectsVariables(structuredClone(variables));
                  setSelectedObject(["images", variables[0]]);
                }
              }}
            >
              <img
              className="slideImage"
                style={{
                  border: `solid ${variables[1].borderColor || "#000000"} ${variables[1].borderWidth || 0}px`,
                  borderRadius:
                    (variables[1].cornerRadius || 0).toString() + "px",
                }}
                src={variables[1].src}
              />
            </button>
            {selected && (
              <ResizeDots
                startResizing={startResizing}
                stopResizing={stopResizing}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
