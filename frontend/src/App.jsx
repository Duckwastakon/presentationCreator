import { useState, useEffect, useRef } from "react";
import "./styling/appStyle.css";
import { SlideTab } from "./viewComponents/tabs";
import { MainPresentationDisplay } from "./viewComponents/presentationEditor";
import { ActionPanel } from "./viewComponents/actionPanel";
import { Modal } from "./viewComponents/modal";
import { redoChange, undoChange } from "./keyBindFunctions";
import {
  createNewSlide,
  deleteSelectedSlide,
  selectNewSlide,
  startCreatingNewSlide,
} from "./slideFunctions";
import { SlideStylePicker } from "./viewComponents/slideStylePicker";
import { createObj, delObj, dupObj, updObj } from "./objectFunctions";
import { fetchAllStyles, fetchStyles, getImage } from "./fetchFunctions";

function App() {
  const [allSlides, updateAllSlides] = useState({});
  const currentlySelectedSlideId = useRef();

  const [currentSlideVariables, updateCurrentSlideVariables] = useState({});
  const [selectedObject, updateSelectedObject] = useState([]);

  const [newSlidePrefabs, updateNewSlidePrefabs] = useState({});
  const [currentPageNumber, updatePageNumber] = useState(0);
  const [prefabTypes, updatePrefabTypes] = useState([]);
  const [selectedPrefabType, changeSelectedPrefabType] = useState("intro");

  const [modalActive, updateModal] = useState(false);

  const createNewSlideId = useRef(0);

  const usedImages = useRef({});

  function toggleModal() {
    updateModal(!modalActive);
  }

  function selectSlide(slideValues, slideId) {
    selectNewSlide(
      slideValues,
      slideId,
      updateCurrentSlideVariables,
      currentlySelectedSlideId,
      createNewSlideId,
    );
  }

  function deleteSlide() {
    deleteSelectedSlide(
      allSlides,
      updateAllSlides,
      currentlySelectedSlideId,
      createNewSlideId,
      updateCurrentSlideVariables,
    );
  }

  function saveSlide(newSlide) {
    updateAllSlides({
      ...allSlides,
      [currentlySelectedSlideId.current]: newSlide,
    });
  }

  function createSlide(newSlideVariables) {
    createNewSlide(
      newSlideVariables,
      createNewSlideId,
      currentlySelectedSlideId,
      allSlides,
      updateAllSlides,
    );
  }

  function startCreatingSlide(newSlidePosId) {
    startCreatingNewSlide(
      newSlidePosId,
      createNewSlideId,
      updateCurrentSlideVariables,
      currentlySelectedSlideId,
    );
  }

  function getSelectedObjectVariables() {
    if (selectedObject.length <= 0) return ["", "", ""];
    return [
      selectedObject[0],
      selectedObject[1],
      currentSlideVariables[selectedObject[0]][selectedObject[1]],
    ];
  }

  function deleteObject(dataType, index) {
    delObj(
      dataType,
      index,
      currentSlideVariables,
      updateCurrentSlideVariables,
      saveSlide,
    );
  }

  function duplicateObject(dataType, object) {
    dupObj(
      dataType,
      object,
      currentSlideVariables,
      updateCurrentSlideVariables,
      saveSlide,
    );
  }

  function updateObject(dataType, index, variableName, newValue) {
    updObj(
      dataType,
      index,
      variableName,
      newValue,
      currentSlideVariables,
      updateCurrentSlideVariables,
      saveSlide,
    );
  }

  function createObject(type, size = 24) {
    const [newInd, newObj] = createObj(
      type,
      size,
      currentSlideVariables,
      updateCurrentSlideVariables,
      saveSlide,
    );

    updateObject(type, newInd, undefined, newObj);
  }

  function getNewImage(event) {
    getImage(
      event,
      usedImages,
      selectedObject,
      currentSlideVariables,
      updateObject,
    );
  }

  useEffect(() => {
    fetchAllStyles(updatePrefabTypes);
    fetchStyles("intro", updateNewSlidePrefabs);
    function handleKeyCombo(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
        console.log("undo");
        undoChange(
          updateAllSlides,
          currentlySelectedSlideId,
          updateCurrentSlideVariables,
          updateSelectedObject,
          updateNewSlidePrefabs,
          updatePageNumber,
          updateModal,
          createNewSlideId,
        );
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "y") {
        console.log("redo");
        redoChange(
          updateAllSlides,
          currentlySelectedSlideId,
          updateCurrentSlideVariables,
          updateSelectedObject,
          updateNewSlidePrefabs,
          updatePageNumber,
          updateModal,
          createNewSlideId,
        );
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "c") {
        console.log("undo");
        undoChange(
          updateAllSlides,
          currentlySelectedSlideId,
          updateCurrentSlideVariables,
          updateSelectedObject,
          updateNewSlidePrefabs,
          updatePageNumber,
          updateModal,
          createNewSlideId,
        );
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "v") {
        console.log("undo");
        undoChange(
          updateAllSlides,
          currentlySelectedSlideId,
          updateCurrentSlideVariables,
          updateSelectedObject,
          updateNewSlidePrefabs,
          updatePageNumber,
          updateModal,
          createNewSlideId,
        );
      }
    }

    window.addEventListener("keydown", handleKeyCombo);

    return () => {
      window.removeEventListener("keydown", handleKeyCombo);
    };
  }, []);

  if (Object.keys(currentSlideVariables).length > 0) {
    return (
      <div className="container">
        {modalActive && (
          <Modal
            deleteCurrentSlideFunction={deleteSlide}
            toggleModal={toggleModal}
          />
        )}
        <div className="editorWindow">
          <MainPresentationDisplay
            vars={currentSlideVariables}
            updateObject={updateObject}
            updateSelectedObject={updateSelectedObject}
            deleteObject={deleteObject}
            duplicateObject={duplicateObject}
          />
          <ActionPanel
            selectedObject={getSelectedObjectVariables()}
            getNewImage={getNewImage}
            updateObject={updateObject}
            createNewObject={createObject}
          />
        </div>
        <SlideTab
          allSlides={allSlides}
          selectSlide={selectSlide}
          startCreatingNewSlide={startCreatingSlide}
          currentlySelectedSlideId={currentlySelectedSlideId}
          toggleModal={toggleModal}
          createNewSlideId={createNewSlideId}
          updateAllSlides={updateAllSlides}
        />
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="SlideTypePicker">
          {prefabTypes.map((val, i) => {
            let bgColor = val === selectedPrefabType ? "#62cdff" : "#f5f5f5";
            console.log(bgColor);

            return (
              <button
                key={i}
                className="slideTypeButton"
                onMouseDown={() => {
                  fetchStyles(val, updateNewSlidePrefabs);
                  changeSelectedPrefabType(val);
                }}
                style={{ backgroundColor: bgColor }}
              >
                {val}
              </button>
            );
          })}
        </div>
        <SlideStylePicker
          newSlidePrefabs={newSlidePrefabs}
          updateCurrentSlideVariables={updateCurrentSlideVariables}
          currentPageNumber={currentPageNumber}
          updatePageNumber={updatePageNumber}
          createSlide={createSlide}
        />
        <SlideTab
          allSlides={allSlides}
          selectSlide={selectSlide}
          startCreatingNewSlide={startCreatingSlide}
          currentlySelectedSlideId={currentlySelectedSlideId}
          toggleModal={toggleModal}
          createNewSlideId={createNewSlideId}
          updateAllSlides={updateAllSlides}
        />
      </div>
    );
  }
}

export default App;
