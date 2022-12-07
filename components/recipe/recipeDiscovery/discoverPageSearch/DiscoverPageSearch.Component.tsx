import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setIngredients,
  setOpenFilterTray,
  setBlendTye,
} from "../../../../redux/slices/sideTraySlice";
import { useRouter } from "next/router";
import CommonSearchBar from "../../../searchBar/CommonSearchBar";

interface Props {
  input?: string;
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DiscoverPageSearch = ({
  handleOnChange = () => {},
  input = "",
}: Props) => {
  const router = useRouter();

  const { openFilterTray, blends, ingredients } = useAppSelector(
    (state) => state?.sideTray,
  );
  const { dbUser } = useAppSelector((state) => state?.user);
  const dispatch = useAppDispatch();

  const toggleFilterPanel = () => {
    dispatch(setOpenFilterTray(!openFilterTray));
  };

  const handleSubmit = () => {
    //
  };

  const handleSearchTagClean = () => {
    dispatch(setIngredients([]));
    dispatch(setBlendTye([]));
  };

  return (
    <CommonSearchBar
      input={input}
      handleOnChange={handleOnChange}
      handleSubmitFunc={handleSubmit}
      handleSearchTagCleanFunc={handleSearchTagClean}
      openPanel={toggleFilterPanel}
      compareButton={{
        icon: dbUser?.compareLength
          ? "/images/compare-fill-icon.svg"
          : "/icons/eclipse.svg",
        disable: dbUser?.compareLength ? false : true,
        handleClick: () => router.push(`/recipe/compare`),
        style: {
          backgroundColor: dbUser?.compareLength ? "inherit" : "#ececec",
        },
        text: `Compare(${dbUser?.compareLength ? dbUser?.compareLength : 0})`,
      }}
      isOpenPanel={openFilterTray}
      isSearchTag={blends?.length || ingredients?.length ? true : false}
      comeFromWhichPage="discovery"
    />
  );
};

export default DiscoverPageSearch;
