import { useVariables } from "../presentationVariables";
import { deleteSelectedSlide } from "../slideFunctions";
import "./componentStyling/modalStyling.css";

export const Modal = () => {
  const {
    updateModal,
    allSlides,
    updateAllSlides,
    currentlySelectedSlideId,
    updateCurrentlySelectedSlideId,
    changeCreateNewSlideId,
    updateCurrentSlideVariables,
  } = useVariables();
  return (
    <div className="modal">
      <div className="overlay">
        <div className="modalContentBox">
          <p className="modalText">
            Are you sure you would like to delete the current slide?
          </p>
          <button onMouseUp={() => updateModal(false)} className="cancelButton">
            <p className="buttonText">cancel</p>
          </button>
          <button
            onMouseUp={() => {
              deleteSelectedSlide(
                allSlides,
                updateAllSlides,
                currentlySelectedSlideId,
                updateCurrentlySelectedSlideId,
                changeCreateNewSlideId,
                updateCurrentSlideVariables,
              );
              updateModal(false);
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
