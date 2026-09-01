import cross from "./delete.png";

export const MiniSlideDisplay = ({
  slideVal,
  ind,
  onClick,
  currentSelected,
  toggleModal,
  startMovingSlide,
}) => {
  const vars = slideVal[1];
  const selected = Number(slideVal[0]) === currentSelected.current;
  let shadowColor;
  if (selected) {
    shadowColor = "cyan";
  } else {
    shadowColor = "grey";
  }

  return (
    <div
      style={{
        boxShadow: `0px 0px 10px ${shadowColor}`,
        backgroundImage: `url(${vars.backgroundImageUrl})`,
        backgroundColor: vars.backgroundColor,
      }}
      className="miniSlideTab"
    >
      <button
        className="selectSlideButton"
        onMouseUp={() => {
          if (!selected) {
            onClick(slideVal[1], ind);
          }
        }}
        onMouseDown={(event) => {
          if (selected) {
            startMovingSlide(event, slideVal[1], slideVal[0]);
          }
        }}
      />

      {Number(slideVal[0]) === currentSelected.current && (
        <button
          className="deleteSlideButton"
          onMouseUp={() => {
            toggleModal();
          }}
        >
          <img
            src={cross}
            style={{
              width: "100%",
              aspectRatio: 1,
            }}
          />
        </button>
      )}
      {Object.entries(vars.text).map((variables, indv) => {
        const outlineWidth = variables[1].outlineWidth || 0;
        const outlineColor = variables[1].outlineColor || "black";

        return (
          <p
            key={indv}
            style={{
              display: "flex",
              position: "absolute",
              top: (100 * (variables[1].y / 7.5)).toString() + "%",
              height: (100 * (variables[1].h / 7.5)).toString() + "%",
              left: (100 * (variables[1].x / 13.333)).toString() + "%",
              width: (100 * (variables[1].w / 13.333)).toString() + "%",
              fontSize: (variables[1].fontSize / 2).toString() + "px",
              color: variables[1].textColor || "black",
              fontWeight: variables[1].bold || "400",
              textShadow: `${outlineWidth}px ${outlineWidth}px 0px ${outlineColor},
                      ${-outlineWidth}px ${-outlineWidth}px 0px ${outlineColor},
                      ${outlineWidth}px ${-outlineWidth}px 0px ${outlineColor},
                      ${-outlineWidth}px ${outlineWidth}px 0px ${outlineColor}`,
              textDecoration: variables[1].textDecoration || "none",
              fontStyle: variables[1].fontStyle || "normal",
              textAlign: variables[1].textAlign || "left",
              alignItems: "center",
              overflow: "hidden",
              textWrap: "nowrap",
            }}
          >
            {variables[1].text}
          </p>
        );
      })}
      {Object.entries(vars.images).map((variables, indv) => {
        return (
          <img
            key={indv}
            className="slideImage"
            style={{
              position: "absolute",
              top: (100 * (variables[1].y / 7.5)).toString() + "%",
              height: (100 * (variables[1].h / 7.5)).toString() + "%",
              left: (100 * (variables[1].x / 13.333)).toString() + "%",
              width: (100 * (variables[1].w / 13.333)).toString() + "%",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              border: `solid ${variables[1].borderColor || "#000000"} ${variables[1].borderWidth || 0}px`,
              borderRadius: (variables[1].cornerRadius || 0).toString() + "px",
            }}
            src={variables[1].src}
          />
        );
      })}
    </div>
  );
};
