import { useEffect, useRef, useState } from "react";
import "./componentStyling/presentationDisplayStyling.css";
import { TextObject } from "./miniComponents/editorComponents/textObject";
import { ImageObject } from "./miniComponents/editorComponents/imageObject";

const lockTolerance = 0.05;

export const MainPresentationDisplay = ({
  vars,
  ind,
  updateObject,
  updateSelectedObject,
  deleteObject,
  duplicateObject,
}) => {
  const [selectedObject, setSelectedObject] = useState(["", ""]);
  const [selectedObjectsVariables, setSelectedObjectsVariables] = useState({});

  let changingState = useRef(0);
  let lockedX = useRef(0);
  let lockedY = useRef(0);

  let StartingXY = useRef([0, 0]);
  let startingXYPos = useRef([0, 0]);

  let lastX = useRef(0);
  let lastY = useRef(0);

  let xLocked = useRef(false);
  let yLocked = useRef(false);

  let holdingShift = useRef(false);

  let lockedAspectRatio = useRef(1);

  const [xBars, updateXBars] = useState([]);
  const [yBars, updateYBars] = useState([]);

  function addXBar(pos) {
    updateXBars([pos]);
  }

  function removeXBar() {
    updateXBars([]);
  }

  function addYBar(pos) {
    updateYBars([pos]);
  }

  function removeYBar() {
    updateYBars([]);
  }

  function deleteObj(dataType, objectIndex) {
    deleteObject(dataType, objectIndex);
    unselectObject();
  }

  function unselectObject() {
    updateSelectedObject("");
    setSelectedObject(["", ""]);
  }

  useEffect(() => {
    addEventListener(
      "keydown",
      (event) => {
        if (
          event.shiftKey &&
          Object.keys(selectedObjectsVariables).length > 0
        ) {
          holdingShift.current = true;
          lockedAspectRatio.current =
            selectedObjectsVariables[1].w / selectedObjectsVariables[1].h;
        }
      },
      [],
    );

    addEventListener("keyup", (event) => {
      if (!event.shiftKey) {
        holdingShift.current = false;
      }
    });
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
    StartingXY.current = [event.clientX, event.clientY];
    startingXYPos.current = [
      selectedObjectsVariables[1].x,
      selectedObjectsVariables[1].y,
    ];
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

    xLocked.current = false;
    yLocked.current = false;
    removeXBar();
    removeYBar();
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
    if (
      Math.abs(xDiff) >= Math.abs(yDiff) &&
      holdingShift.current &&
      changingState.current <= 4
    ) {
      let endY;
      let endX;
      if (changingState.current == 1) {
        endY = selectedObjectsVariables[1].y + selectedObjectsVariables[1].h;
        endX = selectedObjectsVariables[1].x + selectedObjectsVariables[1].w;
      }
      if (changingState.current == 2) {
        endY = selectedObjectsVariables[1].y + selectedObjectsVariables[1].h;
      }
      if (changingState.current == 3) {
        endX = selectedObjectsVariables[1].x + selectedObjectsVariables[1].w;
      }

      newVals[1].w = Math.abs(dotTRPos[0] - dotTLPos[0]);
      newVals[1].h = newVals[1].w / lockedAspectRatio.current;

      if (!isNaN(endY)) {
        newVals[1].y = endY - newVals[1].h;
      }
      if (!isNaN(endX)) {
        newVals[1].x = endX - newVals[1].w;
      }
    }

    if (
      Math.abs(xDiff) < Math.abs(yDiff) &&
      holdingShift.current &&
      changingState.current <= 4
    ) {
      let endY;
      let endX;
      if (changingState.current == 1) {
        endY = selectedObjectsVariables[1].y + selectedObjectsVariables[1].h;
        endX = selectedObjectsVariables[1].x + selectedObjectsVariables[1].w;
      }
      if (changingState.current == 2) {
        endY = selectedObjectsVariables[1].y + selectedObjectsVariables[1].h;
      }
      if (changingState.current == 3) {
        endX = selectedObjectsVariables[1].x + selectedObjectsVariables[1].w;
      }

      newVals[1].h = Math.abs(dotBLPos[1] - dotTLPos[1]);
      newVals[1].w = newVals[1].h * lockedAspectRatio.current;

      if (!isNaN(endY)) {
        newVals[1].y = endY - newVals[1].h;
      }
      if (!isNaN(endX)) {
        newVals[1].x = endX - newVals[1].w;
      }
    }
    if (!holdingShift.current) {
      newVals[1].w = Math.abs(dotTRPos[0] - dotTLPos[0]);
      newVals[1].h = Math.abs(dotBLPos[1] - dotTLPos[1]);
    }

    lastX.current = event.clientX;
    lastY.current = event.clientY;

    setSelectedObjectsVariables(newVals);
  }

  function checkXLock(xPos, xWidth, event) {
    if (xLocked.current) return xPos;

    if (Math.abs(13.333 / 2 - xWidth / 2 - xPos) < lockTolerance) {
      xLocked.current = true;
      lockedX.current = event.clientX;
      addXBar(400);
      return 13.333 / 2 - xWidth / 2;
    }
    if (Math.abs(13.333 / 2 - xPos) < lockTolerance) {
      xLocked.current = true;
      lockedX.current = event.clientX;
      addXBar(400);
      return 13.333 / 2;
    }
    if (Math.abs(13.333 / 2 - xWidth - xPos) < lockTolerance) {
      xLocked.current = true;
      lockedX.current = event.clientX;
      addXBar(400);
      return 13.333 / 2 - xWidth;
    }

    let allObjects = { text: { ...vars.text }, images: { ...vars.images } };

    for (let type of Object.keys(allObjects)) {
      for (let variables of Object.entries(allObjects[type])) {
        if (selectedObject[0] == type && selectedObject[1] == variables[0])
          console.log("a");
        else {
          if (
            Math.abs(variables[1].x + variables[1].w / 2 - xPos) < lockTolerance
          ) {
            xLocked.current = true;
            lockedX.current = event.clientX;
            addXBar((800 / 13.333) * (variables[1].x + variables[1].w / 2));
            return variables[1].x + variables[1].w / 2;
          }
          if (
            Math.abs(variables[1].x + variables[1].w / 2 - xPos - xWidth / 2) <
            lockTolerance
          ) {
            xLocked.current = true;
            lockedX.current = event.clientX;
            addXBar((800 / 13.333) * (variables[1].x + variables[1].w / 2));
            return variables[1].x + variables[1].w / 2 - xWidth / 2;
          }
          if (
            Math.abs(variables[1].x + variables[1].w / 2 - xPos - xWidth) <
            lockTolerance
          ) {
            xLocked.current = true;
            lockedX.current = event.clientX;
            addXBar((800 / 13.333) * (variables[1].x + variables[1].w / 2));
            return variables[1].x + variables[1].w / 2 - xWidth;
          }

          if (Math.abs(variables[1].x - xPos) < lockTolerance) {
            xLocked.current = true;
            lockedX.current = event.clientX;
            addXBar((800 / 13.333) * variables[1].x);
            return variables[1].x;
          }
          if (Math.abs(variables[1].x - xPos - xWidth / 2) < lockTolerance) {
            xLocked.current = true;
            lockedX.current = event.clientX;
            addXBar((800 / 13.333) * variables[1].x);
            return variables[1].x - xWidth / 2;
          }
          if (Math.abs(variables[1].x - xPos - xWidth) < lockTolerance) {
            xLocked.current = true;
            lockedX.current = event.clientX;
            addXBar((800 / 13.333) * variables[1].x);
            return variables[1].x - xWidth;
          }

          if (
            Math.abs(variables[1].x + variables[1].w - xPos) < lockTolerance
          ) {
            xLocked.current = true;
            lockedX.current = event.clientX;
            addXBar((800 / 13.333) * (variables[1].x + variables[1].w));
            return variables[1].x + variables[1].w;
          }
          if (
            Math.abs(variables[1].x + variables[1].w - xPos - xWidth / 2) <
            lockTolerance
          ) {
            xLocked.current = true;
            lockedX.current = event.clientX;
            addXBar((800 / 13.333) * (variables[1].x + variables[1].w));
            return variables[1].x + variables[1].w - xWidth / 2;
          }
          if (
            Math.abs(variables[1].x + variables[1].w - xPos - xWidth) <
            lockTolerance
          ) {
            xLocked.current = true;
            lockedX.current = event.clientX;
            addXBar((800 / 13.333) * (variables[1].x + variables[1].w));
            return variables[1].x + variables[1].w - xWidth;
          }
        }
      }
    }

    return xPos;
  }

  function checkYLock(yPos, yHeight, event) {
    if (yLocked.current) return yPos;

    if (Math.abs(7.5 / 2 - yHeight / 2 - yPos) < lockTolerance) {
      yLocked.current = true;
      lockedY.current = event.clientY;
      addYBar(225);
      return 7.5 / 2 - yHeight / 2;
    }
    if (Math.abs(7.5 / 2 - yPos) < lockTolerance) {
      yLocked.current = true;
      lockedY.current = event.clientY;
      addYBar(225);
      return 7.5 / 2;
    }
    if (Math.abs(7.5 / 2 - yHeight - yPos) < lockTolerance) {
      yLocked.current = true;
      lockedY.current = event.clientY;
      addYBar(225);
      return 7.5 / 2 - yHeight;
    }

    let allObjects = { text: { ...vars.text }, images: { ...vars.images } };

    for (let type of Object.keys(allObjects)) {
      console.log(type)
      for (let variables of Object.entries(allObjects[type])) {
        if (selectedObject[0] == type && selectedObject[1] == variables[0])
          console.log("a");
        else {
          if (
            Math.abs(variables[1].y + variables[1].h / 2 - yPos) < lockTolerance
          ) {
            yLocked.current = true;
            lockedY.current = event.clientY;
            addYBar((450 / 7.5) * (variables[1].y + variables[1].h / 2));
            return variables[1].y + variables[1].h / 2;
          }
          if (
            Math.abs(variables[1].y + variables[1].h / 2 - yPos - yHeight / 2) <
            lockTolerance
          ) {
            yLocked.current = true;
            lockedY.current = event.clientY;
            addYBar((450 / 7.5) * (variables[1].y + variables[1].h / 2));
            return variables[1].y + variables[1].h / 2 - yHeight / 2;
          }
          if (
            Math.abs(variables[1].y + variables[1].h / 2 - yPos - yHeight) <
            lockTolerance
          ) {
            yLocked.current = true;
            lockedY.current = event.clientY;
            addYBar((450 / 7.5) * (variables[1].y + variables[1].h / 2));
            return variables[1].y + variables[1].h / 2 - yHeight;
          }

          if (Math.abs(variables[1].y - yPos) < lockTolerance) {
            yLocked.current = true;
            lockedY.current = event.clientY;
            addYBar((450 / 7.5) * variables[1].y);
            return variables[1].y;
          }
          if (Math.abs(variables[1].y - yPos - yHeight / 2) < lockTolerance) {
            yLocked.current = true;
            lockedY.current = event.clientY;
            addYBar((450 / 7.5) * variables[1].y);
            return variables[1].y - yHeight / 2;
          }
          if (Math.abs(variables[1].y - yPos - yHeight) < lockTolerance) {
            yLocked.current = true;
            lockedY.current = event.clientY;
            addYBar((450 / 7.5) * variables[1].y);
            return variables[1].y - yHeight;
          }

          if (
            Math.abs(variables[1].y + variables[1].h - yPos) < lockTolerance
          ) {
            yLocked.current = true;
            lockedY.current = event.clientY;
            addYBar((450 / 7.5) * (variables[1].y + variables[1].h));
            return variables[1].y + variables[1].h;
          }
          if (
            Math.abs(variables[1].y + variables[1].h - yPos - yHeight / 2) <
            lockTolerance
          ) {
            yLocked.current = true;
            lockedY.current = event.clientY;
            addYBar((450 / 7.5) * (variables[1].y + variables[1].h));
            return variables[1].y + variables[1].h - yHeight / 2;
          }
          if (
            Math.abs(variables[1].y + variables[1].h - yPos - yHeight) <
            lockTolerance
          ) {
            yLocked.current = true;
            lockedY.current = event.clientY;
            addYBar((450 / 7.5) * (variables[1].y + variables[1].h));
            return variables[1].y + variables[1].h - yHeight;
          }
        }
      }
    }

    return yPos;
  }

  function handleObjectMove(event) {
    const startDiffX = StartingXY.current[0] - event.clientX;
    const startDiffY = StartingXY.current[1] - event.clientY;

    if (Object.entries(selectedObjectsVariables).length < 1) {
      return;
    }
    let newVals = structuredClone(selectedObjectsVariables);

    let startX = newVals[1].x;
    let startY = newVals[1].y;

    if (holdingShift.current) {
      if (Math.abs(startDiffX) > Math.abs(startDiffY)) {
        newVals[1].y = startingXYPos.current[1];

        newVals[1].x = startingXYPos.current[0] - 13.333 * (startDiffX / 800);
      } else {
        newVals[1].x = startingXYPos.current[0];

        newVals[1].y = startingXYPos.current[1] - 7.5 * (startDiffY / 450);
      }
    } else {
      newVals[1].x = startingXYPos.current[0] - 13.333 * (startDiffX / 800);

      newVals[1].y = startingXYPos.current[1] - 7.5 * (startDiffY / 450);
    }

    if (xLocked.current == true) {
      const lockedXDiff = lockedX.current - event.clientX;

      if (Math.abs(lockedXDiff) > 22) {
        newVals[1].x = startingXYPos.current[0] - 13.333 * (startDiffX / 800);
        xLocked.current = false;
        removeXBar();
      } else {
        newVals[1].x = startX;
      }
    }

    if (yLocked.current == true) {
      const lockedYDiff = lockedY.current - event.clientY;

      if (Math.abs(lockedYDiff) > 22) {
        newVals[1].y = startingXYPos.current[1] - 7.5 * (startDiffY / 450);
        yLocked.current = false;
        removeYBar();
      } else {
        newVals[1].y = startY;
      }
    }

    newVals[1].x = checkXLock(newVals[1].x, newVals[1].w, event);
    newVals[1].y = checkYLock(newVals[1].y, newVals[1].h, event);

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
          unselectObject();
        }}
      />

      {Object.entries(vars.text).map((variables) => {
        const selected =
          "text" == selectedObject[0] && variables[0] == selectedObject[1];

        if (selected) {
          variables[1].x = selectedObjectsVariables[1].x;
          variables[1].y = selectedObjectsVariables[1].y;
          variables[1].w = selectedObjectsVariables[1].w;
          variables[1].h = selectedObjectsVariables[1].h;
        }
        return (
          <TextObject
            key={variables[0]}
            startResizing={startResizing}
            stopResizing={stopResizing}
            variables={variables}
            ind={variables[0]}
            updateObject={updateObject}
            updateSelectedObject={updateSelectedObject}
            setSelectedObject={setSelectedObject}
            setSelectedObjectsVariables={setSelectedObjectsVariables}
            selected={selected}
            deleteObject={deleteObj}
            duplicateObject={duplicateObject}
          />
        );
      })}

      {Object.entries(vars.images).map((variables) => {
        const selected =
          "images" == selectedObject[0] && variables[0] == selectedObject[1];

        if (selected) {
          variables[1].x = selectedObjectsVariables[1].x;
          variables[1].y = selectedObjectsVariables[1].y;
          variables[1].w = selectedObjectsVariables[1].w;
          variables[1].h = selectedObjectsVariables[1].h;
        }
        return (
          <ImageObject
            key={variables[0]}
            startResizing={startResizing}
            stopResizing={stopResizing}
            variables={variables}
            ind={variables[0]}
            updateObject={updateObject}
            updateSelectedObject={updateSelectedObject}
            setSelectedObject={setSelectedObject}
            setSelectedObjectsVariables={setSelectedObjectsVariables}
            selected={selected}
          />
        );
      })}
      {yBars.map((pos, index) => {
        return (
          <div
            key={index}
            style={{
              backgroundColor: "red",
              height: "4px",
              width: "100%",
              position: "absolute",
              top: `${pos - 2}px`,
              left: "0px",
            }}
          />
        );
      })}
      {xBars.map((pos, index) => {
        return (
          <div
            key={index}
            style={{
              backgroundColor: "red",
              height: "100%",
              width: "4px",
              position: "absolute",
              top: "0",
              left: `${pos - 2}px`,
            }}
          />
        );
      })}
    </div>
  );
};
