import { useState } from "react";
import deleteIcon from "./trashcan.png";
import activeDeleteIcon from "./trashcanOpen.png";

export const LeftClickSettings = ({
  deleteObject,
  duplicateObject,
  posX,
  objectIndex,
  objectData
}) => {
  const [hoverSrc, updateSrc] = useState(deleteIcon);
  return (
    <div
      style={{
        position: "absolute",
        bottom: "-75px",
        left: `${(800 / 13.333) * (posX / 2) - 56}px`,
      }}
      className="extraButtonContainer"
    >
      <button
        className="choiceButton"
        onMouseLeave={() => updateSrc(deleteIcon)}
        onMouseEnter={() => updateSrc(activeDeleteIcon)}
        onMouseDown={() => deleteObject("text", objectIndex)}
      >
        <img src={hoverSrc} style={{ width: "16px", height: "16px" }} />
      </button>
      <button
        className="choiceButton"
        onMouseDown={() => duplicateObject("text", objectData)}
      >
        Dup
      </button>
    </div>
  );
};
