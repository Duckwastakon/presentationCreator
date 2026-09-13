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
      style={{
        backgroundColor: "gray",
        width: "100px",
        height: "60px",
        position: "fixed",
        left: `${xPos}px`,
        top: `${yPos - 60}px`,
        alignItems: "center",
        justifyContent: "space-around",
        zIndex: 110,
      }}
    >
      <button
        onMouseDown={() => {
          console.log("hey");
          duplicateSlide();
          hideDropDown();
        }}
      >
        duplicate
      </button>
      <button
        onMouseDown={() => {
          deleteSlide(true);
          hideDropDown();
          saveNewChanges({ modalActiveOverride: true });
        }}
      >
        delete
      </button>
    </div>
  );
};
