export const MainPresentationDisplay = ({vars, ind, updateObject, setUpdateObject}) => {
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
    </div>
  );
};
