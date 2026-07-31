import { useState, useEffect } from "react";
import "./styling/appStyle.css";

const MainPresentationDisplay = (vars, ind) => {
  console.log(vars.vars.vars[1].text);

  return (
  <div
    className="presentationBackground"
    style={{ backgroundImage: `url(${vars.imageUrl})` }}
    key={ind}
  >
    {Object.entries(vars.vars.vars[1].text).map((variables, indv) => {
      console.log(variables[1]);
      return (
      <p
        key={indv}
        style={{
          position: "absolute",
          top: (450 * (variables[1].y / 7.5)).toString() + "px",
          left: (800 * (variables[1].x / 13.333)).toString() + "px",
          fontSize: (variables[1].fontSize*2.5).toString() + "px",
        }}
      >
        {variables[1].text}
      </p>)
})}
  </div>)
};

function App() {
  const [imageUrl, updateimageUrl] = useState("");
  const [currentSlide, updateCurrentSlide] = useState(0);

  const [currentPrefab, updateCurrentPrefab] = useState({});
  const [styleOptions, updateStyleOptions] = useState({});

  function getNewImage(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const query = formData.get("query");

    fetchImage(query);
  }

  function fetchImage(query) {
    fetch(`/API?query=${query}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        updateimageUrl(data);
      });
  }

  function fetchStyles(type) {
    fetch(`/styles?type=${type}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        updateStyleOptions(data);
        console.log(data);
      });
  }

  const MiniDisplay = (vars, ind) => {
    console.log(vars.vars[1].text);
    return (
      <button
      key={ind}
        onClick={() => {
          updateCurrentPrefab(vars);
          console.log(currentPrefab);
        }}
      >
        <div className="miniPresentation">
          {Object.entries(vars.vars[1].text).map((variables, indv) => (
            <p
              key={indv}
              style={{
                position: "absolute",
                top: (180 * (variables[1].y / 7.5)).toString() + "px",
                left: (320 * (variables[1].x / 13.333)).toString() + "px",
                fontSize: variables[1].fontSize.toString() + "px",
              }}
            >
              {variables[1].text}
            </p>
          ))}
        </div>
      </button>
    );
  };

  useEffect(() => {
    fetchStyles("intro");
  }, []);

  if (Object.keys(currentPrefab).length > 0) {
    return (
      <div className="container">
        <p className="headerText">This is main file</p>
        <MainPresentationDisplay vars={currentPrefab} imageUrl={imageUrl} />
        <p className="infoText">what would you like in the background?</p>
        <form onSubmit={getNewImage}>
          <input name="query" type="text" />
          <button type="submit">submit</button>
        </form>
        <div>
          <button onClick={() => updateCurrentSlide(currentSlide - 1)}>
            Back
          </button>
          <button onClick={() => updateCurrentSlide(currentSlide + 1)}>
            Next
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="styleChoiceContainer">
          {Object.entries(styleOptions).map((vars, index) => (
            <MiniDisplay key={index} vars={vars} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
