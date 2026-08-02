import { useState, useEffect } from "react";
import "./styling/appStyle.css";
import { SlideTab } from "./viewComponents/tabs";
import { MainPresentationDisplay } from "./viewComponents/presentation";

function App() {
  const [slides, updateSlides] = useState({});
  const [currentSlideId, updateCurrenSlideId] = useState();
  const [currentPrefab, updateCurrentPrefab] = useState({});
  const [styleOptions, updateStyleOptions] = useState({});

  function changeCurrentSelectedSlide(slideValues, slideId) {
    updateCurrentPrefab(slideValues);
    updateCurrenSlideId(slideId);
  }

  function deleteCurrentSlide() {
    let newSlides = {}
    let i = 0
    Object.entries(slides).map((val) =>{
      if(val[0] !== currentSlideId.toString()){
        newSlides = {...newSlides, [i]: val[1]}
        i++;
      }
    })
    console.log(newSlides)
    
    updateSlides(newSlides)
    updateCurrentPrefab({})
  }

  function saveSlide(){
    updateSlides({...slides, currentSlideId: currentPrefab})
  }

  function updateSlideObject(dataType, index, valueName, newValue) {
    let newPrefab = { ...currentPrefab };

    if (dataType == null) {
      newPrefab[valueName] = newValue;
      updateCurrentPrefab(newPrefab);
    } else {
      newPrefab[dataType][index][valueName] = newValue;
      updateCurrentPrefab(newPrefab);
      console.log(newPrefab);
    }
  }

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
        updateSlideObject(null, null, "backgroundImageUrl", data);
      });
  }

  function fetchStyles(type) {
    fetch(`/styles?type=${type}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        updateStyleOptions(data);
      });
  }

  const MiniDisplay = ({ vars, ind }) => {
    console.log(vars);
    return (
      <button
        key={ind}
        onClick={() => {
          console.log(vars);
          updateCurrentPrefab(vars);
          updateCurrenSlideId(Object.entries(slides).length);
          updateSlides((previous) => ({
            ...previous,
            [Object.entries(slides).length]: vars,
          }));
          console.log(slides);
          console.log(Object.entries(slides).length);
        }}
      >
        <div className="miniPresentation">
          {Object.entries(vars.text).map((variables, indv) => (
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
        <div className="editorWindow">
          <p className="headerText">This is main file</p>
          <MainPresentationDisplay
            vars={currentPrefab}
            updateObject={updateSlideObject}
          />
          <p className="infoText">what would you like in the background?</p>
          <form className="formStyling" onSubmit={getNewImage}>
            <input className="imageInputField" name="query" type="text" />
            <button className="inputSubmitButton" type="submit">
              submit
            </button>
          </form>
        </div>
        <SlideTab slides={slides} onClick={changeCurrentSelectedSlide} />
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="styleChoiceContainer">
          {Object.entries(styleOptions).map((vars, index) => (
            <MiniDisplay key={index} vars={vars[1]} />
          ))}
        </div>
        <SlideTab slides={slides} onClick={changeCurrentSelectedSlide} />
      </div>
    );
  }
}

export default App;
