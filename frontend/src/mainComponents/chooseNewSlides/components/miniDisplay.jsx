import { useVariables } from "../../../presentationVariables";
import { createNewSlide } from "../../../slideFunctions";
import { MiniDisplayImage } from "./miniImage";
import { MiniDisplayText } from "./miniText";

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

        saveNewChanges({
          currentlySelectedSlideIdOverride: newValues[1],
          allSlidesOverride: newValues[0],
          currentSlideVariablesOverride: slideClone,
          createNewSlideIdOverride: -1,
        });
      }}
      style={{
        background: "transparent",
        border: "none",
        outline: "none",
        height: "auto",
        width: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="miniPresentation">
        {Object.entries(vars.text).map((variables, indv) => (
          <MiniDisplayText variables={variables} indv={indv} />
        ))}
        {Object.entries(vars.images).map((variables, indv) => (
          <MiniDisplayImage variables={variables} indv={indv} />
        ))}
      </div>
    </button>
  );
};
