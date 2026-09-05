import { useEffect } from "react";
import "./styling/appStyle.css";
import { SlideTab } from "./viewComponents/tabs";
import { MainPresentationDisplay } from "./viewComponents/presentationEditor";
import { ActionPanel } from "./viewComponents/actionPanel";
import { Modal } from "./viewComponents/modal";
import { redoChange, undoChange } from "./keyBindFunctions";
import { SlideStylePicker } from "./viewComponents/slideStylePicker";
import { dupObj } from "./objectFunctions";
import { fetchAllStyles, fetchStyles } from "./fetchFunctions";
import { useVariables } from "./presentationVariables";

function App() {
  const {
    allSlides,
    updateAllSlides,
    currentSlideVariables,
    updateCurrentSlideVariables,
    currentlySelectedSlideId,
    updateVariable,
    updateSelectedObject,
    updateNewSlidePrefabs,
    updatePageNumber,
    prefabTypes,
    updatePrefabTypes,
    selectedPrefabType,
    changeSelectedPrefabType,
    modalActive,
    updateModal,
    copiedObject,
    changeCreateNewSlideId
  } = useVariables();

  function getSelectedObjectVariables() {
    if (updateVariable.length <= 0) return ["", "", ""];
    return [
      updateVariable[0],
      updateVariable[1],
      currentSlideVariables[updateVariable[0]][updateVariable[1]],
    ];
  }

  function saveSlide(newSlide) {
    updateAllSlides({
      ...allSlides,
      [currentlySelectedSlideId.current]: newSlide,
    });
  }

  function pasteObject() {
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
  }

  useEffect(() => {
    fetchAllStyles(updatePrefabTypes);
    fetchStyles("intro", updateNewSlidePrefabs);
    function handleKeyCombo(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
        undoChange(
          updateAllSlides,
          currentlySelectedSlideId,
          updateCurrentSlideVariables,
          updateSelectedObject,
          updateNewSlidePrefabs,
          updatePageNumber,
          updateModal,
          changeCreateNewSlideId,
        );
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "y") {
        redoChange(
          updateAllSlides,
          currentlySelectedSlideId,
          updateCurrentSlideVariables,
          updateSelectedObject,
          updateNewSlidePrefabs,
          updatePageNumber,
          updateModal,
          changeCreateNewSlideId,
        );
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "v") {
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
        {modalActive && <Modal />}
        <div className="editorWindow">
          <MainPresentationDisplay />
          <ActionPanel selectedObject={getSelectedObjectVariables()}/>
        </div>
        <SlideTab/>
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
        <SlideStylePicker/>
        <SlideTab/>
      </div>
    );
  }
}

export default App;
