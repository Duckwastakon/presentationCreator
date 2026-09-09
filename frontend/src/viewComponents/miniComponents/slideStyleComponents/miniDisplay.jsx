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

        console.log(newValues)

        saveNewChanges({
          currentlySelectedSlideIdOverride: newValues[1],
          allSlidesOverride: newValues[0],
          currentSlideVariablesOverride: slideClone,
          createNewSlideIdOverride: -1,
        });
      }}
    >
      <div className="miniPresentation">
        {Object.entries(vars.text).map((variables, indv) => (
          <p
            key={indv}
            style={{
              position: "absolute",
              top: (180 * (variables[1].y / 7.5)).toString() + "px",
              left: (320 * (variables[1].x / 13.333)).toString() + "px",
              height: (180 * (variables[1].h / 7.5)).toString() + "px",
              width: (320 * (variables[1].w / 13.333)).toString() + "px",
              fontSize: variables[1].fontSize.toString() + "px",
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
