export const NewSlideButton = ({ backgroundColor, onClick, onClickVal }) => {
  return (
    <button
      onClick={() => {
        onClick({}, undefined, onClickVal);
      }}
      className="newSlideButton"
      style={{ backgroundColor: backgroundColor }}
    >
      <p className="newSlideButtonText">+</p>
    </button>
  );
};
