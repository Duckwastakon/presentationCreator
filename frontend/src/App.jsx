import { useEffect } from "react";
import "./mainComponents/appStyle.css";
import { SlideTab } from "./mainComponents/slidesTab/tabs";
import { ActionPanel } from "./mainComponents/variableEditor/actionPanel";
import { dupObj } from "./objectFunctions";
import { fetchAllStyles, fetchStyles } from "./fetchFunctions";
import { useVariables } from "./presentationVariables";
import { changeHistory, getButtonStates } from "./keyBindFunctions";
import { HeaderBar } from "./mainComponents/headerComponent/headerBar";
import { MainPresentationDisplay } from "./mainComponents/presentationEditor/presentationEditor";
import { Modal } from "./mainComponents/deleteModal/modal";
import { LoadingDiv } from "./mainComponents/loadingComponent/loadingDiv";
import { EditingDropDown } from "./mainComponents/slidesTab/components/editingDropdown";
import { SlideStylePicker } from "./mainComponents/chooseNewSlides/slideStylePicker";

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
    MenuOpen,
    updateOpen,
    dropDownPos,
    duplicateSlide,
    dropDownSlideId,
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

  function dupSlide() {
    duplicateSlide(structuredClone(allSlides[dropDownSlideId.current]));
  }

  useEffect(() => {
    fetchAllStyles(updatePrefabTypes);
    fetchStyles("intro slides", updateNewSlidePrefabs, saveNewChanges);
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

  let buttonStates = getButtonStates();

  if (Object.keys(currentSlideVariables).length > 0) {
    return (
      <div className="background">
        <div
          style={{
            background: "transparent",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            position: "fixed",
            width: "50%",
            height: "auto",
            top: "8px",
            left: "25%",
            zIndex: "500",
          }}
        >
          <button
            disabled={buttonStates[0]}
            onPointerDown={() => {
              if (buttonStates[0]) return;
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
            }}
            className="redoundoButton"
          >
            <p>undo</p>
          </button>
          <button
            disabled={buttonStates[1]}
            onPointerDown={() => {
              if (buttonStates[1]) return;
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
            }}
            className="redoundoButton"
          >
            <p>redo</p>
          </button>
        </div>
        <div className="container">
          {modalActive && <Modal />}
          {MenuOpen && (
            <EditingDropDown
              xPos={dropDownPos[0]}
              yPos={dropDownPos[1]}
              duplicateSlide={dupSlide}
              deleteSlide={updateModal}
              hideDropDown={updateOpen}
            />
          )}
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
        <div
          style={{
            background: "transparent",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            position: "fixed",
            width: "50%",
            height: "auto",
            top: "8px",
            left: "25%",
            zIndex: "500",
          }}
        >
          <button
            disabled={buttonStates[0]}
            onPointerDown={() => {
              if (buttonStates[0]) return;
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
            }}
            className="redoundoButton"
          >
            <p>undo</p>
          </button>
          <button
            disabled={buttonStates[1]}
            onPointerDown={() => {
              if (buttonStates[1]) return;
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
            }}
            className="redoundoButton"
          >
            <p>redo</p>
          </button>
        </div>
        <div className="SlideTypePicker">
          {prefabTypes.map((val, i) => {
            let bgColor = val === selectedPrefabType ? "#62cdff" : "#f5f5f5";

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
