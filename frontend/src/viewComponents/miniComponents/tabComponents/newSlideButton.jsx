import { useVariables } from "../../../presentationVariables";
import { startCreatingNewSlide } from "../../../slideFunctions";

export const NewSlideButton = ({ backgroundColor, onClickVal }) => {
  const { changeCreateNewSlideId, updateCurrentSlideVariables, updateCurrentlySelectedSlideId, saveNewChanges } = useVariables()
  return (
    <button
      onClick={() => {
        startCreatingNewSlide(onClickVal, changeCreateNewSlideId, updateCurrentSlideVariables, updateCurrentlySelectedSlideId)
        saveNewChanges({currentSelectedSlideIdOverride: -1, currentSlideVariablesOverride: {}, createNewSlideIdOverride: onClickVal})
      }}
      className="newSlideButton"
      style={{ backgroundColor: backgroundColor }}
    >
      <p className="newSlideButtonText">+</p>
    </button>
  );
};
