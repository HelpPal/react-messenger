export function groupByEveryN(array, n) {
  const result = [];
  let temp = [];

  for (let i = 0; i < array.length; ++i) {
    if (i > 0 && i % n === 0) {
      result.push(temp);
      temp = [];
    }
    temp.push(array[i]);
  }
  if (temp.length > 0) {
    while (temp.length !== n) {
      temp.push(null);
    }
    result.push(temp);
  }
  return result;
}
