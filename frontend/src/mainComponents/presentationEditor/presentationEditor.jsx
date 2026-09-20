import { useEffect, useRef, useState } from "react";
import "./style.css";
import { useVariables } from "../../presentationVariables";
import { updObj } from "../../objectFunctions";
import { ImageObject } from "./components/imageObject";
import { TextObject } from "./components/textObject";

const lockTolerance = 0.01;

export const MainPresentationDisplay = () => {
  const {
    currentSlideVariables,
    updateCurrentSlideVariables,
    selectedObject,
    setSelectedObject,
    setUpdateVariable,
    selectedObjectsVariables,
    setSelectedObjectsVariables,
    saveCopiedObject,
    updateAllSlides,
    allSlides,
    currentlySelectedSlideId,
    saveNewChanges,
    updateOpen,
    saveChangedVariables
  } = useVariables();

  const slideSizeRef = useRef(null);
  const [slideSizeMultiplier, updateSizeMulti] = useState(1);
  const [slideSizes, updateSlideSizes] = useState(null);

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

  function unselectObject() {
    saveChangedVariables()
    setUpdateVariable("");
    setSelectedObject(["", ""]);
  }

  useEffect(() => {
    updateSizeMulti(850 / slideSizeRef.current.getBoundingClientRect().width);
    updateSlideSizes(slideSizeRef.current.getBoundingClientRect());
    const keyDownCheck = (event) => {
      if (event.shiftKey && Object.keys(selectedObjectsVariables).length > 0) {
        holdingShift.current = true;
        lockedAspectRatio.current =
          selectedObjectsVariables[1].w / selectedObjectsVariables[1].h;
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "c") {
        saveCopiedObject({
          [selectedObject[0]]: { [1]: selectedObjectsVariables[1] },
        });
      }
    };

    const keyUpCheck = (event) => {
      if (!event.shiftKey) {
        holdingShift.current = false;
      }
    };

    window.addEventListener("keydown", keyDownCheck);
    window.addEventListener("keyup", keyUpCheck);

    return () => {
      window.removeEventListener("keydown", keyDownCheck);
      window.removeEventListener("keyup", keyUpCheck);
    };
  }, [selectedObject, selectedObjectsVariables]);

  function handleMouseMovement(event) {
    if (changingState.current === 0) return;

    if (changingState.current < 9) {
      console.log(selectedObjectsVariables);
      console.log(currentSlideVariables[selectedObject[0]][selectedObject[1]]);
      handleMouseResize(event);
    } else {
      handleObjectMove(event);
    }
  }

  function startResizing(event, newState) {
    StartingXY.current = [event.clientX, event.clientY];
    startingXYPos.current = [
      structuredClone(selectedObjectsVariables)[1].x,
      structuredClone(selectedObjectsVariables)[1].y,
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

    let newVars = structuredClone(
      currentSlideVariables[selectedObject[0]][selectedObject[1]],
    );
    console.log(newVars);
    newVars.x = selectedObjectsVariables[1].x;
    newVars.y = selectedObjectsVariables[1].y;
    newVars.w = selectedObjectsVariables[1].w;
    newVars.h = selectedObjectsVariables[1].h;

    let updateValues = updObj(
      selectedObject[0],
      selectedObject[1],
      undefined,
      newVars,
      currentSlideVariables,
      updateCurrentSlideVariables,
      updateAllSlides,
      allSlides,
      currentlySelectedSlideId,
    );

    xLocked.current = false;
    yLocked.current = false;
    removeXBar();
    removeYBar();

    saveNewChanges({
      currentSlideVariablesOverride: structuredClone(updateValues[0]),
      allSlidesOverride: structuredClone(updateValues[1]),
    });
  }

  

  function handleMouseResize(event) {
    let xDiff = (lastX.current - event.clientX) * slideSizeMultiplier;
    let yDiff = (lastY.current - event.clientY) * slideSizeMultiplier;

    let newVals = structuredClone(selectedObjectsVariables);

    let dotTLPos = [newVals[1].x, newVals[1].y];
    let dotTRPos = [newVals[1].x + newVals[1].w, newVals[1].y];
    let dotBLPos = [newVals[1].x, newVals[1].y + newVals[1].h];
    let dotBRPos = [newVals[1].x + newVals[1].w, newVals[1].y + newVals[1].h];

    let valDifference = [13.333 * (xDiff / 800), 7.5 * (yDiff / 450)];

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

    console.log(selectedObjectsVariables);
    console.log(currentSlideVariables);
    console.log(newVals);

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

    let allObjects = {
      text: { ...currentSlideVariables.text },
      images: { ...currentSlideVariables.images },
    };

    for (let type of Object.keys(allObjects)) {
      for (let variables of Object.entries(allObjects[type])) {
        if (selectedObject[0] !== type || selectedObject[1] !== variables[0]) {
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

    let allObjects = {
      text: { ...currentSlideVariables.text },
      images: { ...currentSlideVariables.images },
    };

    for (let type of Object.keys(allObjects)) {
      for (let variables of Object.entries(allObjects[type])) {
        if (selectedObject[0] !== type && selectedObject[1] !== variables[0]) {
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
    const startDiffX =
      (StartingXY.current[0] - event.clientX) * slideSizeMultiplier;
    const startDiffY =
      (StartingXY.current[1] - event.clientY) * slideSizeMultiplier;

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
      ref={slideSizeRef}
      className="presentationBackground"
      style={{
        touchAction: "none",
        backgroundImage: `url(${currentSlideVariables.backgroundImageUrl})`,
        backgroundColor: `${selectedObjectsVariables.backgroundColor || currentSlideVariables.backgroundColor}`,
      }}
      onPointerMove={(event) => {
        handleMouseMovement(event);
      }}
      onPointerLeave={() => {
        stopResizing();
      }}
      onPointerUp={() => {
        stopResizing();
      }}
    >
      <button
        className="backgroundButton"
        onPointerDown={() => {
          unselectObject();
          updateOpen(false);
        }}
      />

      {Object.entries(currentSlideVariables.text).map((variables) => {
        const selected =
          "text" == selectedObject[0] && variables[0] == selectedObject[1];
        const gottenVariables = structuredClone(variables);
        if (selected) {
          gottenVariables[1].x = selectedObjectsVariables[1].x;
          gottenVariables[1].y = selectedObjectsVariables[1].y;
          gottenVariables[1].w = selectedObjectsVariables[1].w;
          gottenVariables[1].h = selectedObjectsVariables[1].h;
          gottenVariables[1].textColor = selectedObjectsVariables[1].textColor;
          gottenVariables[1].outlineColor =
            selectedObjectsVariables[1].outlineColor;
          gottenVariables[1].outlineWidth =
            selectedObjectsVariables[1].outlineWidth;
        }
        return (
          <TextObject
            startResizing={startResizing}
            stopResizing={stopResizing}
            variables={gottenVariables}
            ind={variables[0]}
            selected={selected}
          />
        );
      })}

      {Object.entries(currentSlideVariables.images).map((variables) => {
        const selected =
          "images" == selectedObject[0] && variables[0] == selectedObject[1];

        const gottenVariables = structuredClone(variables);
        if (selected) {
          gottenVariables[1].x = selectedObjectsVariables[1].x;
          gottenVariables[1].y = selectedObjectsVariables[1].y;
          gottenVariables[1].w = selectedObjectsVariables[1].w;
          gottenVariables[1].h = selectedObjectsVariables[1].h;
          gottenVariables[1].borderWidth =
            selectedObjectsVariables[1].borderWidth;
          gottenVariables[1].borderColor =
            selectedObjectsVariables[1].borderColor;
        }
        return (
          <ImageObject
            startResizing={startResizing}
            stopResizing={stopResizing}
            variables={gottenVariables}
            ind={variables[0]}
            selected={selected}
          />
        );
      })}
      {yBars.map((pos, index) => {
        let realPos = slideSizes.height * (pos / 450);
        return (
          <div
            key={index}
            style={{
              backgroundColor: "red",
              height: "4px",
              width: "100%",
              position: "absolute",
              top: `${realPos - 2}px`,
              left: "0px",
            }}
          />
        );
      })}
      {xBars.map((pos, index) => {
        let realPos = slideSizes.width * (pos / 800);
        return (
          <div
            key={index}
            style={{
              backgroundColor: "red",
              height: "100%",
              width: "4px",
              position: "absolute",
              top: "0",
              left: `${realPos - 2}px`,
            }}
          />
        );
      })}
    </div>
  );
};
