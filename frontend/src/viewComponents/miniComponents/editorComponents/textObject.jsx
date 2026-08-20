import { LeftClickSettings } from "./leftClickSettings";
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
  deleteObject,
  duplicateObject,
}) => {
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
        zIndex: variables[1].layer || 1,
      }}
      key={ind}
    >
      <input
        type="text"
        value={variables[1].text}
        onChange={(newVal) => {
          updateObject("text", variables[0], "text", newVal.target.value);

          let newVars = structuredClone(variables)
          newVars[1].text = newVal.target.value
          setSelectedObjectsVariables(newVars)
        }}
        onSelect={() => {
          updateSelectedObject(["text", variables[0], undefined]);
          setSelectedObjectsVariables(structuredClone(variables));
          setSelectedObject(["text", variables[0]]);
        }}
        className="presentationTextEditBox"
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          fontSize: (variables[1].fontSize * 2.5).toString() + "px",
          color: variables[1].textColor || "black",
          fontWeight: variables[1].bold || "400",
          WebkitTextStrokeWidth: `${variables[1].outlineWidth}px`,
          WebkitTextStrokeColor: variables[1].outlineColor || "black",
          textDecoration: variables[1].textDecoration || "none",
          fontStyle: variables[1].fontStyle || "normal",
          textAlign: variables[1].textAlign || "left",
        }}
      />
      {selected && (
        <LeftClickSettings
          deleteObject={deleteObject}
          duplicateObject={duplicateObject}
          posX={variables[1].w}
          objectIndex={ind}
          objectData={variables}
        />
      )}
      {selected && (
        <ResizeDots
          startResizing={startResizing}
          stopResizing={stopResizing}
          objectSize={[variables[1].w, variables[1].h]}
        />
      )}
    </div>
  );
};
