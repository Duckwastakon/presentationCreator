export function getImage(
  event,
  usedImages,
  updateUsedImages,
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
        console.log(selectedObject);
        found = true;
        let currentImageId;
        if (selectedObject[0] != undefined && selectedObject[0] != "") {
          currentImageId =
            currentSlideVariables[selectedObject[0]][selectedObject[1]]["src"];
        } else {
          currentImageId = currentSlideVariables["backgroundImageUrl"];
        }
        let i = 0;
        for (const img of entry[1]) {
          console.log(currentImageId);
          if (img.src.original === currentImageId) {
            console.log("got same pic");
            if (i + 1 >= entry[1].length) i = 0;

            if (selectedObject.length > 0 && selectedObject[0] !== "") {
              updateObject(
                selectedObject[0],
                selectedObject[1],
                selectedObject[2],
                entry[1][i + 1].src.original,
              );
              //const val = entry[1][i + 1].width / entry[1][i + 1].height;
              //updateObject(
              //  selectedObject[0],
              //  selectedObject[1],
              //  "aspectRatio",
              //  val,
              //);
            } else {
              console.log("bg");
              console.log(entry[1][i + 1].src.original);
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

        updateObject(
          selectedObject[0],
          selectedObject[1],
          selectedObject[2],
          entry[1][0].src.original,
        );

        console.log(savedImages);
      }
    });
  }
  console.log(found);
  if (!found) {
    fetchImage(query, selectedObject, updateUsedImages, updateObject);
  }
}

export function fetchImage(
  query,
  selectedObject,
  updateUsedImages,
  updateObject,
) {
  fetch(`/API?query=${query}`, {
    method: "get",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("gettingNewPhotos");
      console.log(data);

      updateUsedImages(data, query);
      var gottenRandNum = Math.floor(Math.random() * 4);
      console.log(gottenRandNum, data[gottenRandNum]);

      if (selectedObject.length > 0 && selectedObject[0] !== "") {
        console.log("has");
        console.log(selectedObject);
        updateObject(
          selectedObject[0],
          selectedObject[1],
          selectedObject[2],
          data[gottenRandNum].src.original,
        );
        const val = data[gottenRandNum].width / data[gottenRandNum].height;
        //updateObject(selectedObject[0], selectedObject[1], "aspectRatio", val);
      } else {
        console.log("updateBackground");
        updateObject(
          undefined,
          undefined,
          "backgroundImageUrl",
          data[gottenRandNum].src.original,
        );
      }
    });
}

export function fetchStyles(type, updateNewSlidePrefabs, SaveNewChanges) {
  fetch(`/styles?type=${type}`, {
    method: "get",
  })
    .then((res) => res.json())
    .then((data) => {
      updateNewSlidePrefabs(data);
      SaveNewChanges({
        newSlidePrefabsOverride: data,
        selectedPrefabType: type,
      });
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

export async function savePresentation(allSlides, presentationsName) {
  const resp = await fetch("/generateFile/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slides: allSlides, presentationName: presentationsName }),
  });

  const blob = await resp.blob();

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${presentationsName}.pptx`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
}
