import { MiniDisplay } from "./miniComponents/slideStyleComponents/miniDisplay";
export const SlideStylePicker = ({
  newSlidePrefabs,
  updateCurrentSlideVariables,
  currentPageNumber,
  updatePageNumber,
  createSlide,
}) => {
  function changePage(allObj, objPerPage, newPageVal, changeFunc) {
    const possiblePages = Math.ceil(allObj / objPerPage);
    if (newPageVal > possiblePages) {
      newPageVal = 0;
    }
    if (newPageVal < 0) {
      newPageVal = possiblePages;
    }

    changeFunc(newPageVal);
  }

  let possibleStyles = {};
  for (let i = 0; i < 4; i++) {
    if (newSlidePrefabs[i + currentPageNumber * 4] != null) {
      possibleStyles = {
        ...possibleStyles,
        [i]: newSlidePrefabs[i + currentPageNumber * 4],
      };
    }
  }

  console.log(possibleStyles);

  return (
    <div
      style={{
        width: "100%",
        height: "85%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        onClick={() => {
          changePage(
            Object.entries(possibleStyles).length,
            4,
            currentPageNumber - 1,
            updatePageNumber,
          );
        }}
        style={{ left: "15px" }}
        className="changePageButton"
      >
        back
      </button>
      <div className="styleChoiceContainer">
        {Object.entries(possibleStyles).map((vars, index) => (
          <MiniDisplay
            key={index}
            vars={vars[1]}
            updateCurrentSlideVariables={updateCurrentSlideVariables}
            createSlide={createSlide}
          />
        ))}
      </div>
      <button
        onClick={() => {
          changePage(
            Object.entries(possibleStyles).length,
            4,
            currentPageNumber + 1,
            updatePageNumber,
          );
        }}
        style={{ right: "15px" }}
        className="changePageButton"
      >
        next
      </button>
    </div>
  );
};
