import { useVariables } from "../../presentationVariables";
import { deleteSelectedSlide } from "../../slideFunctions";
import "./style.css";

export const Modal = () => {
  const {
    updateModal,
    allSlides,
    updateAllSlides,
    currentlySelectedSlideId,
    updateCurrentlySelectedSlideId,
    changeCreateNewSlideId,
    updateCurrentSlideVariables,
    saveNewChanges,
  } = useVariables();
  return (
    <div className="modal">
      <div className="overlay">
        <div className="modalContentBox">
          <p className="modalText">
            Are you sure you would like to delete the current slide?
          </p>
          <button
            onMouseUp={() => {
              updateModal(false);
              saveNewChanges({ modalActiveOverride: false });
            }}
            className="cancelButton"
          >
            <p className="buttonText">cancel</p>
          </button>
          <button
            onMouseUp={() => {
              let newValues = deleteSelectedSlide(
                allSlides,
                updateAllSlides,
                currentlySelectedSlideId,
                updateCurrentlySelectedSlideId,
                changeCreateNewSlideId,
                updateCurrentSlideVariables,
              );
              updateModal(false);

              saveNewChanges({
                modalActiveOverride: false,
                allSlidesOverride: newValues[0],
                currentlySelectedSlideIdOverride: -1,
                createNewSlideIdOverride: newValues[1],
                currentSlideVariablesOverride: {},
              });
            }}
            className="continueButton"
          >
            <p className="buttonText">delete</p>
          </button>
        </div>
      </div>
    </div>
  );
};
