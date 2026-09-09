export function selectNewSlide(
  slideVariables,
  slideId,
  updateSelectedSlide,
  updateCurrentSlideId,
  updateCreateNewSlideId,
) {
  updateCurrentSlideId(slideId);
  updateCreateNewSlideId(undefined);
  updateSelectedSlide(slideVariables);
}

export function saveSlide(
  newSlide,
  updateAllSlides,
  allSlides,
  currentlySelectedSlideId,
) {
  updateAllSlides({
    ...allSlides,
    [currentlySelectedSlideId.current]: newSlide,
  });

  return {
    ...allSlides,
    [currentlySelectedSlideId.current]: newSlide,
  };
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

  return [newSlides, createSpot];
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
  let val = createNewSlideId.current;
  updateCurrentlySelectedSlideId(val);
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
  return [newSlides, val];
}
