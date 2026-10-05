import imageDefault from "../images/defaultImage.png";

export const MiniDisplayImage = ({ variables, indv }) => {
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
        outline: `${variables[1].borderWidth || 0}px solid ${variables[1].borderColor || "#000000"}`,
      }}
    >
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
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
};
