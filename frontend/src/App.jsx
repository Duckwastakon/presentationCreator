import { useState, useEffect, useRef } from "react";
import "./styling/appStyle.css";
import { SlideTab } from "./viewComponents/tabs";
import { MainPresentationDisplay } from "./viewComponents/presentationEditor";
import { ActionPanel } from "./viewComponents/actionPanel";

function App() {
  const [slides, updateSlides] = useState({});
  const currentSlideId = useRef();
  const [currentPrefab, updateCurrentPrefab] = useState({});
  const [styleOptions, updateStyleOptions] = useState({});

  const [scrollPage, updateScrollPage] = useState(0);

  const [selectedObject, updateSelectedObject] = useState([]);

  const createNewSlideId = useRef(0);

  function changeCurrentSelectedSlide(
    slideValues,
    slideId,
    deleteCurrentSlideFunction,
    newCreatingSpot = undefined,
  ) {
    currentSlideId.current = slideId;
    createNewSlideId.current = newCreatingSpot;
    updateCurrentPrefab(slideValues);
  }

  function deleteCurrentSlide() {
    let newSlides = {};
    let i = 0;
    Object.entries(slides).map((val) => {
      if (val[0] !== currentSlideId.current.toString()) {
        newSlides = { ...newSlides, [i]: val[1] };
        i++;
      }
    });
    updateSlides(newSlides);
    updateCurrentPrefab({});
  }

  function saveSlide(newPrefab) {
    updateSlides({ ...slides, [currentSlideId.current]: newPrefab });
  }

  function getSelectedObjectsStats() {
    if (selectedObject.length <= 0) return ["", "", ""];
    return [
      selectedObject[0],
      selectedObject[1],
      currentPrefab[selectedObject[0]][selectedObject[1]],
    ];
  }

  function updateSlideObject(dataType, index, valueName, newValue) {
    let newPrefab = { ...currentPrefab };
    if (dataType === undefined) {
      newPrefab[valueName] = newValue;
    } else {
      if (index === undefined) {
        newPrefab[dataType][valueName] = newValue;
      } else {
        if (valueName === undefined) {
          newPrefab[dataType][index] = newValue;
        } else {
          newPrefab[dataType][index][valueName] = newValue;
        }
      }
    }

    updateCurrentPrefab(newPrefab);

    saveSlide(newPrefab);
  }

  const currentImages = useRef({});

  function getNewImage(e) {
    e.preventDefault();
    console.log("Hey");

    const form = e.target;
    const formData = new FormData(form);
    const query = formData.get("query");

    let found = false;

    const savedImages = Object.entries(currentImages.current);

    if (savedImages.length > 0) {
      console.log(savedImages);
      savedImages.map((entry) => {
        if (entry[0] === query) {
          found = true;
          let currentImageId;
          if (selectedObject[0] != undefined) {
            currentImageId =
              currentPrefab[selectedObject[0]][selectedObject[1]]["src"];
          } else {
            currentImageId = currentPrefab["backgroundImageUrl"];
          }
          console.log(entry[0]);
          let i = 0;
          for (const img of entry[1]) {
            if (img.src.original === currentImageId) {
              console.log("setTrue");
              console.log(currentImageId);
              console.log(i);

              if (i + 1 >= entry[1].length) break;

              if (selectedObject.length > 0) {
                updateSlideObject(
                  selectedObject[0],
                  selectedObject[1],
                  selectedObject[2],
                  entry[1][i + 1].src.original,
                );
              } else {
                updateSlideObject(
                  undefined,
                  undefined,
                  "backgroundImageUrl",
                  entry[1][i + 1].src.original,
                );
              }

              return;
            }

            i += 1;
          }

          console.log("cant find next image");
          console.log(entry);

          console.log(savedImages);
          if (selectedObject.length > 0) {
            updateSlideObject(
              selectedObject[0],
              selectedObject[1],
              selectedObject[2],
              entry[1][0].src.original,
            );
          } else {
            updateSlideObject(
              undefined,
              undefined,
              "backgroundImageUrl",
              entry[1][0].src.original,
            );
          }
        }
      });
    }

    if (!found) {
      fetchImage(query);
    }
  }

  function fetchImage(query) {
    fetch(`/API?query=${query}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("gettingNewPhotos");
        console.log(data);

        currentImages.current = {
          ...currentImages.current,
          [query]: shuffleArray(data),
        };
        var gottenRandNum = Math.floor(Math.random() * 4);
        console.log(gottenRandNum, data[gottenRandNum]);

        if (selectedObject.length > 0) {
          console.log("has");
          updateSlideObject(
            selectedObject[0],
            selectedObject[1],
            selectedObject[2],
            data[gottenRandNum].src.original,
          );
        } else {
          updateSlideObject(
            undefined,
            undefined,
            "backgroundImageUrl",
            data[gottenRandNum].src.original,
          );
        }
      });
  }

  function shuffleArray(arr) {
    for (let i = 0; i < arr.length * 3; i++) {
      const varPos1 = Math.floor(Math.random() * arr.length);
      const varPos2 = Math.floor(Math.random() * arr.length);
      const val1 = arr[varPos1];

      arr[varPos1] = arr[varPos2];
      arr[varPos2] = val1;
    }

    console.log(arr);
    return arr;
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

  function newSlide(slideValues) {
    console.log(slideValues);
    console.log(createNewSlideId.current);
    currentSlideId.current = createNewSlideId.current;
    let allSlides = {};
    let createNew = false;

    if (Object.entries(slides).length > 0) {
      Object.entries(slides).map((slide, i) => {
        console.log(i);
        if (i == createNewSlideId.current) {
          createNew = true
          allSlides = { ...allSlides, [i]: { ...slideValues } };
          console.log(allSlides);
        }
        allSlides = { ...allSlides, [Object.entries(allSlides).length]: slide[1] };
      });
    } else {
      createNew = true
      allSlides = { [0]: { ...slideValues } };
    }

    if (!createNew) {
      allSlides = { ...allSlides, [createNewSlideId.current]: { ...slideValues } };
    }
    createNewSlideId.current = undefined
    updateSlides(allSlides);
  }

  const MiniDisplay = ({ vars, ind }) => {
    return (
      <button
        key={ind}
        onClick={() => {
          const slideClone = structuredClone(vars);
          updateCurrentPrefab(slideClone);
          console.log(slideClone);
          newSlide(slideClone);
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
          <ActionPanel
            selectedObject={getSelectedObjectsStats()}
            getNewImage={getNewImage}
            updateObject={updateSlideObject}
          />
        </div>
        <SlideTab
          slides={slides}
          onClick={changeCurrentSelectedSlide}
          currentSelected={currentSlideId}
          deleteCurrentSlideFunction={deleteCurrentSlide}
          nextNewSlideSpot={createNewSlideId}
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
          deleteCurrentSlideFunction={deleteCurrentSlide}
          nextNewSlideSpot={createNewSlideId}
        />
      </div>
    );
  }
}

export default App;
