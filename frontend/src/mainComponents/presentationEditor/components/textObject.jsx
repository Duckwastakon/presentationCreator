import { useEffect, useRef, useState } from "react";
import { updObj } from "../../../objectFunctions";
import { useVariables } from "../../../presentationVariables";
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
    saveChangedVariables,
  } = useVariables();
  let ExtraVariables = {};
  if (selected) {
    ExtraVariables.textColor = selectedObjectsVariables.textColor;
  }
  const objectElement = useRef(null);
  const [textSize, updateTextSize] = useState(24);
  useEffect(() => {
    function setTextSize() {
      if (objectElement.current == null) return;
      let parentElement = objectElement.current.parentElement;
      if (parentElement == null) return;

      updateTextSize(
        variables[1].fontSize *
          (parentElement.getBoundingClientRect().width / 1920) *
          2,
      );
    }

    setTextSize();

    window.addEventListener("resize", setTextSize);
  }, variables);

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
      <textarea
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

          let scrollHeight = newVal.target.scrollHeight;
          let textBoxSize =
            newVal.target.parentElement.getBoundingClientRect().height;

          let newVars = structuredClone(variables);

          if (scrollHeight > textBoxSize) {
            let newSize = (variables[1].h/textBoxSize)*scrollHeight
            newAllSlides = updObj(
              "text",
              variables[0],
              "h",
              newSize,
              newAllSlides[0],
              updateCurrentSlideVariables,
              updateAllSlides,
              newAllSlides[1],
              currentlySelectedSlideId,
            );

            newVars[1].h = newSize
          }

          newVars[1].text = newVal.target.value;
          setSelectedObjectsVariables(newVars);

          saveNewChanges({
            currentSlideVariablesOverride: newAllSlides[0],
            allSlidesOverride: newAllSlides[1],
          });
        }}
        onSelect={() => {
          if (!selected) {
            saveChangedVariables();
            setUpdateVariable(["text", variables[0], undefined]);
            setSelectedObjectsVariables(structuredClone(variables));
            setSelectedObject(["text", variables[0]]);
          }
          updateOpen(false);
        }}
        className="presentationTextEditBox"
        style={{
          fontSize: textSize.toString() + "px",
          color: variables[1].textColor || "black",
          fontWeight: variables[1].bold || "400",
          WebkitAppearance: "none",
          appearance: "none",
          textDecoration: variables[1].textDecoration || "none",
          fontStyle: variables[1].fontStyle || "normal",
          textAlign: variables[1].textAlign || "left",
          padding: (variables[1].outlineWidth / 2 || 0).toString() + "px",
          lineHeight: textSize.toString() + "px",
        }}
      />
      <p
        className="textOverlay"
        style={{
          fontSize: textSize.toString() + "px",
          color: "transparent",
          fontWeight: variables[1].bold || "400",
          WebkitAppearance: "none",
          appearance: "none",
          WebkitTextStrokeWidth: `${variables[1].outlineWidth || 0}px`,
          WebkitTextStrokeColor: variables[1].outlineColor || "black",
          textDecoration: variables[1].textDecoration || "none",
          fontStyle: variables[1].fontStyle || "normal",
          textAlign: variables[1].textAlign || "left",
          zIndex: -1,
          overflow: "hidden",
          padding: (variables[1].outlineWidth / 2 || 0).toString() + "px",
          lineHeight: textSize.toString() + "px",
        }}
      >
        {variables[1].text}
      </p>
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
