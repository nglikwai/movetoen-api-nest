export const moveElementInArray = (array, elementToMove, targetElement) => {
  const arrayCopy = [...array];

  // Find the indices of the element to move and the target element
  const fromIndex = arrayCopy.indexOf(elementToMove);
  const toIndex = arrayCopy.indexOf(targetElement);

  // Check if the elements exist in the array
  if (fromIndex === -1 || toIndex === -1) {
    console.error('Element not found in the array');
    return arrayCopy; // Return the original array if elements are not found
  }

  // Remove the element to move from the array
  arrayCopy.splice(fromIndex, 1);

  // Calculate the new index after the target element
  const newIndex = toIndex < fromIndex ? toIndex + 1 : toIndex;

  // Insert the element at the new index
  arrayCopy.splice(newIndex, 0, elementToMove);

  return arrayCopy;
};
