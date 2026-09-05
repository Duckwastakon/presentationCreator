import { useVariables } from "../../../presentationVariables";
import { startCreatingNewSlide } from "../../../slideFunctions";

export const NewSlideButton = ({ backgroundColor, onClickVal }) => {
  const { changeCreateNewSlideId, updateCurrentSlideVariables, updateCurrentlySelectedSlideId } = useVariables()
  return (
    <button
      onClick={() => {
        startCreatingNewSlide(onClickVal, changeCreateNewSlideId, updateCurrentSlideVariables, updateCurrentlySelectedSlideId)
      }}
      className="newSlideButton"
      style={{ backgroundColor: backgroundColor }}
    >
      <p className="newSlideButtonText">+</p>
    </button>
  );
};
