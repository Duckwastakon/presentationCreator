import { createContext, useContext, useRef, useState } from "react";
import { createNewSlide } from "./slideFunctions";
import { shuffleArray } from "./extraFunctions";
import { saveChange } from "./keyBindFunctions";

const PresentationVariables = createContext(null);

export function VariableContainer({ children }) {
  const [allSlides, updateAllSlides] = useState({});

  const [currentSlideVariables, updateCurrentSlideVariables] = useState({});
  const [updateVariable, setUpdateVariable] = useState([]);
  const [selectedObject, setSelectedObject] = useState(["", ""]);
  const [selectedObjectsVariables, setSelectedObjectsVariables] = useState({});

  const [newSlidePrefabs, updateNewSlidePrefabs] = useState({});
  const [currentPageNumber, updatePageNumber] = useState(0);
  const [prefabTypes, updatePrefabTypes] = useState([]);
  const [selectedPrefabType, changeSelectedPrefabType] = useState("intro");

  const [modalActive, updateModal] = useState(false);

  const [MenuOpen, updateOpen] = useState(false);
  const [dropDownPos, changeDropDownPos] = useState([0, 0]);

  const [imageArtists, updateArtists] = useState([]);

  const currentlySelectedSlideId = useRef();
  function updateCurrentlySelectedSlideId(NewVal) {
    currentlySelectedSlideId.current = NewVal;
  }

  const createNewSlideId = useRef(0);
  function changeCreateNewSlideId(newVal) {
    createNewSlideId.current = newVal;
  }

  const usedImages = useRef({});
  function updateUsedImages(data, query) {
    usedImages.current = {
      ...usedImages.current,
      [query]: shuffleArray(data),
    };
  }

  const dropDownSlideId = useRef(0);
  function updateDropDownSlideId(val) {
    dropDownSlideId.current = val;
  }

  const copiedObject = useRef({});
  function saveCopiedObject(newVal) {
    copiedObject.current = newVal;
  }

  const [objectLoading, changeLoading] = useState(false);

  const dupePos = useRef(0);
  function duplicateSlide(slideVariables) {
    dupePos.current = currentlySelectedSlideId.current + 1;
    let newVals = createNewSlide(
      slideVariables,
      dupePos,
      changeCreateNewSlideId,
      currentlySelectedSlideId,
      updateCurrentlySelectedSlideId,
      allSlides,
      updateAllSlides,
    );

    console.log(newVals);
    saveNewChanges({
      allSlidesOverride: newVals[0],
      currentlySelectedSlideIdOverride: newVals[1],
      currentSlideVariablesOverride: slideVariables,
    });
  }

  function saveChangedVariables() {
    let slidePos = currentlySelectedSlideId.current;
    let currentVariables = currentSlideVariables;

    let changed = false;

    let currentObject = structuredClone(selectedObjectsVariables);
    let slideClone = structuredClone(currentSlideVariables);

    if (currentObject.backgroundColor != undefined) {
      console.log(currentVariables.backgroundColor);
      if (currentObject.backgroundColor != currentVariables.backgroundColor) {
        slideClone.backgroundColor = currentObject.backgroundColor;

        updateCurrentSlideVariables(slideClone);

        let newSlides = {
          ...allSlides,
          [slidePos]: slideClone,
        };
        updateAllSlides(newSlides);

        saveNewChanges({
          allSlidesOverride: newSlides,
          currentSlideVariablesOverride: slideClone,
        });
        console.log("changed");
      }
    }

    if (selectedObject[0] === "") return;

    Object.entries(currentObject[1]).map((val) => {
      if (
        val[1] !==
        currentVariables[selectedObject[0]][selectedObject[1]][val[0]]
      ) {
        if (val[0] != "x" && val[0] != "y" && val[0] != "w" && val[0] != "h") {
          changed = true;
        }
      }
    });

    if (!changed) {
      return;
    }

    slideClone[selectedObject[0]][selectedObject[1]] = currentObject[1];

    updateCurrentSlideVariables(slideClone);

    let newSlides = {
      ...allSlides,
      [slidePos]: slideClone,
    };
    updateAllSlides(newSlides);

    saveNewChanges({
      allSlidesOverride: newSlides,
      currentSlideVariablesOverride: slideClone,
    });
  }

  function saveNewChanges({
    allSlidesOverride,
    currentSlideVariablesOverride,
    updateVariableOverride,
    selectedObjectOverride,
    newSlidePrefabsOverride,
    currentPageNumberOverride,
    selectedPrefabTypeOverride,
    modalActiveOverride,
    currentlySelectedSlideIdOverride,
    createNewSlideIdOverride,
  } = {}) {
    saveChange({
      allSlides: allSlidesOverride || allSlides,
      currentSlideVariables:
        currentSlideVariablesOverride || currentSlideVariables,
      updateVariable: updateVariableOverride || updateVariable,
      selectedObject: selectedObjectOverride || selectedObject,
      newSlidePrefabs: newSlidePrefabsOverride || newSlidePrefabs,
      currentPageNumber: currentPageNumberOverride || currentPageNumber,
      selectedPrefabType: selectedPrefabTypeOverride || selectedPrefabType,
      modalActive: modalActiveOverride ?? modalActive,
      currentlySelectedSlideId:
        currentlySelectedSlideIdOverride ??
        currentlySelectedSlideId.current ??
        -1,
      createNewSlideId:
        createNewSlideIdOverride ?? createNewSlideId.current ?? -1,
    });
  }

  return (
    <PresentationVariables
      value={{
        allSlides,
        updateAllSlides,
        currentSlideVariables,
        updateCurrentSlideVariables,
        selectedObject,
        setSelectedObject,
        updateVariable,
        setUpdateVariable,
        selectedObjectsVariables,
        setSelectedObjectsVariables,
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
        duplicateSlide,
        currentlySelectedSlideId,
        updateCurrentlySelectedSlideId,
        createNewSlideId,
        changeCreateNewSlideId,
        usedImages,
        updateUsedImages,
        copiedObject,
        saveCopiedObject,
        saveNewChanges,
        objectLoading,
        changeLoading,
        MenuOpen,
        updateOpen,
        dropDownPos,
        changeDropDownPos,
        dropDownSlideId,
        updateDropDownSlideId,
        saveChangedVariables,
        imageArtists,
        updateArtists,
      }}
    >
      {children}
    </PresentationVariables>
  );
}

export function useVariables() {
  return useContext(PresentationVariables);
}
