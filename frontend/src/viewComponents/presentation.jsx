export const MainPresentationDisplay = ({
  vars,
  ind,
  updateObject,
  setUpdateObject,
}) => {
  console.log(vars);
  console.log(vars.text);

  return (
    <div
      className="presentationBackground"
      style={{ backgroundImage: `url(${vars.backgroundImageUrl})` }}
      key={ind}
    >
      {Object.entries(vars.text).map((variables, indv) => {
        console.log(variables[1]);
        return (
          <p
            key={indv}
            style={{
              position: "absolute",
              top: (450 * (variables[1].y / 7.5)).toString() + "px",
              left: (800 * (variables[1].x / 13.333)).toString() + "px",
              fontSize: (variables[1].fontSize * 2.5).toString() + "px",
            }}
          >
            {variables[1].text}
          </p>
        );
      })}
      {Object.entries(vars.images).map((variables, indv) => {
        console.log(variables[1]);
        return (
          <button
            key={indv}
            style={{
              position: "absolute",
              top: (450 * (variables[1].y / 7.5)).toString() + "px",
              height: (450 * (variables[1].h / 7.5)).toString() + "px",
              left: (800 * (variables[1].x / 13.333)).toString() + "px",
              width: (800 * (variables[1].w / 13.333)).toString() + "px",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }}
            onClick={() => {
              console.log(["images", variables[0], "src"]);
              setUpdateObject(["images", variables[0], "src"]);
            }}
          >
            <img
            style={{width: "100%", height: "100%"}}
             src={variables[1].src} />
          </button>
        );
      })}
    </div>
  );
};
