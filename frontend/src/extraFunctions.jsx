export function clamp(num, minimum, maximum) {
  let newNum = num;

  if (newNum > maximum) {
    newNum = maximum;
  }
  if (newNum < minimum) {
    newNum = minimum;
  }

  return newNum;
}

export function shuffleArray(arr) {
  for (let i = 0; i < arr.length * 3; i++) {
    const varPos1 = Math.floor(Math.random() * arr.length);
    const varPos2 = Math.floor(Math.random() * arr.length);
    const val1 = arr[varPos1];

    arr[varPos1] = arr[varPos2];
    arr[varPos2] = val1;
  }

  console.log(arr);
  return arr;
}
