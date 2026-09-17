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
  function updateDropDownSlideId(val){
    dropDownSlideId.current = val
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
    console.log(currentlySelectedSlideIdOverride);
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
      }}
    >
      {children}
    </PresentationVariables>
  );
}

export function useVariables() {
  return useContext(PresentationVariables);
}
