import whiteDot from "./whiteDot.png";

export const ResizeDots = ({ startResizing, stopResizing, objectSize }) => {
  const yResizePos = (450 / 7.5) * (objectSize[1] / 2) - 7.5;
  const xResizePos = (800 / 13.333) * (objectSize[0] / 2) - 7.5;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <button
        className="moveObjectArea"
        onMouseDown={(event) => {
          startResizing(event, 9);
        }}
        style={{
          position: "absolute",
          width: "100%",
          height: "15px",
          top: "-15px",
          left: "0",
        }}
      />
      <button
        className="moveObjectArea"
        onMouseDown={(event) => {
          startResizing(event, 9);
        }}
        style={{
          position: "absolute",
          width: "100%",
          height: "15px",
          bottom: "-15px",
          left: "0",
        }}
      />
      <button
        className="moveObjectArea"
        onMouseDown={(event) => {
          startResizing(event, 9);
        }}
        style={{
          position: "absolute",
          width: "15px",
          height: "100%",
          top: "0",
          left: "-15px",
        }}
      />
      <button
        className="moveObjectArea"
        onMouseDown={(event) => {
          startResizing(event, 9);
        }}
        style={{
          position: "absolute",
          width: "15px",
          height: "100%",
          top: "0",
          right: "-15px",
        }}
      />

      <button
        onMouseUp={() => stopResizing()}
        onMouseDown={(event) => {
          startResizing(event, 1);
        }}
        className="diagonal1"
        style={{
          position: "absolute",
          width: "15px",
          height: "15px",
          top: "-15px",
          left: "-15px",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "none",
        }}
      >
        <img
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
          src={whiteDot}
        />
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
        />
      </button>

      <button
        className="diagonal2"
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
          background: "transparent",
          border: "none",
        }}
      >
        <img
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
          src={whiteDot}
        />
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
        />
      </button>
      <button
        onMouseDown={(event) => {
          startResizing(event, 3);
        }}
        className="diagonal2"
        style={{
          position: "absolute",
          width: "15px",
          height: "15px",
          bottom: "-15px",
          left: "-15px",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "none",
        }}
      >
        <img
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
          src={whiteDot}
        />
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
        />
      </button>
      <button
        onMouseDown={(event) => {
          startResizing(event, 4);
        }}
        className="diagonal1"
        style={{
          position: "absolute",
          width: "15px",
          height: "15px",
          bottom: "-15px",
          right: "-15px",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "none",
        }}
      >
        <img
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
          src={whiteDot}
        />
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
        />
      </button>
      <button
        onMouseDown={(event) => {
          startResizing(event, 5);
        }}
        className="vertical"
        style={{
          position: "absolute",
          width: "15px",
          height: "15px",
          top: "-15px",
          right: xResizePos,
          marginLeft: "15px",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "none",
        }}
      >
        <img
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
          src={whiteDot}
        />
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
        />
      </button>
      <button
        onMouseDown={(event) => {
          startResizing(event, 6);
        }}
        className="horizontal"
        style={{
          position: "absolute",
          width: "15px",
          height: "15px",
          top: yResizePos,
          right: "-15px",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "none",
        }}
      >
        <img
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
          src={whiteDot}
        />
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
        />
      </button>
      <button
        className="vertical"
        onMouseDown={(event) => {
          startResizing(event, 7);
        }}
        style={{
          position: "absolute",
          width: "15px",
          height: "15px",
          bottom: "-15px",
          right: xResizePos,
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "none",
        }}
      >
        <img
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
          src={whiteDot}
        />
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
        />
      </button>
      <button
      className="horizontal"
        onMouseDown={(event) => {
          startResizing(event, 8);
        }}
        style={{
          position: "absolute",
          width: "15px",
          height: "15px",
          top: yResizePos,
          left: "-15px",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "none",
        }}
      >
        <img
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
          src={whiteDot}
        />
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
        />
      </button>
    </div>
  );
};
