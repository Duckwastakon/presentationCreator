export const SlideTab = ({
  slides,
  onClick,
  currentSelected,
  nextNewSlideSpot,
}) => {
  console.log(currentSelected);
  console.log(currentSelected.current);
  return (
    <div className="slideTab">
      {Object.keys(slides).length > 0 &&
        (nextNewSlideSpot.current == 0 ? (
          <button
            onClick={() => {
              onClick({}, undefined, 0);
            }}
            className="newSlideButton"
            style={{ backgroundColor: "blue" }}
          >
            <p className="newSlideButtonText">+</p>
          </button>
        ) : (
          <button
            onClick={() => {
              onClick({}, undefined, 0);
            }}
            className="newSlideButton"
          >
            <p className="newSlideButtonText">+</p>
          </button>
        ))}

      {Object.keys(slides).length > 0 &&
        Object.entries(slides).map((slideVal, ind) => {
          const vars = slideVal[1];

          return (
            <div
              key={ind}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {Number(slideVal[0]) === nextNewSlideSpot.current &&
                nextNewSlideSpot.current !== 0 && (
                  <button
                    style={{ marginRight: "12px", backgroundColor: "blue" }}
                    onClick={() => {
                      onClick({}, undefined, currentSelected.current);
                    }}
                    className="newSlideButton"
                  >
                    <p className="newSlideButtonText">+</p>
                  </button>
                )}
              {Number(slideVal[0]) === currentSelected.current &&
                currentSelected.current !== 0 && (
                  <button
                    style={{ marginRight: "12px" }}
                    onClick={() => {
                      onClick({}, undefined, currentSelected.current);
                    }}
                    className="newSlideButton"
                  >
                    <p className="newSlideButtonText">+</p>
                  </button>
                )}
              <button
                style={{
                  backgroundImage: `url(${vars.backgroundImageUrl})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                onClick={() => {
                  console.log(slideVal);
                  onClick(slideVal[1], ind);
                }}
              >
                <div className="miniSlideTab">
                  {Object.entries(vars.text).map((variables, indv) => (
                    <p
                      key={indv}
                      style={{
                        position: "absolute",
                        top: (90 * (variables[1].y / 7.5)).toString() + "px",
                        left:
                          (160 * (variables[1].x / 13.333)).toString() + "px",
                        height: (90 * (variables[1].h / 7.5)).toString() + "px",
                        width:
                          (160 * (variables[1].w / 13.333)).toString() + "px",
                        fontSize: (variables[1].fontSize / 2).toString() + "px",
                        textAlign: "left",
                        overflow: "hidden",
                      }}
                    >
                      {variables[1].text}
                    </p>
                  ))}
                </div>
              </button>
              {Number(slideVal[0]) === currentSelected.current &&
                currentSelected.current !==
                  Object.entries(slides).length - 1 && (
                  <button
                    style={{ marginLeft: "12px" }}
                    onClick={() => {
                      onClick({}, undefined, currentSelected.current + 1);
                    }}
                    className="newSlideButton"
                  >
                    <p className="newSlideButtonText">+</p>
                  </button>
                )}
            </div>
          );
        })}
      {nextNewSlideSpot.current === Object.keys(slides).length ? (
        <button
          onClick={() => {
            onClick({}, undefined, Object.keys(slides).length);
          }}
          className="newSlideButton"
          style={{ backgroundColor: "blue" }}
        >
          <p className="newSlideButtonText">+</p>
        </button>
      ) : (
        <button
          onClick={() => {
            onClick({}, undefined, Object.keys(slides).length);
          }}
          className="newSlideButton"
        >
          <p className="newSlideButtonText">+</p>
        </button>
      )}
    </div>
  );
};
