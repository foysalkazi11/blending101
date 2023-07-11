const generateDummyArray = <T>(count: number, value: T): T[] => {
  return Array(count).fill(value);
};

export default generateDummyArray;
