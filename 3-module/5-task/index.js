function getMinMax(str) {
  let sortedArr;
  sortedArr = str
    .split(' ')
    .filter((item) => !isNaN(item))
    .sort((a, b) => a - b);
  return {
    min: +sortedArr[0],
    max: +sortedArr.at(-1)
  };
}
