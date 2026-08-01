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

const SlideTab = (slides) => {
  console.log(Object.entries(slides.slides));
  return (
    <button>
      <div className="slideTab">
        {Object.entries(slides.slides).map((slideVal, ind) => {
          console.log(slideVal);
          const vars = slideVal[1][1];
          console.log(vars);
          return (
            <div key={ind} className="miniSlideTab">
              {Object.entries(vars.text).map((variables, indv) => {
                console.log(variables);
                return (
                  <p
                    key={indv}
                    style={{
                      position: "absolute",
                      top: (90 * (variables[1].y / 7.5)).toString() + "px",
                      left: (160 * (variables[1].x / 13.333)).toString() + "px",
                      fontSize: (variables[1].fontSize / 2).toString() + "px",
                    }}
                  >
                    {variables[1].text}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
    </button>
  );
};

function App() {
  const [imageUrl, updateimageUrl] = useState("");
  const [slides, updateSlides] = useState({});
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
          console.log(vars)
          updateCurrentPrefab(vars);
          updateSlides((previous) => ({
            ...previous,
            [Object.entries(slides).length]: vars.vars

          }));
          console.log(slides)
          console.log(Object.entries(slides).length)
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

  if (Object.keys(currentPrefab).length > 2) {
    return (
      <div className="container">
        <div className="editorWindow">
          <p className="headerText">This is main file</p>
          <MainPresentationDisplay vars={currentPrefab} imageUrl={imageUrl} />
          <p className="infoText">what would you like in the background?</p>
          <form onSubmit={getNewImage}>
            <input name="query" type="text" />
            <button type="submit">submit</button>
          </form>
        </div>
        <SlideTab slides={slides} />
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
        <SlideTab slides={slides} />
      </div>
    );
  }
}

export default App;
