import { saveChange } from "./keyBindFunctions";

export function selectNewSlide(
  slideVariables,
  slideId,
  updateSelectedSlide,
  updateCurrentSlideId,
  updateCreateNewSlideId
) {
  updateCurrentSlideId(slideId);
  updateCreateNewSlideId(undefined);
  updateSelectedSlide(slideVariables);

  saveChange({
    currentlySelectedSlideId: slideId,
    currentSlideVariables: structuredClone(slideVariables),
    createNewSlideId: undefined,
  });
}

export function saveSlide(newSlide, updateAllSlides, allSlides, currentlySelectedSlideId) {
    updateAllSlides({
      ...allSlides,
      [currentlySelectedSlideId.current]: newSlide,
    });
  }

export function startCreatingNewSlide(
  newSlidePosId,
  updateCreateNewSlideId,
  updateSelectedSlide,
  updateCurrentSlideId,
) {
  updateCreateNewSlideId(newSlidePosId);
  updateSelectedSlide({});
  updateCurrentSlideId(undefined);
  console.log(newSlidePosId)

  saveChange({
    currentlySelectedSlideId: -1,
    currentSlideVariables: {},
    createNewSlideId: newSlidePosId,
  });
}

export function deleteSelectedSlide(
  allSlides,
  updateAllSlides,
  currentSlideId,
  updateCurrentlySelectedSlideId,
  changeCreateNewSlideId,
  updateSelectedSlide,
) {
  let newSlides = {};
  Object.entries(allSlides).map((val) => {
    if (val[0] !== currentSlideId.current.toString()) {
      newSlides = { ...newSlides, [Object.keys(newSlides).length]: val[1] };
    }
  });
  const createSpot = currentSlideId.current;

  changeCreateNewSlideId(createSpot);
  updateCurrentlySelectedSlideId(undefined);
  updateAllSlides(newSlides);
  updateSelectedSlide({});

  saveChange({
    allSlides: structuredClone(newSlides),
    currentSlideId: -1,
    createNewSlideId: createSpot,
    currentSlideVariables: {},
  });
}

export function createNewSlide(
  newSlideVariables,
  createNewSlideId,
  changeCreateNewSlideId,
  currentlySelectedSlideId,
  updateCurrentlySelectedSlideId,
  allSlides,
  updateAllSlides,
) {
  updateCurrentlySelectedSlideId(createNewSlideId.current);
  let newSlides = {};
  let createNew = false;

  if (Object.entries(allSlides).length > 0) {
    Object.entries(allSlides).map((slide, i) => {
      if (i == createNewSlideId.current) {
        createNew = true;
        newSlides = {
          ...newSlides,
          [Object.entries(newSlides).length]: newSlideVariables,
        };
      }
      newSlides = {
        ...newSlides,
        [Object.entries(newSlides).length]: slide[1],
      };
    });
  } else {
    createNew = true;
    newSlides = { [0]: { ...newSlideVariables } };
  }

  if (!createNew) {
    newSlides = {
      ...newSlides,
      [Object.entries(newSlides).length]: newSlideVariables,
    };
  }

  changeCreateNewSlideId(undefined);
  updateAllSlides(newSlides);
  saveChange({
    allSlides: structuredClone(newSlides),
    createNewSlideId: undefined,
    currentSelectedSlideId: currentlySelectedSlideId.current,
    currentSlideVariables: structuredClone(newSlideVariables),
  });
}
