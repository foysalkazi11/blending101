function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (!deepEqual(arr1[i], arr2[i])) {
      return false;
    }
  }

  return true;
}

function deepEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  if (
    typeof obj1 === "object" &&
    obj1 !== null &&
    typeof obj2 === "object" &&
    obj2 !== null
  ) {
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      return compareArrays(obj1, obj2);
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (!obj2.hasOwnProperty(key)) {
        return false;
      }

      if (!deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

  return false;
}

export default compareArrays;
