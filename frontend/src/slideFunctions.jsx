import { saveChange } from "./keyBindFunctions";

export function selectNewSlide(
  slideVariables,
  slideId,
  updateSelectedSlide,
  currentSlideId,
  createNewSlideId,
) {
  currentSlideId.current = slideId;
  createNewSlideId.current = undefined;
  updateSelectedSlide(slideVariables);

  saveChange({
    currentlySelectedSlideId: slideId,
    currentSlideVariables: structuredClone(slideVariables),
    createNewSlideId: undefined,
  });
}

export function startCreatingNewSlide(
  newSlidePosId,
  createNewSlideId,
  updateSelectedSlide,
  currentSlideId,
) {
  createNewSlideId.current = newSlidePosId;
  updateSelectedSlide({});
  currentSlideId.current = undefined;
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
  createNewSlideId,
  updateSelectedSlide,
) {
  let newSlides = {};
  Object.entries(allSlides).map((val) => {
    if (val[0] !== currentSlideId.current.toString()) {
      newSlides = { ...newSlides, [Object.keys(newSlides).length]: val[1] };
    }
  });
  const createSpot = currentSlideId.current;

  createNewSlideId.current = createSpot;
  currentSlideId.current = undefined;
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
  currentSelectedSlideId,
  allSlides,
  updateAllSlides,
) {
  console.log(createNewSlideId.current);
  currentSelectedSlideId.current = createNewSlideId.current;
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

  console.log(newSlides)

  createNewSlideId.current = undefined;
  updateAllSlides(newSlides);
  saveChange({
    allSlides: structuredClone(newSlides),
    createNewSlideId: undefined,
    currentSelectedSlideId: currentSelectedSlideId.current,
    currentSlideVariables: structuredClone(newSlideVariables),
  });
}
