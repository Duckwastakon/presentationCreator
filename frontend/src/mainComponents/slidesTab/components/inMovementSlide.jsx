import { useState } from "react";
import imageDefault from "../images/defaultImage.png"

export const MovingSlide = ({ slideComponents }) => {
  const vars = slideComponents;
  let shadowColor = "black";

  const [textSize] = useState((160 / 1920) * 2);

  return (
    <div
      style={{
        boxShadow: `0px 0px 10px ${shadowColor}`,
        backgroundImage: `url(${vars.backgroundImageUrl})`,
        backgroundColor: vars.backgroundColor || "#ffffff",
      }}
      className="miniSlideTab"
    >
      {Object.entries(vars.text).map((variables, indv) => (
        <p
          key={indv}
          className="textOverlay"
          style={{
            fontSize: (variables[1].fontSize * textSize).toString() + "px",
            color: variables[1].textColor || "black",
            fontWeight: variables[1].bold || "400",
            WebkitAppearance: "none",
            appearance: "none",
            WebkitTextStrokeWidth: `${(variables[1].outlineWidth * textSize) / 2 || 0}px`,
            WebkitTextStrokeColor: variables[1].outlineColor || "black",
            textDecoration: variables[1].textDecoration || "none",
            fontStyle: variables[1].fontStyle || "normal",
            textAlign: variables[1].textAlign || "left",
            overflow: "hidden",
            padding:
              ((variables[1].outlineWidth * textSize) / 4 || 0).toString() +
              "px",
            lineHeight: (variables[1].fontSize * textSize).toString() + "px",
            top: (100 * (variables[1].y / 7.5)).toString() + "%",
            height: (100 * (variables[1].h / 7.5)).toString() + "%",
            left: (100 * (variables[1].x / 13.333)).toString() + "%",
            width: (100 * (variables[1].w / 13.333)).toString() + "%",
          }}
        >
          {variables[1].text}
        </p>
      ))}
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
              outline: `${(variables[1].borderWidth * textSize) / 2 || 0}px solid ${variables[1].borderColor || "#000000"}`,
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
