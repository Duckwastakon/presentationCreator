import { useRef, useState } from "react";
import "./componentStyling/presentationDisplayStyling.css";
import { TextObject } from "./miniComponents/editorComponents/textObject";
import { ImageObject } from "./miniComponents/editorComponents/imageObject";

export const MainPresentationDisplay = ({
  vars,
  ind,
  updateObject,
  updateSelectedObject,
}) => {
  const [selectedObject, setSelectedObject] = useState(["", ""]);
  const [selectedObjectsVariables, setSelectedObjectsVariables] = useState({});

  let changingState = useRef(0);
  let lockedX = useRef(0);
  let lockedY = useRef(0);

  let lastX = useRef(0);
  let lastY = useRef(0);

  let xLocked = useRef(false);
  let yLocked = useRef(false);

  let holdingShift = false;

  let lockedAspectRatio = 1;

  addEventListener("keydown", (event) => {
    if (event.shiftKey && Object.entries(selectedObjectsVariables).length > 0) {
      holdingShift = true;
      lockedAspectRatio =
        selectedObjectsVariables[1].w /
        selectedObjectsVariables[1].h;
    }
  });

  addEventListener("keyup", (event) => {
    if (!event.shiftKey) {
      holdingShift = false;
    }
  });

  function handleMouseMovement(event) {
    if (changingState.current === 0) return;

    if (changingState.current < 9) {
      handleMouseResize(event);
    } else {
      handleObjectMove(event);
    }
  }

  function startResizing(event, newState) {
    lockedX.current = event.clientX;
    lockedY.current = event.clientY;
    changingState.current = newState;

    lastX.current = event.clientX;
    lastY.current = event.clientY;
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
    let xDiff = lastX.current - event.clientX;
    let yDiff = lastY.current - event.clientY;

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

    if (holdingShift) {
      console.log("shift")
      console.log(lockedAspectRatio)
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        yDiff = xDiff / lockedAspectRatio
      } else {
        xDiff = yDiff * lockedAspectRatio
      }
      console.log(xDiff/yDiff)
      console.log("complete")
    }
    console.log(xDiff, yDiff)

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

    lastX.current = event.clientX;
    lastY.current = event.clientY;

    setSelectedObjectsVariables(newVals);
  }

  function handleObjectMove(event) {
    const xDiff = lastX.current - event.clientX;
    const yDiff = lastY.current - event.clientY;

    if (Object.entries(selectedObjectsVariables).length < 1) {
      return;
    }
    let newVals = structuredClone(selectedObjectsVariables);

    if (xLocked.current == true) {
      const lockedXDiff = lockedX.current - event.clientX;

      if (Math.abs(lockedXDiff) > 22) {
        newVals[1].x -= 13.333 * (lockedXDiff / 800);
        xLocked.current = false;
      }
    } else {
      newVals[1].x -= 13.333 * (xDiff / 800);

      if (Math.abs(13.333 / 2 - newVals[1].w / 2 - newVals[1].x) < 0.1) {
        newVals[1].x = 13.333 / 2 - newVals[1].w / 2;
        xLocked.current = true;
        lockedX.current = event.clientX;
      }
    }

    if (yLocked.current == true) {
      const lockedYDiff = lockedY.current - event.clientY;

      if (Math.abs(lockedYDiff) > 22) {
        newVals[1].y -= 7.5 * (lockedYDiff / 450);
        yLocked.current = false;
      }
    } else {
      newVals[1].y -= 7.5 * (yDiff / 450);

      if (Math.abs(7.5 / 2 - newVals[1].h / 2 - newVals[1].y) < 0.1) {
        newVals[1].y = 7.5 / 2 - newVals[1].h / 2;
        yLocked.current = true;
        lockedY.current = event.clientY;
      }
    }

    lastX.current = event.clientX;
    lastY.current = event.clientY;

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

        if (selected) {
          return (
            <TextObject
              startResizing={startResizing}
              stopResizing={stopResizing}
              variables={selectedObjectsVariables}
              ind={indv}
              updateObject={updateObject}
              updateSelectedObject={updateSelectedObject}
              setSelectedObject={setSelectedObject}
              setSelectedObjectsVariables={setSelectedObjectsVariables}
              selected={selected}
            />
          );
        } else {
          return (
            <TextObject
              startResizing={startResizing}
              stopResizing={stopResizing}
              variables={variables}
              ind={indv}
              updateObject={updateObject}
              updateSelectedObject={updateSelectedObject}
              setSelectedObject={setSelectedObject}
              setSelectedObjectsVariables={setSelectedObjectsVariables}
              selected={selected}
            />
          );
        }
      })}

      {Object.entries(vars.images).map((variables, indv) => {
        console.log("Image ", variables)
        const selected =
          "images" == selectedObject[0] && variables[0] == selectedObject[1];

        if (selected) {
          variables = selectedObjectsVariables;
        }
        return (
          <ImageObject
            startResizing={startResizing}
            stopResizing={stopResizing}
            variables={variables}
            ind={indv}
            updateObject={updateObject}
            updateSelectedObject={updateSelectedObject}
            setSelectedObject={setSelectedObject}
            setSelectedObjectsVariables={setSelectedObjectsVariables}
            selected={selected}
          />
        );
      })}
    </div>
  );
};
