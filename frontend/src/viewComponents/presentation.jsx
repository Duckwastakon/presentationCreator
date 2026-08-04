import { useRef, useState } from "react";
import whiteDot from "./a.png";

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


  function startResizing(event, newState){
    startX.current = event.clientX
    startY.current = event.clientY
    changingState.current = newState
  }

  function stopResizing(){
    changingState.current = 0
    updateObject(selectedObject[0], selectedObject[1], undefined, selectedObjectsVariables)
    updateSelectedObject(["", ""])
  }

  function handleMouseResize(event) {
    if (changingState.current == 0) return;

    const xDiff = startX.current - event.clientX
    const yDiff = startY.current - event.clientY

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

    let valDifference = [13.333 * (xDiff / 800), 7.5 * (yDiff / 450)]

    let newVals = structuredClone(selectedObjectsVariables);

    switch (changingState.current) {
      case 1:
        dotTLPos[0] -= valDifference[0]
        dotTLPos[1] -= valDifference[1]

        dotBLPos[0] = dotTLPos[0];
        dotTRPos[1] = dotTLPos[1];
        break;
      case 2:
        dotTRPos[0] -= valDifference[0]
        dotTRPos[1] -= valDifference[1]

        dotBRPos[0] = dotTRPos[0];
        dotTLPos[1] = dotTRPos[1];
        break;
      case 3:
        dotBLPos[0] -= valDifference[0]
        dotBLPos[1] -= valDifference[1]

        dotTLPos[0] = dotBLPos[0];
        dotBRPos[1] = dotBLPos[1];
        break;
      case 4:
        dotBRPos[0] -= valDifference[0]
        dotBRPos[1] -= valDifference[1]

        dotTRPos[0] = dotBRPos[0];
        dotBLPos[1] = dotBRPos[1];
        break;

      default:
        return;
    }
    newVals[1].x = dotTLPos[0];
    newVals[1].y = dotTLPos[1];
    newVals[1].w = Math.abs(dotTRPos[0] - dotTLPos[0]);
    newVals[1].h = Math.abs(dotBLPos[1] - dotTLPos[1]);

    startX.current = event.clientX
    startY.current = event.clientY

    setSelectedObjectsVariables(newVals);
  }

  return (
    <div
      className="presentationBackground"
      style={{ backgroundImage: `url(${vars.backgroundImageUrl})` }}
      key={ind}
      onMouseMove={(event) => handleMouseResize(event)}
      onMouseLeave={()=>{changingState.current = 0}}
      onMouseUp={()=>{
        changingState.current = 0
      }}
    >
      {Object.entries(vars.text).map((variables, indv) => {
        return (
          <input
            type="text"
            value={variables[1].text}
            onChange={(newVal) =>
              updateObject("text", variables[0], "text", newVal.target.value)
            }
            key={indv}
            className="presentationTextEditBox"
            style={{
              position: "absolute",
              top: (100 * (variables[1].y / 7.5)).toString() + "%",
              height: (100 * (variables[1].h / 7.5)).toString() + "%",
              left: (100 * (variables[1].x / 13.333)).toString() + "%",
              width: (100 * (variables[1].w / 13.333)).toString() + "%",
              fontSize: (variables[1].fontSize * 2.5).toString() + "px",
            }}
          />
        );
      })}
      {Object.entries(vars.images).map((variables, indv) => {
        const selected =
          "images" == selectedObject[0] && variables[0] == selectedObject[1];

        if (selected) {
          return (
            <div
              key={indv}
              style={{
                position: "absolute",
                top:
                  (100 * (selectedObjectsVariables[1].y / 7.5)).toString() +
                  "%",
                height:
                  (100 * (selectedObjectsVariables[1].h / 7.5)).toString() +
                  "%",
                left:
                  (100 * (selectedObjectsVariables[1].x / 13.333)).toString() +
                  "%",
                width:
                  (100 * (selectedObjectsVariables[1].w / 13.333)).toString() +
                  "%",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
            >
              <button
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
                onClick={() => {
                  console.log(["images", variables[0], "src"]);
                  updateSelectedObject(["images", variables[0], "src"]);
                  setSelectedObjectsVariables(structuredClone(variables));
                  setSelectedObject(["images", variables[0]]);
                }}
              >
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={variables[1].src}
                />
              </button>
              <button
              onMouseDown={(event)=>{startResizing(event, 1)}}
                style={{
                  position: "absolute",
                  width: "15px",
                  height: "15px",
                  top: "-15px",
                  left: "-15px",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img changingSize style={{width: "100%", height: "100%"}} src={whiteDot} />
              </button>
              
              <button
              onMouseDown={(event)=>{startResizing(event, 2)}}
                style={{
                  position: "absolute",
                  width: "15px",
                  height: "15px",
                  top: "-15px",
                  right: "-15px",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img changingSize style={{width: "100%", height: "100%"}} src={whiteDot} />
              </button>
              <button
              onMouseDown={(event)=>{startResizing(event, 3)}}
                style={{
                  position: "absolute",
                  width: "15px",
                  height: "15px",
                  bottom: "-15px",
                  left: "-15px",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img changingSize style={{width: "100%", height: "100%"}} src={whiteDot} />
              </button>
              <button
              onMouseDown={(event)=>{startResizing(event, 4)}}
                style={{
                  position: "absolute",
                  width: "15px",
                  height: "15px",
                  bottom: "-15px",
                  right: "-15px",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <img changingSize style={{width: "100%", height: "100%"}} src={whiteDot} />
              </button>
            </div>
          );
        } else {
          return (
            <button
              key={indv}
              style={{
                position: "absolute",
                top: (100 * (variables[1].y / 7.5)).toString() + "%",
                height: (100 * (variables[1].h / 7.5)).toString() + "%",
                left: (100 * (variables[1].x / 13.333)).toString() + "%",
                width: (100 * (variables[1].w / 13.333)).toString() + "%",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
              onClick={() => {
                console.log(["images", variables[0], "src"]);
                updateSelectedObject(["images", variables[0], "src"]);
                setSelectedObjectsVariables(structuredClone(variables));
                setSelectedObject(["images", variables[0]]);
              }}
            >
              <img
                style={{ width: "100%", height: "100%" }}
                src={variables[1].src}
              />
            </button>
          );
        }
      })}
    </div>
  );
};
