import "./tabComponentStyling.css";

export const MiniSlideDisplay = ({
  slideVal,
  ind,
  onClick,
  currentSelected,
  toggleModal,
}) => {
  const vars = slideVal[1];
  const clrCheck = Number(slideVal[0]) === currentSelected.current;
  let shadowColor;
  if (clrCheck) {
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
        onClick={() => {
          console.log(slideVal);
          onClick(slideVal[1], ind);
        }}
      />

      {Number(slideVal[0]) === currentSelected.current && (
        <button
          className="deleteSlideButton"
          onMouseUp={() => {
            toggleModal();
          }}
        >
          <p
            style={{
              width: "100%",
              height: "100%",
              color: "red",
              textAlign: "center",
            }}
          >
            -
          </p>
        </button>
      )}
      {Object.entries(vars.text).map((variables, indv) => (
        <p
          key={indv}
          style={{
            position: "absolute",
            top: (90 * (variables[1].y / 7.5)).toString() + "px",
            left: (160 * (variables[1].x / 13.333)).toString() + "px",
            height: (90 * (variables[1].h / 7.5)).toString() + "px",
            width: (160 * (variables[1].w / 13.333)).toString() + "px",
            fontSize: (variables[1].fontSize / 2).toString() + "px",
            textAlign: "left",
            overflow: "hidden",
          }}
        >
          {variables[1].text}
        </p>
      ))}
    </div>
  );
};
