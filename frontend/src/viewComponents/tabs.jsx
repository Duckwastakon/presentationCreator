export const SlideTab = ({ slides, onClick }) => {
  console.log(slides);
  return (
    <div className="slideTab">
      {Object.keys(slides).length > 0 &&
        Object.entries(slides).map((slideVal, ind) => {
          console.log(slideVal);
          const vars = slideVal[1];
          console.log(vars);
          return (
            <button
              onClick={() => {
                console.log(slideVal);
                onClick(slideVal[1], ind);
              }}
              key={ind}
            >
              <div className="miniSlideTab">
                {Object.entries(vars.text).map((variables, indv) => {
                  console.log(variables);
                  return (
                    <p
                      key={indv}
                      style={{
                        position: "absolute",
                        top: (90 * (variables[1].y / 7.5)).toString() + "px",
                        left:
                          (160 * (variables[1].x / 13.333)).toString() + "px",
                        fontSize: (variables[1].fontSize / 2).toString() + "px",
                      }}
                    >
                      {variables[1].text}
                    </p>
                  );
                })}
              </div>
            </button>
          );
        })}
      <button
        onClick={() => {
          onClick({});
        }}
        className="newSlideButton"
      >
        <p className="newSlideButtonText">+</p>
      </button>
    </div>
  );
};
