import { saveChange } from "./keyBindFunctions";

export function selectNewSlide(
  slideValues,
  slideId,
  newCreatingSpot = undefined,
  slides,
  currentSlideId,
  createNewSlideId,
  updateCurrentPrefab,
) {
  currentSlideId.current = slideId;
  createNewSlideId.current = newCreatingSpot;
  updateCurrentPrefab(slideValues);
  saveChange({
    currentSlideId: slideId,
    currentPrefab: structuredClone(slideValues),
    slides: structuredClone(slides),
  });
}

export function deleteSelectedSlide(
  slides,
  currentSlideId,
  createNewSlideId,
  updateSlides,
  updateCurrentPrefab,
) {
  let newSlides = {};
  let i = 0;
  Object.entries(slides).map((val) => {
    if (val[0] !== currentSlideId.current.toString()) {
      newSlides = { ...newSlides, [i]: val[1] };
      i++;
    }
  });
  createNewSlideId.current = currentSlideId.current;
  currentSlideId.current = undefined;
  updateSlides(newSlides);
  updateCurrentPrefab({});
  saveChange({
    slides: structuredClone(newSlides),
    currentSlideId: -1,
    currentPrefab: {},
  });
}
