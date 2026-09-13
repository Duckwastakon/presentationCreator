import { useEffect } from "react";
import "./mainComponents/appStyle.css";
import { SlideTab } from "./mainComponents/slidesTab/tabs";
import { ActionPanel } from "./mainComponents/variableEditor/actionPanel";
import { SlideStylePicker } from "./viewComponents/slideStylePicker";
import { dupObj } from "./objectFunctions";
import { fetchAllStyles, fetchStyles } from "./fetchFunctions";
import { useVariables } from "./presentationVariables";
import { changeHistory } from "./keyBindFunctions";
import { HeaderBar } from "./mainComponents/headerComponent/headerBar";
import { MainPresentationDisplay } from "./mainComponents/presentationEditor/presentationEditor";
import { Modal } from "./mainComponents/deleteModal/modal";
import { LoadingDiv } from "./mainComponents/loadingComponent/loadingDiv";

function App() {
  const {
    allSlides,
    updateAllSlides,
    currentSlideVariables,
    updateCurrentSlideVariables,
    currentlySelectedSlideId,
    updateVariable,
    updateNewSlidePrefabs,
    updatePageNumber,
    prefabTypes,
    updatePrefabTypes,
    selectedPrefabType,
    changeSelectedPrefabType,
    modalActive,
    updateModal,
    copiedObject,
    changeCreateNewSlideId,
    setUpdateVariable,
    setSelectedObject,
    updateCurrentlySelectedSlideId,
    saveNewChanges,
  } = useVariables();

  function getSelectedObjectVariables() {
    if (updateVariable.length <= 0) return ["", "", ""];
    return [
      updateVariable[0],
      updateVariable[1],
      currentSlideVariables[updateVariable[0]][updateVariable[1]],
    ];
  }

  async function saveSlide(newSlide) {
    updateAllSlides({
      ...allSlides,
      [currentlySelectedSlideId.current]: newSlide,
    });

    let newSlidesOverride = {
      ...allSlides,
      [currentlySelectedSlideId.current]: newSlide,
    };
    console.log(currentSlideVariables);
    console.log(newSlide);
    console.log(allSlides);
    console.log("newChangeSaved");
    console.log(newSlidesOverride);
    saveNewChanges({
      currentSlideVariablesOverride: newSlide,
      allSlidesOverride: newSlidesOverride,
    });
  }

  function pasteObject() {
    Object.entries(copiedObject.current).map((entry) => {
      console.log(entry);
      if (entry[0] == "" || entry[1] == {}) return;
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
    fetchStyles("intro", updateNewSlidePrefabs, saveNewChanges);
  }, []);

  useEffect(() => {
    function handleKeyCombo(event) {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "z" &&
        !event.repeat
      ) {
        console.log("undo");
        changeHistory(
          -1,
          updateAllSlides,
          updateCurrentSlideVariables,
          setUpdateVariable,
          setSelectedObject,
          updateNewSlidePrefabs,
          updatePageNumber,
          changeSelectedPrefabType,
          updateModal,
          updateCurrentlySelectedSlideId,
          changeCreateNewSlideId,
        );
      }
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "y" &&
        !event.repeat
      ) {
        console.log("redo");
        changeHistory(
          1,
          updateAllSlides,
          updateCurrentSlideVariables,
          setUpdateVariable,
          setSelectedObject,
          updateNewSlidePrefabs,
          updatePageNumber,
          changeSelectedPrefabType,
          updateModal,
          updateCurrentlySelectedSlideId,
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
      <div className="background">
        <div className="container">
          {modalActive && <Modal />}
          <LoadingDiv />
          <div className="editorWindow">
            <div className="creatorContainer">
              <MainPresentationDisplay />
              <ActionPanel selectedObject={getSelectedObjectVariables()} />
            </div>
            <HeaderBar />
          </div>
          <SlideTab />
        </div>
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
                  fetchStyles(val, updateNewSlidePrefabs, saveNewChanges);
                  changeSelectedPrefabType(val);
                }}
                style={{ backgroundColor: bgColor }}
              >
                {val}
              </button>
            );
          })}
        </div>
        <SlideStylePicker />
        <SlideTab />
      </div>
    );
  }
}

export default App;
