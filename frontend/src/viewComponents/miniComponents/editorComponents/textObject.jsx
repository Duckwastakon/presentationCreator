import { ResizeDots } from "./resizeDots";

export const TextObject = ({
  startResizing,
  stopResizing,
  variables,
  ind,
  updateObject,
  updateSelectedObject,
  setSelectedObjectsVariables,
  setSelectedObject,
  selected,
}) => {
  const outlineWidth = variables[1].outlineWidth || 0;
  const outlineColor = variables[1].outlineColor || "black";

  return (
    <div
      style={{
        position: "absolute",
        top: (100 * (variables[1].y / 7.5)).toString() + "%",
        height: (100 * (variables[1].h / 7.5)).toString() + "%",
        left: (100 * (variables[1].x / 13.333)).toString() + "%",
        width: (100 * (variables[1].w / 13.333)).toString() + "%",
        alignItems: "center",
        justifyContent: "center",
      }}
      key={ind}
    >
      <input
        type="text"
        value={variables[1].text}
        onChange={(newVal) =>
          updateObject("text", variables[0], "text", newVal.target.value)
        }
        onSelect={() => {
          updateSelectedObject(["text", variables[0], undefined]);
          setSelectedObjectsVariables(structuredClone(variables));
          setSelectedObject(["text", variables[0]]);
        }}
        onMouseDown={(event) => {
          startResizing(event, 9);
        }}
        className="presentationTextEditBox"
        style={{
          width: "100%",
          height: "100%",
          fontSize: (variables[1].fontSize * 2.5).toString() + "px",
          color: variables[1].textColor || "black",
          fontWeight: variables[1].bold || "400",
          textShadow: `${outlineWidth}px ${outlineWidth}px 0px ${outlineColor},
                    ${-outlineWidth}px ${-outlineWidth}px 0px ${outlineColor},
                    ${outlineWidth}px ${-outlineWidth}px 0px ${outlineColor},
                    ${-outlineWidth}px ${outlineWidth}px 0px ${outlineColor}`,
          textDecoration: variables[1].textDecoration || "none",
          fontStyle: variables[1].fontStyle || "normal",
          textAlign: variables[1].textAlign || "left",
        }}
      />
      {selected && (
        <ResizeDots startResizing={startResizing} stopResizing={stopResizing} />
      )}
    </div>
  );
};
