import whiteDot from "./a.png";

export const ResizeDots = ({startResizing, stopResizing}) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <button
        onMouseUp={() => stopResizing()}
        onMouseDown={(event) => {
          startResizing(event, 1);
        }}
        style={{
          position: "absolute",
          width: "15px",
          height: "15px",
          top: "-15px",
          left: "-15px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{ width: "100%", height: "100%" }}
          src={whiteDot}
        />
      </button>

      <button
        onMouseDown={(event) => {
          startResizing(event, 2);
        }}
        style={{
          position: "absolute",
          width: "15px",
          height: "15px",
          top: "-15px",
          right: "-15px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{ width: "100%", height: "100%" }}
          src={whiteDot}
        />
      </button>
      <button
        onMouseDown={(event) => {
          startResizing(event, 3);
        }}
        style={{
          position: "absolute",
          width: "15px",
          height: "15px",
          bottom: "-15px",
          left: "-15px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{ width: "100%", height: "100%" }}
          src={whiteDot}
        />
      </button>
      <button
        onMouseDown={(event) => {
          startResizing(event, 4);
        }}
        style={{
          position: "absolute",
          width: "15px",
          height: "15px",
          bottom: "-15px",
          right: "-15px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{ width: "100%", height: "100%" }}
          src={whiteDot}
        />
      </button>
    </div>
  );
};
