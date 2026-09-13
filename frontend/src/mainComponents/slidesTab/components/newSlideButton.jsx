import { useVariables } from "../../../presentationVariables";
import { startCreatingNewSlide } from "../../../slideFunctions";
import createPlus from "../images/createNew.png";


export const NewSlideButton = ({ backgroundColor, onClickVal }) => {
  const { changeCreateNewSlideId, updateCurrentSlideVariables, updateCurrentlySelectedSlideId, saveNewChanges } = useVariables()
  return (
    <button
      onClick={() => {
        startCreatingNewSlide(onClickVal, changeCreateNewSlideId, updateCurrentSlideVariables, updateCurrentlySelectedSlideId)
        saveNewChanges({currentSelectedSlideIdOverride: -1, currentSlideVariablesOverride: {}, createNewSlideIdOverride: onClickVal})
      }}
      className="newSlideButton"
    >
      <img style={{filter: backgroundColor === "blue" ? "brightness(0) saturate(100%) invert(30%) sepia(90%) saturate(2000%) hue-rotate(190deg)" : ""}} className="createPlusImage" src={createPlus}/>
    </button>
  );
};
