export const EditingDropDown = (
  {xPos,
  yPos,
  duplicateSlide,
  deleteSlide,
  hideDropDown,}
) => {
  return (
    <div
      style={{
        backgroundColor: "gray",
        width: "100px",
        height: "100px",
        position: "fixed",
        left: `${xPos}px`,
        top: `${yPos-100}px`,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 102,
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
        }}
      >
        delete
      </button>
    </div>
  );
};
