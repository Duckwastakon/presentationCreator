import { useEffect, useRef, useState } from "react";
import { updObj } from "../../../objectFunctions";
import { useVariables } from "../../../presentationVariables";
import { ObjectChanges } from "./objectChanges";
import { ResizeDots } from "./resizeDots";

export const TextObject = ({
  startResizing,
  stopResizing,
  variables,
  ind,
  selected,
}) => {
  const {
    currentSlideVariables,
    updateCurrentSlideVariables,
    setSelectedObject,
    setSelectedObjectsVariables,
    selectedObjectsVariables,
    updateAllSlides,
    allSlides,
    currentlySelectedSlideId,
    setUpdateVariable,
    saveNewChanges,
    updateOpen,
  } = useVariables();
  let ExtraVariables = {};
  if (selected) {
    ExtraVariables.textColor = selectedObjectsVariables.textColor;
  }
  const objectElement = useRef(null);
  const [textSize, updateTextSize] = useState(24);

  useEffect(() => {
    const parentElement = objectElement.current.parentElement;

    updateTextSize(
      variables[1].fontSize *
        (parentElement.getBoundingClientRect().width / 850),
    );
  }, []);

  return (
    <div
      ref={objectElement}
      style={{
        position: "absolute",
        top: (100 * (variables[1].y / 7.5)).toString() + "%",
        height: (100 * (variables[1].h / 7.5)).toString() + "%",
        left: (100 * (variables[1].x / 13.333)).toString() + "%",
        width: (100 * (variables[1].w / 13.333)).toString() + "%",
        alignItems: "center",
        justifyContent: "center",
        zIndex: variables[1].layer || 1,
      }}
      key={ind}
    >
      <input
        type="text"
        value={variables[1].text}
        onChange={(newVal) => {
          let newAllSlides = updObj(
            "text",
            variables[0],
            "text",
            newVal.target.value,
            currentSlideVariables,
            updateCurrentSlideVariables,
            updateAllSlides,
            allSlides,
            currentlySelectedSlideId,
          );

          let newVars = structuredClone(variables);
          newVars[1].text = newVal.target.value;
          setSelectedObjectsVariables(newVars);

          saveNewChanges({
            currentSlideVariablesOverride: newAllSlides[0],
            allSlidesOverride: newAllSlides[1],
          });
        }}
        onSelect={() => {
          if (!selected) {
            setUpdateVariable(["text", variables[0], undefined]);
            setSelectedObjectsVariables(structuredClone(variables));
            setSelectedObject(["text", variables[0]]);
          }
          updateOpen(false);
        }}
        className="presentationTextEditBox"
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          fontSize: textSize.toString() + "px",
          color: variables[1].textColor || "black",
          fontWeight: variables[1].bold || "400",
          WebkitTextStrokeWidth: `${variables[1].outlineWidth || 0}px`,
          WebkitTextStrokeColor: variables[1].outlineColor || "black",
          textDecoration: variables[1].textDecoration || "none",
          fontStyle: variables[1].fontStyle || "normal",
          textAlign: variables[1].textAlign || "left",
        }}
      />
      {selected && (
        <ObjectChanges
          posX={variables[1].w}
          objectIndex={ind}
          objectData={variables}
        />
      )}
      {selected && (
        <ResizeDots
          startResizing={startResizing}
          stopResizing={stopResizing}
          objectSize={[variables[1].w, variables[1].h]}
        />
      )}
    </div>
  );
};
