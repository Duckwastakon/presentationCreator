let history = {};
let currentHistoryId = 0;

export function undoChange(
  updateAllSlides,
  currentlySelectedSlideId,
  updateCurrentSlideVariables,
  updateSelectedObject,
  updateNewSlidePrefabs,
  updatePageNumber,
  updateModal,
  createNewSlideId,
) {
  if (currentHistoryId > 1) {
    currentHistoryId -= 1;
    if (history[currentHistoryId][0] != undefined) {
      updateAllSlides(history[currentHistoryId][0]);
    }
    if (history[currentHistoryId][1] != undefined) {
      if (history[currentHistoryId][1] == -1) {
        currentlySelectedSlideId.current = undefined;
      } else {
        currentlySelectedSlideId.current = history[currentHistoryId][1];
      }
    }
    if (history[currentHistoryId][2] != undefined) {
      updateCurrentSlideVariables(history[currentHistoryId][2]);
    }
    if (history[currentHistoryId][3] != undefined) {
      updateSelectedObject(history[currentHistoryId][3]);
    }
    if (history[currentHistoryId][4] != undefined) {
      updateNewSlidePrefabs(history[currentHistoryId][4]);
    }
    if (history[currentHistoryId][5] != undefined) {
      updatePageNumber(history[currentHistoryId][5]);
    }
    if (history[currentHistoryId][6] != undefined) {
      updateModal(history[currentHistoryId][6]);
    }
    if (history[currentHistoryId][7] != undefined) {
      createNewSlideId.current = history[currentHistoryId][7];
    }
  }
}

export function redoChange(
  updateAllSlides,
  currentlySelectedSlideId,
  updateCurrentSlideVariables,
  updateSelectedObject,
  updateNewSlidePrefabs,
  updatePageNumber,
  updateModal,
  createNewSlideId,
) {
  if (Object.keys(history).length > currentHistoryId - 1) {
    currentHistoryId += 1;
    if (history[currentHistoryId][0] != undefined) {
      updateAllSlides(history[currentHistoryId][0]);
    }
    if (history[currentHistoryId][1] != undefined) {
      if (history[currentHistoryId][1] == -1) {
        currentlySelectedSlideId.current = undefined;
      } else {
        currentlySelectedSlideId.current = history[currentHistoryId][1];
      }
    }
    if (history[currentHistoryId][2] != undefined) {
      updateCurrentSlideVariables(history[currentHistoryId][2]);
    }
    if (history[currentHistoryId][3] != undefined) {
      updateSelectedObject(history[currentHistoryId][3]);
    }
    if (history[currentHistoryId][4] != undefined) {
      updateNewSlidePrefabs(history[currentHistoryId][4]);
    }
    if (history[currentHistoryId][5] != undefined) {
      updatePageNumber(history[currentHistoryId][5]);
    }
    if (history[currentHistoryId][6] != undefined) {
      updateModal(history[currentHistoryId][6]);
    }
    if (history[currentHistoryId][7] != undefined) {
      createNewSlideId.current = history[currentHistoryId][7];
    }
  }
}

export function saveChange({
  allSlides,
  currentlySelectedSlideId,
  currentSlideVariables,
  selectedObject,
  newSlidePrefabs,
  currentPageNumber,
  modalActive,
  createNewSlideId,
}) {
  currentHistoryId += 1;
  history[currentHistoryId] = {
    [0]: allSlides,
    [1]: currentlySelectedSlideId,
    [2]: currentSlideVariables,
    [3]: selectedObject,
    [4]: newSlidePrefabs,
    [5]: currentPageNumber,
    [6]: modalActive,
    [7]: createNewSlideId,
  };
  console.log(history);
}

export function emptyChanges() {
  history = {};
  currentHistoryId = 0;
}
