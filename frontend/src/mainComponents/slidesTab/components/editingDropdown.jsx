import { useVariables } from "../../../presentationVariables";

export const EditingDropDown = ({
  xPos,
  yPos,
  duplicateSlide,
  deleteSlide,
  hideDropDown,
}) => {
  const { saveNewChanges } = useVariables();
  return (
    <div
      className="optionBackground"
      style={{ left: `${xPos}px`, top: `${yPos - 60}px` }}
    >
      <button
        className="option"
        onMouseDown={() => {
          duplicateSlide();
          hideDropDown(false);
        }}
      >
        duplicate
      </button>
      <button
        className="option"
        onMouseDown={() => {
          deleteSlide(true);
          hideDropDown(false);
          saveNewChanges({ modalActiveOverride: true });
        }}
      >
        delete
      </button>
    </div>
  );
};
