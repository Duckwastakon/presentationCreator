import { ResizeDots } from "./resizeDots";

export const ImageObject = ({  startResizing,
  stopResizing,
  variables,
  key,
  updateSelectedObject,
  setSelectedObjectsVariables,
  setSelectedObject,
  selected,}) => {

  return (
    <div
      key={key}
      style={{
        position: "absolute",
        top: (100 * (variables[1].y / 7.5)).toString() + "%",
        height: (100 * (variables[1].h / 7.5)).toString() + "%",
        left: (100 * (variables[1].x / 13.333)).toString() + "%",
        width: (100 * (variables[1].w / 13.333)).toString() + "%",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      }}
    >
      <button
        className="imageButton"
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
        onMouseDown={(event) => {
          if (selected) {
            startResizing(event, 9);
          } else {
            updateSelectedObject(["images", variables[0], "src"]);
            setSelectedObjectsVariables(structuredClone(variables));
            setSelectedObject(["images", variables[0]]);
          }
        }}
      >
        <img
          className="slideImage"
          style={{
            border: `solid ${variables[1].borderColor || "#000000"} ${variables[1].borderWidth || 0}px`,
            borderRadius: (variables[1].cornerRadius || 0).toString() + "px",
          }}
          src={variables[1].src}
        />
      </button>
      {selected && (
        <ResizeDots startResizing={startResizing} stopResizing={stopResizing} />
      )}
    </div>
  );
};
