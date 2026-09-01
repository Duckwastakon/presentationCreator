import { clamp } from "./extraFunctions";

export function delObj(
  dataType,
  index,
  currentSlideVariables,
  updateCurrentSlideVariables,
  saveSlide,
) {
  let newSlideVariables = structuredClone(currentSlideVariables);

  delete newSlideVariables[dataType][index];

  updateCurrentSlideVariables(newSlideVariables);
  saveSlide(newSlideVariables);
}

export function dupObj(
  dataType,
  object,
  currentSlideVariables,
  updateCurrentSlideVariables,
  saveSlide,
) {
  let newSlide = structuredClone(currentSlideVariables);

  const size = Object.keys(newSlide).length;
  let i = 0;
  console.log(Object.keys(newSlide[dataType]));
  while (Object.keys(newSlide[dataType]).includes((size + i).toString())) {
    i += 1;
  }

  let looped = true;
  let checkable = Object.entries(newSlide[dataType]);

  let newClone = structuredClone(object[1]);

  while (looped) {
    looped = false;

    checkable.map((val) => {
      console.log(val);
      if (val[1].x == newClone.x && val[1].y == newClone.y) {
        newClone.x -= newClone.w / 2;
        newClone.y += newClone.h;
        looped = true;
      }
    });
  }

  newSlide[dataType][size + i] = newClone;

  updateCurrentSlideVariables(newSlide);
  saveSlide(newSlide);
}

export function updObj(
  dataType,
  index,
  variableName,
  newValue,
  currentSlideVariables,
  updateCurrentSlideVariables,
  saveSlide,
) {
  let newSlide = structuredClone(currentSlideVariables);
  if (dataType === undefined) {
    newSlide[variableName] = newValue;
  } else {
    if (index === undefined) {
      newSlide[dataType][variableName] = newValue;
    } else {
      if (variableName === undefined) {
        newSlide[dataType][index] = newValue;
      } else {
        newSlide[dataType][index][variableName] = newValue;
      }
    }
  }

  updateCurrentSlideVariables(newSlide);
  saveSlide(newSlide);
}

export function createObj(
  type,
  size,
  currentSlideVariables,
) {
  let newObj;

  if (type === "text") {
    const newWidth = (6 * size) / 36 + 0.2;
    const newX = 13.333 / 2 - newWidth / 2;

    const newHeight = size / 36 + 0.1;
    const newY = 7.5 / 2 - newHeight / 2;

    newObj = {
      x: newX,
      y: newY,
      w: newWidth,
      h: newHeight,
      fontSize: size,
      text: "new Text",
    };
  }

  if (type === "images") {
    const newWidth = 2;
    const newX = 13.333 / 2 - newWidth / 2;

    const newHeight = 2;
    const newY = 7.5 / 2 - newHeight / 2;

    newObj = {
      x: newX,
      y: newY,
      w: newWidth,
      h: newHeight,
      src: undefined,
    };
  }

  let newInd;
  let i = 0;

  const slideKeys = Object.keys(currentSlideVariables[type])

  while (
    slideKeys.includes(
      (slideKeys.length + i).toString(),
    )
  ) {
    i += 1;
  }

  newInd = slideKeys.length + i;

  const slideEntries = Object.entries(currentSlideVariables[type])

  let looped = false;

  while (!looped) {
    looped = true;

    slideEntries.map((val) => {
      if (val[1].x == newObj.x && val[1].y == newObj.y) {
        looped = false;
        newObj.y += newObj.h;
      }
    });
  }

  if (newObj.y > 7.5 - newObj.h / 2) {
    newObj.y = Math.random() * 7.5 - newObj.h / 2;
    newObj.x = Math.random() * 13.333 - newObj.w / 2;
  }

  newObj.x = clamp(newObj.x, 0, 13.333 - newObj.w);
  newObj.y = clamp(newObj.y, 0, 7.5 - newObj.h);

  return[newInd, newObj]
}
