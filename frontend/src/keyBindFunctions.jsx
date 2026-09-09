let history = {};
let currentHistoryId = 0;

export function changeHistory(
  change,
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
) {
  if (Object.keys(history).includes(String(currentHistoryId + change))) {
    currentHistoryId += change;
    if (history[currentHistoryId][0] != undefined) {
      updateAllSlides(history[currentHistoryId][0]);
    }
    if (history[currentHistoryId][1] != undefined) {
      updateCurrentSlideVariables(history[currentHistoryId][1]);
    }
    //if (history[currentHistoryId][2] != undefined) {
    //  setUpdateVariable(history[currentHistoryId][2]);
    //}
    setUpdateVariable([])
    setSelectedObject(["", ""])
    //if (history[currentHistoryId][3] != undefined) {
    //  setSelectedObject(history[currentHistoryId][3]);
    //}
    if (history[currentHistoryId][4] != undefined) {
      updateNewSlidePrefabs(history[currentHistoryId][4]);
    }
    if (history[currentHistoryId][5] != undefined) {
      updatePageNumber(history[currentHistoryId][5]);
    }
    if (history[currentHistoryId][6] != undefined) {
      changeSelectedPrefabType(history[currentHistoryId][6]);
    }
    if (history[currentHistoryId][7] != undefined) {
      updateModal(history[currentHistoryId][7]);
    }
    if (history[currentHistoryId][8] != undefined) {
      if (history[currentHistoryId][8] == -1) {
        updateCurrentlySelectedSlideId(undefined);
      } else {
        updateCurrentlySelectedSlideId(history[currentHistoryId][8]);
      }
    }
    if (history[currentHistoryId][9] != undefined) {
      if (history[currentHistoryId][9] == -1) {
        changeCreateNewSlideId(undefined);
      } else {
        changeCreateNewSlideId(history[currentHistoryId][9]);
      }
    }
  }
}

export function saveChange({
  allSlides,
  currentSlideVariables,
  updateVariable,
  selectedObject,
  newSlidePrefabs,
  currentPageNumber,
  selectedPrefabType,
  modalActive,
  currentlySelectedSlideId,
  createNewSlideId,
}) {
  currentHistoryId += 1;
  history[currentHistoryId] = {
    [0]: allSlides,
    [1]: currentSlideVariables,
    [2]: updateVariable,
    [3]: selectedObject,
    [4]: newSlidePrefabs,
    [5]: currentPageNumber,
    [6]: selectedPrefabType,
    [7]: modalActive,
    [8]: currentlySelectedSlideId,
    [9]: createNewSlideId,
  };
  Object.entries(history).map((val) => {
    if (Number(val[0]) > currentHistoryId) {
      delete history[val[0]];
    }
  });
  console.log(history);
}

export function emptyChanges() {
  history = {};
  currentHistoryId = 0;
}
