import { MiniSlideDisplay } from "./miniComponents/tabComponents/miniSlideDisplay";
import { NewSlideButton } from "./miniComponents/tabComponents/newSlideButton";

const selectedColor = "blue";
const idleColor = "white";

export const SlideTab = ({
  slides,
  onClick,
  currentSelected,
  toggleModal,
  nextNewSlideSpot,
}) => {

  return (
    <div className="slideTab">
      {Object.keys(slides).length > 0 &&
        (nextNewSlideSpot.current == 0 ? (
          <NewSlideButton
            backgroundColor={selectedColor}
            onClick={onClick}
            onClickVal={0}
          />
        ) : (
          <NewSlideButton
            backgroundColor={idleColor}
            onClick={onClick}
            onClickVal={0}
          />
        ))}

      {Object.keys(slides).length > 0 &&
        Object.entries(slides).map((slideVal, ind) => {
          return (
            <div
              key={ind}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: "16px",
              }}
            >
              {Number(slideVal[0]) === nextNewSlideSpot.current &&
                nextNewSlideSpot.current !== 0 && (
                  <NewSlideButton
                    backgroundColor={selectedColor}
                    onClick={onClick}
                    onClickVal={currentSelected.current}
                  />
                )}

              {Number(slideVal[0]) === currentSelected.current &&
                currentSelected.current !== 0 && (
                  <NewSlideButton
                    backgroundColor={idleColor}
                    onClick={onClick}
                    onClickVal={currentSelected.current}
                  />
                )}

              <MiniSlideDisplay
                slideVal={slideVal}
                ind={ind}
                onClick={onClick}
                currentSelected={currentSelected}
                toggleModal={toggleModal}
              />

              {Number(slideVal[0]) === currentSelected.current &&
                currentSelected.current !==
                  Object.entries(slides).length - 1 && (
                  <NewSlideButton
                    backgroundColor={idleColor}
                    onClick={onclick}
                    onClickVal={currentSelected + 1}
                  />
                )}
            </div>
          );
        })}
      {nextNewSlideSpot.current === Object.keys(slides).length ? (
        <NewSlideButton
          backgroundColor={selectedColor}
          onClick={onClick}
          onClickVal={Object.keys(slides).length}
        />
      ) : (
        <NewSlideButton
          backgroundColor={idleColor}
          onClick={onClick}
          onClickVal={Object.keys(slides).length}
        />
      )}
    </div>
  );
};
