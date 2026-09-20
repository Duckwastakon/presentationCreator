export async function getImage(
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
    await savedImages.map(async (entry) => {
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
              await updateObject(
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
              await updateObject(
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

        await updateObject(
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
    await fetchImage(query, selectedObject, updateUsedImages, updateObject);
  }
}

export async function fetchImage(
  query,
  selectedObject,
  updateUsedImages,
  updateObject,
) {
  await fetch(`/API?query=${query}`, {
    method: "get",
  })
    .then((res) => res.json())
    .then(async (data) => {
      updateUsedImages(data, query);
      var gottenRandNum = Math.floor(Math.random() * 4);
      console.log(gottenRandNum, data[gottenRandNum]);

      if (selectedObject.length > 0 && selectedObject[0] !== "") {
        let newSlide = await updateObject(
          selectedObject[0],
          selectedObject[1],
          selectedObject[2],
          data[gottenRandNum].src.original,
        );
        const val = data[gottenRandNum].width / data[gottenRandNum].height;
        updateObject(selectedObject[0], selectedObject[1], "aspectRatio", val, newSlide, false);
      } else {
        await updateObject(
          undefined,
          undefined,
          "backgroundImageUrl",
          data[gottenRandNum].src.original,
        );
      }
    }).finally(() => {
      return
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
    body: JSON.stringify({
      slides: allSlides,
      presentationName: presentationsName,
    }),
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
