import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setOpenFilterTray } from "../../../../redux/slices/sideTraySlice";
import CommonSearchBar from "../../../searchBar/CommonSearchBar";

interface Props {
  input?: string;
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DiscoverPageSearch = ({
  handleOnChange = () => {},
  input = "",
}: Props) => {
  const { openFilterTray } = useAppSelector((state) => state?.sideTray);
  const { allFilters } = useAppSelector((state) => state?.filterRecipe);

  const dispatch = useAppDispatch();

  const toggleFilterPanel = () => {
    dispatch(setOpenFilterTray(!openFilterTray));
  };

  const handleSubmit = () => {
    //
  };

  return (
    <CommonSearchBar
      input={input}
      handleOnChange={handleOnChange}
      handleSubmitFunc={handleSubmit}
      openPanel={toggleFilterPanel}
      isOpenPanel={openFilterTray}
      // isSearchTag={allFilters?.length ? true : false}
      styles={{ marginLeft: "16px" }}
    />
  );
};

export default DiscoverPageSearch;
