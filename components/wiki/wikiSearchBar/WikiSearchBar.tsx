import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import RecipeDiscoverButton from "../../../theme/button/recipeDiscoverButton/RecipeDiscoverButton";
import Tooltip from "../../../theme/toolTip/CustomToolTip";
import { WikiType } from "../../../type/wikiListType";
import CommonSearchBar from "../../searchBar/CommonSearchBar";
import { useUser } from "../../../context/AuthProvider";
import { setIsOpenWikiFilterTray } from "redux/slices/wikiSlice";

interface WikiSearchBarProps {
  openTray?: boolean;
  setOpenTray?: (agr: boolean) => void | Dispatch<SetStateAction<boolean>>;
  type?: WikiType;
  input?: string;
  setInput?: React.Dispatch<React.SetStateAction<string>>;
}

const WikiSearchBar = ({
  input = "",
  setInput = () => {},
  openTray = false,
  setOpenTray = () => {},
}: WikiSearchBarProps) => {
  const dispatch = useAppDispatch();
  const wikiCompareCount = useAppSelector((state) => state.wiki.wikiCompareCount);
  const router = useRouter();
  // const { dbUser, userCompareLength } = useAppSelector((state) => state?.user);

  const toggleTray = () => {
    // dispatch(setIsOpenWikiFilterTray(!isOpenWikiFilterTray));
    setOpenTray(!openTray);
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleSubmit = () => {};
  const handleSearchTagClean = () => {};
  return (
    <div className="flex ai-center">
      <CommonSearchBar
        input={input}
        setInput={setInput}
        handleSubmitFunc={handleSubmit}
        handleSearchTagCleanFunc={handleSearchTagClean}
        openFilterPanel={toggleTray}
        isFilterPanelOpen={openTray}
        isSearchTag={false}
        showFilterIcon={true}
        handleOnChange={handleOnChange}
      />

      <Tooltip content="Compare wiki" direction="bottom">
        <RecipeDiscoverButton
          icon={wikiCompareCount ? "/images/compare-fill-icon.svg" : "/icons/eclipse.svg"}
          text={`Compare(${wikiCompareCount})`}
          disable={wikiCompareCount ? false : true}
          style={{
            backgroundColor: wikiCompareCount ? "#fff" : "#ececec",
            marginLeft: "2rem",
          }}
          handleClick={() => router.push(`/wiki/compare`)}
        />
      </Tooltip>
    </div>
  );
};

export default WikiSearchBar;
