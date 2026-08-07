import { useState, useEffect } from "react";
import "./styling/appStyle.css";
import { SlideTab } from "./viewComponents/tabs";
import { MainPresentationDisplay } from "./viewComponents/presentationEditor";
import { ActionPanel } from "./viewComponents/actionPanel";

function App() {
  const [slides, updateSlides] = useState({});
  const [currentSlideId, updateCurrenSlideId] = useState();
  const [currentPrefab, updateCurrentPrefab] = useState({});
  const [styleOptions, updateStyleOptions] = useState({});

  const [scrollPage, updateScrollPage] = useState(0);

  const [selectedObject, updateSelectedObject] = useState([]);

  function changeCurrentSelectedSlide(slideValues, slideId) {
    updateCurrentPrefab(slideValues);
    updateCurrenSlideId(slideId);
  }

  function deleteCurrentSlide() {
    let newSlides = {};
    let i = 0;
    Object.entries(slides).map((val) => {
      if (val[0] !== currentSlideId.toString()) {
        newSlides = { ...newSlides, [i]: val[1] };
        i++;
      }
    });
    updateSlides(newSlides);
    updateCurrentPrefab({});
  }

  function saveSlide(newPrefab) {
    console.log("saved slide data ", currentPrefab);
    updateSlides({ ...slides, [currentSlideId]: newPrefab });
  }

  function getSelectedObjectsStats(){
    if(selectedObject.length <= 0) return ["", "", ""]
    return [selectedObject[0], selectedObject[1], currentPrefab[selectedObject[0]][selectedObject[1]]]
  }

  function updateSlideObject(dataType, index, valueName, newValue) {
    let newPrefab = { ...currentPrefab };
    if (dataType === undefined) {
      newPrefab[valueName] = newValue;
    } else {
      if(index === undefined){
        newPrefab[dataType][valueName] = newValue
      }else{
        if(valueName === undefined) {
          newPrefab[dataType][index] = newValue
        }else{
          newPrefab[dataType][index][valueName] = newValue;
        }
      }
    }

    updateCurrentPrefab(newPrefab);

    saveSlide(newPrefab);
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
        if (selectedObject.length > 0) {
          console.log("has");
          updateSlideObject(
            selectedObject[0],
            selectedObject[1],
            selectedObject[2],
            data,
          );
        } else {
          console.log("change background");
          updateSlideObject(undefined, undefined, "backgroundImageUrl", data);
        }
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

  function changePage(allObj, objPerPage, newPageVal, changeFunc) {
    const possiblePages = Math.ceil(allObj / objPerPage);
    if (newPageVal > possiblePages) {
      newPageVal = 0;
    }
    if (newPageVal < 0) {
      newPageVal = possiblePages;
    }

    changeFunc(newPageVal);
  }

  const MiniDisplay = ({ vars, ind }) => {
    return (
      <button
        key={ind}
        onClick={() => {
          const slideClone = structuredClone(vars);
          updateCurrentPrefab(slideClone);
          updateCurrenSlideId(Object.entries(slides).length);
          updateSlides((previous) => ({
            ...previous,
            [Object.entries(slides).length]: slideClone,
          }));
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
                height: (180 * (variables[1].h / 7.5)).toString() + "px",
                width: (320 * (variables[1].w / 13.333)).toString() + "px",
                fontSize: variables[1].fontSize.toString() + "px",
                textAlign: "left",
                overflow: "hidden",
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
            updateSelectedObject={updateSelectedObject}
          />
          <ActionPanel selectedObject={getSelectedObjectsStats()} getNewImage={getNewImage} updateObject={updateSlideObject}/>
        </div>
        <SlideTab
          slides={slides}
          onClick={changeCurrentSelectedSlide}
          currentSelected={currentSlideId}
        />
      </div>
    );
  } else {
    let possibleStyles = {};
    for (let i = 0; i < 4; i++) {
      if (styleOptions[i + scrollPage * 4] != null) {
        possibleStyles = {
          ...possibleStyles,
          [i]: styleOptions[i + scrollPage * 4],
        };
      }
    }
    return (
      <div className="container">
        <button
          onClick={() => {
            changePage(
              Object.entries(possibleStyles).length,
              4,
              scrollPage - 1,
              updateScrollPage,
            );
          }}
          style={{ left: "15px" }}
          className="changePageButton"
        >
          back
        </button>
        <div className="styleChoiceContainer">
          {Object.entries(possibleStyles).map((vars, index) => (
            <MiniDisplay key={index} vars={vars[1]} />
          ))}
        </div>
        <button
          onClick={() => {
            changePage(
              Object.entries(possibleStyles).length,
              4,
              scrollPage + 1,
              updateScrollPage,
            );
          }}
          style={{ right: "15px" }}
          className="changePageButton"
        >
          next
        </button>
        <SlideTab
          slides={slides}
          onClick={changeCurrentSelectedSlide}
          currentSelected={currentSlideId}
        />
      </div>
    );
  }
}

export default App;
