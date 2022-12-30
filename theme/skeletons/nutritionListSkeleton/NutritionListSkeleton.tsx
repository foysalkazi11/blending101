import React from "react";
import SkeletonElement from "../SkeletonElement";

const NutritionListSkeleton = () => {
  const randomNum = (value = 100): number => {
    const result = Math.floor(Math.random() * value);
    return result >= 30 ? result : result + 10;
  };
  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 22, 33, 44, 55, 66, 77, 88, 99, 12, 23,
    45, 67, 89, 21, 32, 54, 65, 76, 98, 876,
  ];
  return (
    <>
      {arr?.map((item) => {
        return (
          <SkeletonElement
            key={item}
            type="text"
            style={{ width: `${randomNum()}%` }}
          />
        );
      })}
    </>
  );
};

export default NutritionListSkeleton;
