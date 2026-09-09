import { savePresentation } from "../fetchFunctions";
import { useVariables } from "../presentationVariables";
import saveButton from "./save.png";

export const HeaderBar = () => {
  const {
    allSlides,
    updateAllSlides,
    updateCurrentSlideVariables,
    updateCurrentlySelectedSlideId,
    changeCreateNewSlideId,
    setSelectedObject,
    saveNewChanges,
  } = useVariables();

  return (
    <div style={{zIndex: 110}}>
      <button
        onMouseUp={() => {
          console.log("hey");
          updateAllSlides({});
          updateCurrentSlideVariables({});
          updateCurrentlySelectedSlideId(-1);
          changeCreateNewSlideId(0);
          setSelectedObject(["", ""]);

          saveNewChanges({
            allSlidesOverride: {},
            currentSlideVariablesOverride: {},
            currentlySelectedSlideIdOverride: -1,
            createNewSlideIdOverride: 0,
            selectedObjectOverride: ["", ""],
          });
        }}
        className="clearButton"
      >
        Clear and start making a new presentation
      </button>
      <button
        onMouseUp={() => {
            savePresentation(allSlides)
        }}
        className="saveButton"
      >
        <img src={saveButton} />
      </button>
    </div>
  );
};
