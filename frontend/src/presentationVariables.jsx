import { createContext, useContext, useRef, useState } from "react";
import { createNewSlide } from "./slideFunctions";

const PresentationVariables = createContext(null);

export function VariableContainer({ children }) {
  const [allSlides, updateAllSlides] = useState({});

  const [currentSlideVariables, updateCurrentSlideVariables] = useState({});
  const [selectedObject, updateSelectedObject] = useState([]);

  const [newSlidePrefabs, updateNewSlidePrefabs] = useState({});
  const [currentPageNumber, updatePageNumber] = useState(0);
  const [prefabTypes, updatePrefabTypes] = useState([]);
  const [selectedPrefabType, changeSelectedPrefabType] = useState("intro");

  const [modalActive, updateModal] = useState(false);

  const currentlySelectedSlideId = useRef();
  function updateCurrentlySelectedSlideId(NewVal){
    currentlySelectedSlideId.current = NewVal
  }

  const createNewSlideId = useRef(0);
  function changeCreateNewSlideId(newVal){
    createNewSlideId.current = newVal
  }

  const usedImages = useRef({});

  const copiedObject = useRef({});
  function saveCopiedObject(newVal){
    copiedObject.current = newVal
  }


  function duplicateSlide(slideVariables) {
    createNewSlide(
      slideVariables,
      createNewSlideId,
      currentlySelectedSlideId,
      allSlides,
      updateAllSlides,
    );
  }

  return (
    <PresentationVariables
      value={{
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
        duplicateSlide,
        currentlySelectedSlideId,
        updateCurrentlySelectedSlideId,
        createNewSlideId,
        changeCreateNewSlideId,
        usedImages,
        copiedObject,
        saveCopiedObject
      }}
    >
      {children}
    </PresentationVariables>
  );
}

export function useVariables() {
  return useContext(PresentationVariables);
}
