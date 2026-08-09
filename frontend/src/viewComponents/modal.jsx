import "./componentStyling/modalStyling.css";

export const Modal = ({ deleteCurrentSlideFunction, toggleModal }) => {
  return (
    <div className="modal">
      <div className="overlay">
        <div className="modalContentBox">
          <p className="modalText">
            Are you sure you would like to delete the current slide?
          </p>
          <button onMouseUp={toggleModal} className="cancelButton">
            <p className="buttonText">cancel</p>
          </button>
          <button
            onMouseUp={() => {
              deleteCurrentSlideFunction();
              toggleModal();
            }}
            className="continueButton"
          ><p className="buttonText">delete</p></button>
        </div>
      </div>
    </div>
  );
};
