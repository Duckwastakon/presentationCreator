import { shuffleArray } from "./extraFunctions";

export function getImage(
  event,
  usedImages,
  selectedObject,
  currentSlideVariables,
  updateObject,
) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const query = formData.get("query");

  let found = false;

  const savedImages = Object.entries(usedImages.current);

  if (savedImages.length > 0) {
    console.log(savedImages);
    savedImages.map((entry) => {
      if (entry[0] === query) {
        found = true;
        let currentImageId;
        if (selectedObject[0] != undefined) {
          currentImageId =
            currentSlideVariables[selectedObject[0]][selectedObject[1]]["src"];
        } else {
          currentImageId = currentSlideVariables["backgroundImageUrl"];
        }
        let i = 0;
        for (const img of entry[1]) {
          if (img.src.original === currentImageId) {
            if (i + 1 >= entry[1].length) i = 0;

            if (selectedObject.length > 0) {
              updateObject(
                selectedObject[0],
                selectedObject[1],
                selectedObject[2],
                entry[1][i + 1].src.original,
              );
              const val = entry[1][i + 1].width / entry[1][i + 1].height;
              updateObject(
                selectedObject[0],
                selectedObject[1],
                "aspectRatio",
                val,
              );
            } else {
              updateObject(
                undefined,
                undefined,
                "backgroundImageUrl",
                entry[1][i + 1].src.original,
              );
            }

            return;
          }

          i += 1;
        }

        console.log("cant find next image");
        console.log(entry);

        console.log(savedImages);
      }
    });
  }

  if (!found) {
    fetchImage(query, selectedObject, usedImages, updateObject);
  }
}

export function fetchImage(query, selectedObject, usedImages, updateObject) {
  fetch(`/API?query=${query}`, {
    method: "get",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("gettingNewPhotos");
      console.log(data);

      usedImages.current = {
        ...usedImages.current,
        [query]: shuffleArray(data),
      };
      var gottenRandNum = Math.floor(Math.random() * 4);
      console.log(gottenRandNum, data[gottenRandNum]);

      if (selectedObject.length > 0) {
        console.log("has");
        updateObject(
          selectedObject[0],
          selectedObject[1],
          selectedObject[2],
          data[gottenRandNum].src.original,
        );
        const val = data[gottenRandNum].width / data[gottenRandNum].height;
        updateObject(selectedObject[0], selectedObject[1], "aspectRatio", val);
      } else {
        updateObject(
          undefined,
          undefined,
          "backgroundImageUrl",
          data[gottenRandNum].src.original,
        );
      }
    });
}

export function fetchStyles(type, updateNewSlidePrefabs) {
  fetch(`/styles?type=${type}`, {
    method: "get",
  })
    .then((res) => res.json())
    .then((data) => {
      updateNewSlidePrefabs(data);
    });
}

export function fetchAllStyles(updatePrefabTypes) {
  fetch(`/styles/all`, {
    method: "get",
  })
    .then((res) => res.json())
    .then((data) => {
      updatePrefabTypes(data);
    });
}
