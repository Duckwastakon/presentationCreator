import { useEffect, useRef, useState } from "react";

export const MiniDisplayText = ({ variables, indv }) => {
  const objectElement = useRef(null);
  const [textSize, updateTextSize] = useState(24);

  useEffect(() => {
    function setTextSize() {
      let parentElement = objectElement.current.parentElement;
      updateTextSize(
        variables[1].fontSize *
          (parentElement.getBoundingClientRect().width / 1920) *
          2,
      );
    }

    setTextSize();

    window.addEventListener("resize", setTextSize);
  }, variables);

  return (
    <p
      ref={objectElement}
      key={indv}
      style={{
        position: "absolute",
        top: (100 * (variables[1].y / 7.5)).toString() + "%",
        left: (100 * (variables[1].x / 13.333)).toString() + "%",
        height: (100 * (variables[1].h / 7.5)).toString() + "%",
        width: (100 * (variables[1].w / 13.333)).toString() + "%",
        fontSize: textSize.toString() + "px",
        textAlign: variables[1].textAlign || "left",
        overflow: "hidden",
      }}
    >
      {variables[1].text}
    </p>
  );
};
