/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import { GET_ALL_BLEND_NUTRIENTS } from "../../gqlLib/recipeDiscovery/query/recipeDiscovery";
import DropdownTwoComponent from "../dropDown/dropdownTwo.component";
import styles from "./calcium.module.scss";

interface calciumStyle {
  style: any;
}

interface CalciumSearchElemInterface {
  ascendingDescending?: any;
  setascendingDescending?: any;
  list?: any;
  setList?: any;
  dropDownState?: any;
  setDropDownState?: any;
}
const CalciumSearchElem = ({
  ascendingDescending,
  setascendingDescending,
  list,
  setList,
  dropDownState,
  setDropDownState,
}) => {
  const [sortState, curSortState] = useState(true);

  const SortingOrder = () => {
    curSortState(!sortState);
    setascendingDescending(!ascendingDescending);
    return sortState;
  };
  const { data: allBlendNutrients } = useQuery(GET_ALL_BLEND_NUTRIENTS);

  useEffect(() => {
    if (!allBlendNutrients?.getAllBlendNutrients) return;
    let tempArray = list;
    allBlendNutrients?.getAllBlendNutrients.map((itm) => {
      tempArray = [
        ...tempArray,
        { title: itm.nutrientName, val: itm.nutrientName, id: itm._id },
      ];
    });
    setList(tempArray);
  }, [allBlendNutrients?.getAllBlendNutrients]);

  useEffect(() => {
    setDropDownState(list[0]);
  }, [list]);

  return (
    <div className={styles.calciumMg}>
      <div style={{ width: "100%" }}>
        <DropdownTwoComponent
          value={dropDownState}
          list={list}
          setValue={setDropDownState}
        />
      </div>
      <div className={styles.calciumIcon}>
        <div>
          {sortState ? (
            <span>
              <FaSortAmountDown onClick={SortingOrder} />
            </span>
          ) : (
            <span>
              <FaSortAmountDownAlt onClick={SortingOrder} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalciumSearchElem;
