import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setOpenFilterTray } from "../../../redux/slices/sideTraySlice";
import { WikiType } from "../../../type/wikiListType";
import CommonSearchBar from "../../searchBar/CommonSearchBar";

interface Props {
  openTray?: boolean;
  setOpenTray?: (agr: boolean) => void | Dispatch<SetStateAction<boolean>>;
  type?: WikiType;
}

const WikiSearchBar = ({
  openTray = false,
  setOpenTray = () => {},
  type = "Ingredient",
}: Props) => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const { dbUser } = useAppSelector((state) => state?.user);

  const toggleFilterPanel = () => {
    setOpenTray(true);
  };
  const handleSubmit = () => {};
  const handleSearchTagClean = () => {};
  return (
    <CommonSearchBar
      input={input}
      setInput={setInput}
      handleSubmitFunc={handleSubmit}
      handleSearchTagCleanFunc={handleSearchTagClean}
      openPanel={toggleFilterPanel}
      compareButton={{
        icon: dbUser?.wikiCompareCount
          ? "/images/compare-fill-icon.svg"
          : "/icons/eclipse.svg",
        disable: dbUser?.wikiCompareCount ? true : false,
        handleClick: () => router.push(`/wiki/compare`),
        style: {
          backgroundColor: dbUser?.wikiCompareCount ? "inherit" : "#ececec",
        },
        text: `Compare(${
          dbUser?.wikiCompareCount ? dbUser?.wikiCompareCount : 0
        })`,
      }}
      isOpenPanel={openTray}
      isSearchTag={false}
      comeFromWhichPage="wiki"
      wikiType={type}
    />
  );
};

export default WikiSearchBar;
