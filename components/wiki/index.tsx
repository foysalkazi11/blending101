import { faBooks } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import useLocalStorage from "../../customHooks/useLocalStorage";
import { WikiListType, WikiType } from "../../type/wikiListType";
import TrayTag from "../sidetray/TrayTag";
import TrayWrapper from "../sidetray/TrayWrapper";
import styles from "./wiki.module.scss";
import WikiLanding from "./wikiLanding/WikiLanding";
import WikiLeft from "./WikiLeft/WikiLeft";
import WikiSingleType from "./wikiSingleType/WikiSingleType";
import { useRouter } from "next/router";
import WikiSingleItem from "./wikiSingleItem/WikiSingleItem";
import useWindowSize from "../utility/useWindowSize";
import WikiCommentsTray from "../sidetray/wikiCommentsTray";
import WikiSearchBar from "./wikiSearchBar/WikiSearchBar";
import notification from "components/utility/reactToastifyNotification";
import useToWikiFilter from "customHooks/wiki/useToWikiFilter";
import useDebounce from "customHooks/useDebounce";
import { useIsMounted } from "customHooks/useIsMounted";

const dataLimit = 12;

export type WikiListTypeWithTotal = { total: number; wikiList: WikiListType[] };

export type SelectedWikiType = {
  [key in WikiType]: string;
};

export type SelectedWikiTypeProps = {
  wikiType: WikiType;
  category: string;
  selectedItems: string[];
  searchTerm?: string;
};

const WikiHome = () => {
  const [openFilterTray, setOpenFilterTray] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedWikiItem, setSelectedWikiItem] = useLocalStorage<SelectedWikiType>("selectedWikiItem", {});
  // const [type, setType] = useLocalStorage<WikiType>("type", "");
  const [selectedWikiType, SetSelectedWikiType] = useLocalStorage<SelectedWikiTypeProps>("selectedWikiType", {
    wikiType: "",
    category: "",
    selectedItems: [],
    searchTerm: "",
  });
  const router = useRouter();
  const { params = [] } = router?.query;
  const wikiType: string = params?.[0] || "";
  const wikiId = params?.[1] || "";
  const { width } = useWindowSize();
  const [toggleMenu, setToggleMenu] = useState(0);
  const [wikiList, setWikiList] = useState<WikiListTypeWithTotal>({ total: 0, wikiList: [] });
  const { handleWikiFilter, loading } = useToWikiFilter();
  const deBoundValue = useDebounce(searchTerm, 300);
  const isMounted = useIsMounted();
  const [pageNum, setPageNum] = useState(1);

  const handleWikiFilterFunc = async (selectedWikiType: SelectedWikiTypeProps, page = 1, limit = 12) => {
    try {
      const data = await handleWikiFilter(selectedWikiType, page, limit);
      setWikiList((prev) => ({
        total: data?.total,
        wikiList: page > 1 ? [...prev?.wikiList, ...data?.wikiList] : data?.wikiList,
      }));
    } catch (error) {
      notification("error", error?.message || "Failed to filter wiki");
    }
  };

  const handleNextPage = () => {
    handleWikiFilterFunc(selectedWikiType, pageNum + 1, dataLimit);
    setPageNum((pre) => pre + 1);
  };

  const handleUpdateWikiSection = (type?: WikiType, changeTab?: true) => {
    SetSelectedWikiType({ wikiType: type || "", category: "", selectedItems: [], searchTerm: "" });
    setSearchTerm("");
    if (changeTab) {
      setToggleMenu(0);
    }
  };

  useEffect(() => {
    if (isMounted) {
      handleWikiFilterFunc(selectedWikiType, 1, dataLimit);
      setPageNum(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWikiType]);

  useEffect(() => {
    if (!selectedWikiType?.wikiType) setToggleMenu(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMounted && deBoundValue)
      SetSelectedWikiType({ searchTerm: deBoundValue, wikiType: "", category: "", selectedItems: [] });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deBoundValue]);

  // render ui
  const renderUI = (wikiType, type: WikiType, searchTerm: string) => {
    let component: React.ReactChild = null;
    // if (wikiType) {
    //   component = <WikiSingleItem />;
    // } else {
    // }

    if (type || searchTerm) {
      component = (
        <WikiSingleType
          // type={selectedWikiType?.wikiType}
          // setType={handleUpdateWikiSection}
          // selectedWikiItem={selectedWikiItem}
          // setSelectedWikiItem={setSelectedWikiItem}
          wikiList={wikiList?.wikiList}
          loading={loading}
          handleCloseFilterOrSearchResult={handleUpdateWikiSection}
          title={`All ${selectedWikiType?.wikiType || "Results"} (${wikiList?.total}) `}
          hasMore={wikiList?.total ? wikiList?.total > dataLimit * pageNum : false}
          nextPage={handleNextPage}
          setWikiList={setWikiList}
        />
      );
    } else {
      component = <WikiLanding setType={handleUpdateWikiSection} />;
    }

    return component;
  };

  return (
    <Fragment>
      <WikiCommentsTray showTagByDefaut={false} showPanle={"right"} />
      <div className={styles.wikiPageContainer}>
        <WikiSearchBar
          input={searchTerm}
          setInput={setSearchTerm}
          openTray={width > 1280 ? true : openFilterTray}
          setOpenTray={setOpenFilterTray}
        />
        {/* <WikiBanner /> */}

        <div className={styles.wikiContentContainer}>
          <div className={styles.left}>
            <WikiLeft
              currentWikiType={wikiType as WikiType}
              currentWikiId={wikiId}
              showWikiTypeHeader={false}
              selectedWikiType={selectedWikiType}
              SetSelectedWikiType={SetSelectedWikiType}
              toggle={toggleMenu}
              setToggle={setToggleMenu}
              setInput={setSearchTerm}
            />
          </div>
          <div className={styles.center}>
            {renderUI(wikiType, selectedWikiType?.wikiType, selectedWikiType?.searchTerm)}
          </div>
        </div>
      </div>

      <div className={width < 1280 ? "show" : "hide"}>
        <TrayWrapper
          isolated={true}
          showPanel="left"
          showTagByDefault={width < 1280 && openFilterTray ? true : false}
          openTray={openFilterTray}
          panelTag={(hover) => (
            <TrayTag
              hover={hover}
              icon={<FontAwesomeIcon icon={faBooks} />}
              placeMent="left"
              handleTagClick={() => setOpenFilterTray((prev) => !prev)}
            />
          )}
        >
          <WikiLeft
            currentWikiType={wikiType as WikiType}
            currentWikiId={wikiId}
            showWikiTypeHeader={false}
            selectedWikiType={selectedWikiType}
            SetSelectedWikiType={SetSelectedWikiType}
            toggle={toggleMenu}
            setToggle={setToggleMenu}
          />
        </TrayWrapper>
      </div>
    </Fragment>
  );
};

export default WikiHome;
