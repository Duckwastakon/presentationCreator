import { useEffect, useRef, useState } from "react";
import whiteDot from "../images/whiteDot.png";

export const ResizeDots = ({ startResizing, stopResizing, objectSize }) => {
  const slideSizeRef = useRef(null)
  
  const [yResizePos, updateY] = useState(0)
  const [xResizePos, updateX] = useState(0)

  useEffect(()=> {
    updateY((slideSizeRef.current.parentElement.parentElement.getBoundingClientRect().height / 7.5) * (objectSize[1] / 2) - 7.5)
    updateX((slideSizeRef.current.parentElement.parentElement.getBoundingClientRect().width / 13.333) * (objectSize[0] / 2) - 7.5)
  }, [objectSize])

  return (
    <div ref={slideSizeRef} style={{ width: "100%", height: "100%" }}>
      <button
        className="moveObjectArea"
        onPointerDown={(event) => {
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
        onPointerDown={(event) => {
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
        onPointerDown={(event) => {
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
        onPointerDown={(event) => {
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
        onPointerUp={() => stopResizing()}
        onPointerDown={(event) => {
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
        onPointerDown={(event) => {
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
        onPointerDown={(event) => {
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
        onPointerDown={(event) => {
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
        onPointerDown={(event) => {
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
        onPointerDown={(event) => {
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
        onPointerDown={(event) => {
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
        onPointerDown={(event) => {
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
