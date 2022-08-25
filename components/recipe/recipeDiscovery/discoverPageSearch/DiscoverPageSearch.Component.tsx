import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setIngredients,
  setOpenFilterTray,
  setBlendTye,
} from "../../../../redux/slices/sideTraySlice";
import { useRouter } from "next/router";
import CommonSearchBar from "../../../searchBar/CommonSearchBar";

const DiscoverPageSearch = () => {
  const router = useRouter();
  const [input, setInput] = useState("");
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

  useEffect(() => {
    let str: string = input;

    str = [
      ...blends?.map((item) => `${item?.title}`),
      ...ingredients?.map((item) => `${item?.title}`),
    ]?.join(", ");
    setInput(str);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blends, ingredients]);

  return (
    <CommonSearchBar
      input={input}
      setInput={setInput}
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
