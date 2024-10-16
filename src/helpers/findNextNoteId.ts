import type { Note } from '@/types/dbTypes';

export function findNextNoteId(array: Note[], index: number): number {
  // if it's the only element in the array return -1
  if (array.length === 1) return -1;
  // If it's the last element, return the index of the previous element
  if (index === array.length - 1) {
    return array[index - 1].id;
  }
  // return next index in the array
  return array[index + 1].id;
}
