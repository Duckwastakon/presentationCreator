import { useEffect, useRef, useState } from "react";
import "./componentStyling/presentationDisplayStyling.css";
import { TextObject } from "./miniComponents/editorComponents/textObject";
import { ImageObject } from "./miniComponents/editorComponents/imageObject";

export const MainPresentationDisplay = ({
  vars,
  ind,
  updateObject,
  updateSelectedObject,
  deleteObject,
  duplicateObject
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
    let newBars = xBars;
    if (!newBars.includes(pos)) {
      newBars.push(pos);
    }
    updateXBars(newBars);
  }

  function removeXBar(pos) {
    let newBars = [];
    if (xBars.includes(pos)) {
      xBars.forEach((gottenPos) => {
        if (!gottenPos == pos) {
          newBars.push(gottenPos);
        }
      });

      updateXBars(newBars);
    }
  }

  function addYBar(pos) {
    let newBars = yBars;
    if (!newBars.includes(pos)) {
      newBars.push(pos);
    }
    updateYBars(newBars);
  }

  function removeYBar(pos) {
    let newBars = [];
    if (yBars.includes(pos)) {
      yBars.forEach((gottenPos) => {
        if (!gottenPos == pos) {
          newBars.push(gottenPos);
        }
      });

      updateYBars(newBars);
    }
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

  function handleObjectMove(event) {
    const startDiffX = StartingXY.current[0] - event.clientX;
    const startDiffY = StartingXY.current[1] - event.clientY;

    if (Object.entries(selectedObjectsVariables).length < 1) {
      return;
    }
    let newVals = structuredClone(selectedObjectsVariables);

    if (holdingShift.current) {
      if (Math.abs(startDiffX) > Math.abs(startDiffY)) {
        newVals[1].y = startingXYPos.current[1];
        if (xLocked.current == true) {
          const lockedXDiff = lockedX.current - event.clientX;

          if (Math.abs(lockedXDiff) > 22) {
            newVals[1].x =
              startingXYPos.current[0] - 13.333 * (startDiffX / 800);
            xLocked.current = false;
          }
        } else {
          newVals[1].x = startingXYPos.current[0] - 13.333 * (startDiffX / 800);
          removeXBar(400);

          if (Math.abs(13.333 / 2 - newVals[1].w / 2 - newVals[1].x) < 0.1) {
            newVals[1].x = 13.333 / 2 - newVals[1].w / 2;
            xLocked.current = true;
            lockedX.current = event.clientX;
            addXBar(400);
          }
        }
      } else {
        newVals[1].x = startingXYPos.current[0];
        if (yLocked.current == true) {
          const lockedYDiff = lockedY.current - event.clientY;

          if (Math.abs(lockedYDiff) > 22) {
            newVals[1].y = startingXYPos.current[1] - 7.5 * (startDiffY / 450);
            yLocked.current = false;
          }
        } else {
          newVals[1].y = startingXYPos.current[1] - 7.5 * (startDiffY / 450);
          removeYBar(225);

          if (Math.abs(7.5 / 2 - newVals[1].h / 2 - newVals[1].y) < 0.1) {
            newVals[1].y = 7.5 / 2 - newVals[1].h / 2;
            yLocked.current = true;
            lockedY.current = event.clientY;
            addYBar(225);
          }
        }
      }
    } else {
      if (xLocked.current == true) {
        const lockedXDiff = lockedX.current - event.clientX;

        if (Math.abs(lockedXDiff) > 22) {
          newVals[1].x = startingXYPos.current[0] - 13.333 * (startDiffX / 800);
          xLocked.current = false;
        }
      } else {
        newVals[1].x = startingXYPos.current[0] - 13.333 * (startDiffX / 800);
        removeXBar(400);

        if (Math.abs(13.333 / 2 - newVals[1].w / 2 - newVals[1].x) < 0.1) {
          newVals[1].x = 13.333 / 2 - newVals[1].w / 2;
          xLocked.current = true;
          lockedX.current = event.clientX;
          addXBar(400);
        }
      }

      if (yLocked.current == true) {
        const lockedYDiff = lockedY.current - event.clientY;

        if (Math.abs(lockedYDiff) > 22) {
          newVals[1].y = startingXYPos.current[1] - 7.5 * (startDiffY / 450);
          yLocked.current = false;
        }
      } else {
        newVals[1].y = startingXYPos.current[1] - 7.5 * (startDiffY / 450);
        removeYBar(225);

        if (Math.abs(7.5 / 2 - newVals[1].h / 2 - newVals[1].y) < 0.1) {
          newVals[1].y = 7.5 / 2 - newVals[1].h / 2;
          yLocked.current = true;
          lockedY.current = event.clientY;
          addYBar(225);
        }
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
          unselectObject();
        }}
      />
      
      {Object.entries(vars.text).map((variables) => {
        const selected =
          "text" == selectedObject[0] && variables[0] == selectedObject[1];

        if (selected) {
          return (
            <TextObject
              startResizing={startResizing}
              stopResizing={stopResizing}
              variables={selectedObjectsVariables}
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
        } else {
          return (
            <TextObject
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
        }
      })}

      {Object.entries(vars.images).map((variables, indv) => {
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
      {yBars.map((pos, index) => {
        return (
          <div
            key={index}
            style={{
              backgroundColor: "black",
              height: "1px",
              width: "100%",
              position: "absolute",
              top: `${pos}px`,
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
              backgroundColor: "black",
              height: "100%",
              width: "1px",
              position: "absolute",
              top: "0",
              left: `${pos}px`,
            }}
          />
        );
      })}
    </div>
  );
};
