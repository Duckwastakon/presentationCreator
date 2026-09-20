import { useEffect, useRef, useState } from "react";
import { useVariables } from "../../../presentationVariables";
import { createNewSlide } from "../../../slideFunctions";

export const MiniDisplay = ({ vars, ind }) => {
  const {
    updateCurrentSlideVariables,
    createNewSlideId,
    changeCreateNewSlideId,
    currentlySelectedSlideId,
    updateCurrentlySelectedSlideId,
    allSlides,
    updateAllSlides,
    saveNewChanges,
  } = useVariables();

  const sizeRef = useRef(null);
  const [textSize, updateTextSize] = useState(1);

  useEffect(() => {
    updateTextSize(sizeRef.current.getBoundingClientRect().width / 320);
  }, []);

  return (
    <button
      key={ind}
      onClick={() => {
        const slideClone = structuredClone(vars);
        updateCurrentSlideVariables(slideClone);
        let newValues = createNewSlide(
          slideClone,
          createNewSlideId,
          changeCreateNewSlideId,
          currentlySelectedSlideId,
          updateCurrentlySelectedSlideId,
          allSlides,
          updateAllSlides,
        );

        saveNewChanges({
          currentlySelectedSlideIdOverride: newValues[1],
          allSlidesOverride: newValues[0],
          currentSlideVariablesOverride: slideClone,
          createNewSlideIdOverride: -1,
        });
      }}
      style={{ background: "transparent", border: "none", outline: "none", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div ref={sizeRef} className="miniPresentation">
        {Object.entries(vars.text).map((variables, indv) => (
          <p
            key={indv}
            style={{
              position: "absolute",
              top: (100 * (variables[1].y / 7.5)).toString() + "%",
              left: (100 * (variables[1].x / 13.333)).toString() + "%",
              height: (100 * (variables[1].h / 7.5)).toString() + "%",
              width: (100 * (variables[1].w / 13.333)).toString() + "%",
              fontSize: (variables[1].fontSize * textSize).toString() + "px",
              textAlign: "left",
              overflow: "hidden",
            }}
          >
            {variables[1].text}
          </p>
        ))}
      </div>
    </button>
  );
};
