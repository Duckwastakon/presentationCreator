let history = {};
let currentHistoryId = 0;

export function undoChange(
  updateSlides,
  currentSlideId,
  updateCurrentPrefab,
  updateStyleOptions,
  updateScrollPage,
  updateModal,
) {
  if (currentHistoryId > 1) {
    currentHistoryId -= 1;
    if (history[currentHistoryId][0] != undefined) {
      updateSlides(history[currentHistoryId][0]);
    }
    if (history[currentHistoryId][1] != undefined) {
      if (history[currentHistoryId][1] == -1) {
        currentSlideId.current = undefined;
      } else {
        currentSlideId.current = history[currentHistoryId][1];
      }
    }
    if (history[currentHistoryId][2] != undefined) {
      updateCurrentPrefab(history[currentHistoryId][2]);
    }
    if (history[currentHistoryId][3] != undefined) {
      updateStyleOptions(history[currentHistoryId][3]);
    }
    if (history[currentHistoryId][4] != undefined) {
      updateScrollPage(history[currentHistoryId][4]);
    }
    if (history[currentHistoryId][5] != undefined) {
      updateModal(history[currentHistoryId][5]);
    }
  }
}

export function redoChange(
  updateSlides,
  currentSlideId,
  updateCurrentPrefab,
  updateStyleOptions,
  updateScrollPage,
  updateModal,
) {
  if (Object.keys(history).length > currentHistoryId - 1) {
    currentHistoryId += 1;
    if (history[currentHistoryId][0] != undefined) {
      updateSlides(history[currentHistoryId][0]);
    }
    if (history[currentHistoryId][1] != undefined) {
      if (history[currentHistoryId][1] == -1) {
        currentSlideId.current = undefined;
      } else {
        currentSlideId.current = history[currentHistoryId][1];
      }
    }
    if (history[currentHistoryId][2] != undefined) {
      updateCurrentPrefab(history[currentHistoryId][2]);
    }
    if (history[currentHistoryId][3] != undefined) {
      updateStyleOptions(history[currentHistoryId][3]);
    }
    if (history[currentHistoryId][4] != undefined) {
      updateScrollPage(history[currentHistoryId][4]);
    }
    if (history[currentHistoryId][5] != undefined) {
      updateModal(history[currentHistoryId][5]);
    }
  }
}

export function saveChange({
  slides,
  currentSlideId,
  currentPrefab,
  styleOptions,
  scrollPage,
  modalActive,
}) {
  console.log("Hey");
  currentHistoryId += 1;
  history[currentHistoryId] = {
    [0]: slides,
    [1]: currentSlideId,
    [2]: currentPrefab,
    [3]: styleOptions,
    [4]: scrollPage,
    [5]: modalActive,
  };
  console.log(history);
}

export function emptyChanges() {
  history = {};
  currentHistoryId = 0;
}
