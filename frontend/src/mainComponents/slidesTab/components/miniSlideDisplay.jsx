import cross from "../images/edit.png";
import imageDefault from "../images/defaultImage.png"

import { useVariables } from "../../../presentationVariables";
import { useEffect, useRef, useState } from "react";

export const MiniSlideDisplay = ({
  slideVal,
  ind,
  onClick,
  startMovingSlide,
}) => {
  const { currentlySelectedSlideId } = useVariables();

  const vars = slideVal[1];
  const selected = Number(slideVal[0]) == currentlySelectedSlideId.current;

  let borderCol;
  if (selected) {
    borderCol = "var(--accentColor2)";
  } else {
    borderCol = "var(--bgColor)";
  }

  const { updateOpen, changeDropDownPos, updateDropDownSlideId } =
    useVariables();

  const objectElement = useRef(null);
  const [textSize, updateTextSize] = useState(24);
  useEffect(() => {
    function setTextSize() {
      let parentElement = objectElement.current;
      updateTextSize((parentElement.getBoundingClientRect().width / 1920) * 2);

      console.log((parentElement.getBoundingClientRect().width / 1920) * 2);
    }

    setTextSize();

    window.addEventListener("resize", setTextSize);
  }, slideVal);

  return (
    <div
      ref={objectElement}
      style={{
        border: `2px solid ${borderCol}`,
        backgroundImage: `url(${vars.backgroundImageUrl})`,
        backgroundColor: vars.backgroundColor || "white",
      }}
      className="miniSlideTab"
      onContextMenu={(event) => {
        event.preventDefault();

        changeDropDownPos([event.clientX, event.clientY]);
        updateOpen(true);
        updateDropDownSlideId(Number(slideVal[0]));
      }}
    >
      <button
        className="selectSlideButton"
        onPointerUp={() => {
          if (!selected) {
            onClick(slideVal[1], ind);
          }
          updateOpen(false);
        }}
        onPointerDown={(event) => {
          if (selected) {
            startMovingSlide(event, slideVal[1], slideVal[0]);
          }
        }}
      />

      {selected && (
        <button
          className="deleteSlideButton"
          onPointerUp={() => {
            changeDropDownPos([event.clientX, event.clientY]);
            updateOpen(true);
            updateDropDownSlideId(Number(slideVal[0]));
          }}
        >
          <svg
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              aspectRatio: "1/1",
            }}
          >
            <image href={cross} className="deleteQuickButton" />
          </svg>
        </button>
      )}
      {Object.entries(vars.text).map((variables, indv) => {
        return (
          <p
            key={indv}
            className="textOverlay"
            style={{
              fontSize: (variables[1].fontSize * textSize).toString() + "px",
              color: variables[1].textColor || "black",
              fontWeight: variables[1].bold || "400",
              WebkitAppearance: "none",
              appearance: "none",
              WebkitTextStrokeWidth: `${variables[1].outlineWidth || 0}px`,
              WebkitTextStrokeColor: variables[1].outlineColor || "black",
              textDecoration: variables[1].textDecoration || "none",
              fontStyle: variables[1].fontStyle || "normal",
              textAlign: variables[1].textAlign || "left",
              overflow: "hidden",
              padding: (variables[1].outlineWidth / 2 || 0).toString() + "px",
              lineHeight: (variables[1].fontSize * textSize).toString() + "px",
              top: (100 * (variables[1].y / 7.5)).toString() + "%",
              height: (100 * (variables[1].h / 7.5)).toString() + "%",
              left: (100 * (variables[1].x / 13.333)).toString() + "%",
              width: (100 * (variables[1].w / 13.333)).toString() + "%",
            }}
          >
            {variables[1].text}
          </p>
        );
      })}
      {Object.entries(vars.images).map((variables, indv) => {
        return (
          <div
            key={indv}
            style={{
              position: "absolute",
              top: (100 * (variables[1].y / 7.5)).toString() + "%",
              height: (100 * (variables[1].h / 7.5)).toString() + "%",
              left: (100 * (variables[1].x / 13.333)).toString() + "%",
              width: (100 * (variables[1].w / 13.333)).toString() + "%",
              alignItems: "center",
              justifyContent: "center",
              zIndex: variables[1].layer || 1,
              outline: `${variables[1].borderWidth || 0}px solid ${variables[1].borderColor || "#000000"}`,
            }}
          >
            {variables[1].src == "" || variables[1].src == undefined ? (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  padding: "0px",
                  margin: "0px",
                  backgroundImage: `url(${imageDefault})`,
                  backgroundRepeat: "repeat",
                  backgroundSize: "32px 32px",
                }}
              />
            ) : (
              <img
                className="slideImage"
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  padding: "0px",
                  margin: "0px",
                }}
                src={variables[1].src || imageDefault}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
