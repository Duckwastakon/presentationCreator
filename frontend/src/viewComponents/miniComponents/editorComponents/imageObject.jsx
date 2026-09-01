import { ResizeDots } from "./resizeDots";
import imageDefault from "./imagePrefab.png"

export const ImageObject = ({
  startResizing,
  stopResizing,
  variables,
  ind,
  updateSelectedObject,
  setSelectedObjectsVariables,
  setSelectedObject,
  selected,
}) => {
  return (
    <div
      key={ind}
      style={{
        position: "absolute",
        top: (100 * (variables[1].y / 7.5)).toString() + "%",
        height: (100 * (variables[1].h / 7.5)).toString() + "%",
        left: (100 * (variables[1].x / 13.333)).toString() + "%",
        width: (100 * (variables[1].w / 13.333)).toString() + "%",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        zIndex: (variables[1].layer || 1)
      }}
    >
      <img
        className="slideImage"
        style={{
          outline: `${variables[1].borderWidth || 0}px solid ${variables[1].borderColor || "#000000"}`,
          
          borderRadius: (variables[1].cornerRadius || 0).toString() + "px",

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

      <button
        className="imageButton"
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "absolute",
          top: "0px"
        }}
        onMouseDown={() => {
          console.log(variables)
          if (!selected) {
            updateSelectedObject(["images", variables[0], "src"]);
            setSelectedObjectsVariables(structuredClone(variables));
            setSelectedObject(["images", variables[0]]);
          }
        }}
      />

      {selected && (
        <ResizeDots startResizing={startResizing} stopResizing={stopResizing} objectSize={[variables[1].w, variables[1].h]}/>
      )}
    </div>
  );
};
