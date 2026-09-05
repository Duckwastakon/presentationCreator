import { useEffect } from "react";
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
import { useVariables } from "./presentationVariables";

function App() {
  const {
    allSlides,
    updateAllSlides,
    currentSlideVariables,
    updateCurrentSlideVariables,
    selectedObject,
    updateSelectedObject,
    newSlidePrefabs,
    updateNewSlidePrefabs,
    currentPageNumber,
    updatePageNumber,
    prefabTypes,
    updatePrefabTypes,
    selectedPrefabType,
    changeSelectedPrefabType,
    modalActive,
    updateModal,
    currentlySelectedSlideIda,
    updateCurrentlySelectedSlideIda,
    createNewSlideIda,
    changeCreateNewSlideIda,
  } = useVariables();

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
      updateCurrentlySelectedSlideId,
      changeCreateNewSlideId,
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
      changeCreateNewSlideId,
      currentlySelectedSlideId,
      updateCurrentlySelectedSlideId,
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

  function copyObject(type, obj) {
    console.log(type, obj);
    copiedObject.current = { [type]: { [1]: obj } };
  }

  function pasteObject() {
    console.log(copiedObject.current);
    Object.entries(copiedObject.current).map((entry) => {
      if (entry[0] == "" || entry[1] == {}) return;
      console.log(entry);
      dupObj(
        entry[0],
        entry[1],
        currentSlideVariables,
        updateCurrentSlideVariables,
        saveSlide,
      );
    });
    saveSlide();
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

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "v") {
        console.log("paste");
        pasteObject();
      }
    }

    window.addEventListener("keydown", handleKeyCombo);

    return () => {
      window.removeEventListener("keydown", handleKeyCombo);
    };
  }, [currentSlideVariables]);

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
            copyObject={copyObject}
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
          createSlide={createSlide}
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
          createSlide={createSlide}
        />
      </div>
    );
  }
}

export default App;
