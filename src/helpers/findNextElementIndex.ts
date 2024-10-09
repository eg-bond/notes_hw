export function findNextArrElementIndex<T>(array: T[], index: number): number {
  // if it's the only element in the array return -1
  if (array.length === 1) return -1;
  // If it's the last element, return the index of the previous element
  if (index === array.length - 1) {
    return index - 1;
  }
  // return next index in the array
  return index + 1;
}
