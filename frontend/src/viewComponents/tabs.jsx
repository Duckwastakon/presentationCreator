import { MiniSlideDisplay } from "./miniComponents/tabComponents/miniSlideDisplay";
import { NewSlideButton } from "./miniComponents/tabComponents/newSlideButton";

import "./componentStyling/tabs.css";
import { useRef, useState } from "react";
import { MovingSlide } from "./miniComponents/tabComponents/inMovementSlide";

const selectedColor = "blue";
const idleColor = "white";

export const SlideTab = ({
  slides,
  onClick,
  currentSelected,
  toggleModal,
  nextNewSlideSpot,
  updateSlides,
}) => {
  const [movingSlide, UpdateMovingSlide] = useState({});
  const [movingSlidePos, updateMovingSlidePos] = useState([0, 0]);

  const [newSlidePos, updateNewSlidePos] = useState(0);
  const startingSlidePos = useRef(0);
  const startXPos = useRef(0);
  const startYPos = useRef(0);
  const slideStartingX = useRef(0);
  const slidePositions = useRef([]);

  const [placeMovingDisp, updateShowMoving] = useState(0);

  function startMovingSlide(event, slide, slidePos) {
    slideStartingX.current = event.clientX + (80 - event.nativeEvent.offsetX);
    startXPos.current = event.clientX;
    startYPos.current = event.clientY;
    startingSlidePos.current = slidePos;
    updateNewSlidePos(slidePos);

    let slideXVals = [];

    Object.entries(slides).map((vars, index) => {
      const distance = -(startingSlidePos.current - index);
      let xPos =
        slideStartingX.current +
        (80 + 12 + 20) * 2 * (distance / Math.abs(distance)) +
        (80 + 12) * 2 * (distance - 1 * (distance / Math.abs(distance)));

      if (isNaN(xPos)) {
        xPos = slideStartingX.current;
      }
      slideXVals[index] = xPos;
    });

    slidePositions.current = slideXVals;

    UpdateMovingSlide(slide);
    updateMovingSlidePos([startXPos, startYPos]);
  }

  function moveSlide(event) {
    const newXPos = event.clientX;
    const newYPos = event.clientY;

    let found = false;
    slidePositions.current.map((pos, ind) => {
      if (newXPos < pos && found != true) {
        found = true;
        if (ind > startingSlidePos.current) {
          updateNewSlidePos(ind - 1);
        } else {
          updateNewSlidePos(ind);
        }
      }
    });

    if (!found && slidePositions.current.length > 0) {
      updateNewSlidePos(slidePositions.current.length - 1);
    }

    if (newSlidePos != startingSlidePos.current) {
      if (newSlidePos > startingSlidePos.current) {
        updateShowMoving(2);
      } else updateShowMoving(1);
    } else updateShowMoving(0);

    updateMovingSlidePos([newXPos, newYPos]);
  }

  function stopMovingSlide() {
    if (Object.keys(movingSlide).length > 0) {
      let newSlideOrder = {};
      let moved = false;

      console.log(newSlidePos);

      Object.entries(slides).map((slideVal, ind) => {
        if (newSlidePos == ind && newSlidePos <= startingSlidePos.current) {
          console.log(ind, "placed");
          newSlideOrder = {
            ...newSlideOrder,
            [Object.keys(newSlideOrder).length]: movingSlide,
          };
          moved = true;
        }
        if (ind != startingSlidePos.current) {
          newSlideOrder = {
            ...newSlideOrder,
            [Object.keys(newSlideOrder).length]: slideVal[1],
          };
        };

        if (newSlidePos == ind && newSlidePos > startingSlidePos.current) {
          console.log(ind, "placed");
          newSlideOrder = {
            ...newSlideOrder,
            [Object.keys(newSlideOrder).length]: movingSlide,
          };
          moved = true;
        }
      });

      if (!moved) {
        newSlideOrder = {
          ...newSlideOrder,
          [Object.keys(newSlideOrder).length]: movingSlide,
        };
      }

      console.log(newSlideOrder);

      UpdateMovingSlide({});
      updateSlides(newSlideOrder);
      onClick(movingSlide, newSlidePos);
    }
  }

  return (
    <div
      className="slideMovingContainer"
      onMouseLeave={stopMovingSlide}
      onMouseMove={moveSlide}
      onMouseUp={stopMovingSlide}
    >
      {Object.keys(movingSlide).length > 0 && (
        <div
          style={{
            zIndex: "999",
            position: "fixed",
            left: `${movingSlidePos[0] - 80}px`,
            top: `${movingSlidePos[1] - 45}px`,
          }}
        >
          <MovingSlide slideComponents={movingSlide} />
        </div>
      )}
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
                  gap: "12px",
                }}
              >
                {newSlidePos == ind &&
                  placeMovingDisp == 1 &&
                  Object.keys(movingSlide).length > 0 && (
                    <MovingSlide
                      style={{ opacity: "0.3" }}
                      slideComponents={movingSlide}
                    />
                  )}
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
                  startMovingSlide={startMovingSlide}
                />

                {Number(slideVal[0]) === currentSelected.current &&
                  currentSelected.current !==
                    Object.entries(slides).length - 1 && (
                    <NewSlideButton
                      backgroundColor={idleColor}
                      onClick={onClick}
                      onClickVal={currentSelected + 1}
                    />
                  )}

                {newSlidePos == ind &&
                  placeMovingDisp == 2 &&
                  Object.keys(movingSlide).length > 0 && (
                    <MovingSlide
                      style={{ opacity: "0.3" }}
                      slideComponents={movingSlide}
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
    </div>
  );
};
