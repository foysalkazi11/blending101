import { faBooks } from "@fortawesome/pro-thin-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useCallback, useEffect, useMemo, useState } from "react";
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
import WikiBanner from "./wikiBanner/WikiBanner";

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

export type WikiTypeSectionDetails =
  | {
      wikiTypeSection: "list";
      searchInput?: string; // Common property
      // Properties specific to "list" type
      wikiType: WikiType;
      wikiId?: string;
    }
  | {
      wikiTypeSection: "theme";
      searchInput?: string; // Common property
      // Properties specific to "theme" type when isSelectedTheme is true
      isSelectedTheme: true;
      activeTheme: { [key: string]: any };
    }
  | {
      wikiTypeSection: "theme";
      searchInput?: string; // Common property
      // Properties specific to "theme" type when isSelectedTheme is false
      isSelectedTheme: false;
    };

const WikiHome = () => {
  const [wikiTypeSectionDetails, setWikiTypeSectionDetails] = useState<WikiTypeSectionDetails>({
    wikiTypeSection: "theme",
    isSelectedTheme: false,
  });
  const [openFilterTray, setOpenFilterTray] = useState(false);
  const [wikiList, setWikiList] = useState<WikiListTypeWithTotal>({ total: 0, wikiList: [] });
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedWikiItem, setSelectedWikiItem] = useLocalStorage<SelectedWikiType>("selectedWikiItem", {});
  // const [type, setType] = useLocalStorage<WikiType>("wikiType", "");
  // const [selectedWikiType, setSelectedWikiType] = useLocalStorage<SelectedWikiTypeProps>("selectedWikiType", {
  //   wikiType: "",
  //   category: "",
  //   selectedItems: [],
  //   searchTerm: "",
  // });
  // const [activeTheme, setActiveTheme] = useState<{ [key: string]: any }>({});
  // const [toggleMenu, setToggleMenu] = useState(0);

  const router = useRouter();
  const query = router?.query;
  const { params = [] } = query;
  const wikiType: string = params?.[0] || "";
  const wikiId = params?.[1] || "";
  const { width } = useWindowSize();
  const { handleWikiFilter, loading } = useToWikiFilter();
  const deBoundValue = useDebounce(searchTerm, 300);
  const isMounted = useIsMounted();
  const [pageNum, setPageNum] = useState(1);

  const handleChangeWikiTypeSectionDetails = (value: WikiTypeSectionDetails) => {
    setWikiTypeSectionDetails(value);
  };

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
    if (wikiTypeSectionDetails?.wikiTypeSection === "list") {
      handleWikiFilterFunc(
        {
          wikiType: wikiTypeSectionDetails?.wikiType,
          category: "",
          selectedItems: [],
          searchTerm: "",
        },
        pageNum + 1,
        dataLimit,
      );
      setPageNum((pre) => pre + 1);
    }
  };

  // const handleUpdateWikiSection = (type?: WikiType, changeTab?: true) => {
  //   setSelectedWikiType({ wikiType: type || "", category: "", selectedItems: [], searchTerm: "" });
  //   setSearchTerm("");
  //   if (changeTab) {
  //     setToggleMenu(0);
  //   }
  // };

  // const checkActiveWiki = (id: string) => {
  //   return activeTheme?._id === id;
  // };
  const checkActiveWikiTheme = (id: string) => {
    return (
      wikiTypeSectionDetails.wikiTypeSection === "theme" &&
      wikiTypeSectionDetails.isSelectedTheme &&
      wikiTypeSectionDetails.activeTheme?._id === id
    );
  };
  const wikiThemeOnClick = (wikiThemeData: { [key: string]: any }) => {
    //wikiThemeData?._id
    if (checkActiveWikiTheme(wikiThemeData?._id)) {
      // setActiveTheme({});
      handleChangeWikiTypeSectionDetails({
        wikiTypeSection: "theme",
        isSelectedTheme: false,
      });
    } else {
      handleChangeWikiTypeSectionDetails({
        wikiTypeSection: "theme",
        isSelectedTheme: true,
        activeTheme: wikiThemeData,
      });

      setWikiList({
        total: wikiThemeData?.data?.Wiki?.length,
        wikiList: wikiThemeData?.data?.Wiki,
      });
      // setActiveTheme(wikiThemeData);
    }
  };

  useEffect(() => {
    if (isMounted()) {
      if (
        wikiTypeSectionDetails?.wikiTypeSection === "list" &&
        wikiTypeSectionDetails?.wikiType &&
        !wikiTypeSectionDetails?.wikiId
      ) {
        handleWikiFilterFunc(
          { wikiType: wikiTypeSectionDetails?.wikiType, category: "", selectedItems: [] },
          1,
          dataLimit,
        );
        setPageNum(1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wikiTypeSectionDetails?.wikiTypeSection === "list" && wikiTypeSectionDetails?.wikiType]);

  // useEffect(() => {
  //   if (!selectedWikiType?.wikiType) setToggleMenu(1);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (isMounted()) {
      if (deBoundValue) {
        router?.push(`/wiki?search=${deBoundValue}`);
      }

      // else {
      //   router?.push(`/wiki`);
      // }
      // if (deBoundValue) {
      //   handleWikiFilterFunc({ searchTerm: deBoundValue, wikiType: "", category: "", selectedItems: [] });
      // }
    }
    // setSelectedWikiType({ searchTerm: deBoundValue, wikiType: "", category: "", selectedItems: [] });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deBoundValue]);

  // render ui
  const renderUI = (wikiTypeSectionDetails: WikiTypeSectionDetails) => {
    let component: React.ReactChild = null;
    switch (wikiTypeSectionDetails.wikiTypeSection) {
      case "list":
        if (wikiTypeSectionDetails?.wikiId) {
          component = <WikiSingleItem />;
        } else {
          component = (
            <WikiSingleType
              // type={selectedWikiType?.wikiType}
              // setType={handleUpdateWikiSection}
              // selectedWikiItem={selectedWikiItem}
              // setSelectedWikiItem={setSelectedWikiItem}
              wikiList={wikiList?.wikiList}
              loading={loading}
              handleCloseFilterOrSearchResult={handleChangeWikiTypeSectionDetails}
              title={`All ${wikiTypeSectionDetails?.wikiType || "Results"} (${wikiList?.total}) `}
              hasMore={wikiList?.total ? wikiList?.total > dataLimit * pageNum : false}
              nextPage={handleNextPage}
              setWikiList={setWikiList}
            />
          );
        }
        break;
      case "theme":
        if (wikiTypeSectionDetails.isSelectedTheme) {
          component = (
            <WikiSingleType
              wikiList={wikiList?.wikiList}
              handleCloseFilterOrSearchResult={() => {
                handleChangeWikiTypeSectionDetails({
                  wikiTypeSection: "theme",
                  isSelectedTheme: false,
                });
                // setActiveTheme({});
              }}
              title={`${wikiTypeSectionDetails?.activeTheme?.displayName} (${wikiTypeSectionDetails?.activeTheme?.data?.Wiki?.length}) `}
            />
          );
        } else {
          if (wikiTypeSectionDetails?.searchInput) {
            component = (
              <WikiSingleType
                // type={selectedWikiType?.wikiType}
                // setType={handleUpdateWikiSection}
                // selectedWikiItem={selectedWikiItem}
                // setSelectedWikiItem={setSelectedWikiItem}
                wikiList={wikiList?.wikiList}
                loading={loading}
                handleCloseFilterOrSearchResult={handleChangeWikiTypeSectionDetails}
                title={`Search Results (${wikiList?.total}) `}
                hasMore={wikiList?.total ? wikiList?.total > dataLimit * pageNum : false}
                nextPage={handleNextPage}
                setWikiList={setWikiList}
              />
            );
          } else {
            component = <WikiLanding setType={handleChangeWikiTypeSectionDetails} />;
          }
        }
        break;
      // case "search":
      //   component = (
      //     <WikiSingleType
      //       // type={selectedWikiType?.wikiType}
      //       // setType={handleUpdateWikiSection}
      //       // selectedWikiItem={selectedWikiItem}
      //       // setSelectedWikiItem={setSelectedWikiItem}
      //       wikiList={wikiList?.wikiList}
      //       loading={loading}
      //       handleCloseFilterOrSearchResult={handleChangeWikiTypeSectionDetails}
      //       title={`All ${"search Results"} (${wikiList?.total}) `}
      //       hasMore={wikiList?.total ? wikiList?.total > dataLimit * pageNum : false}
      //       nextPage={handleNextPage}
      //       setWikiList={setWikiList}
      //     />
      //   );
      //   break;

      default:
        component = <WikiLanding setType={handleChangeWikiTypeSectionDetails} />;
        break;
    }

    // if (wikiTypeSectionDetails) {
    //   component = <WikiSingleItem />;
    // } else if (type || searchTerm) {
    //   component = (
    //     <WikiSingleType
    //       // type={selectedWikiType?.wikiType}
    //       // setType={handleUpdateWikiSection}
    //       selectedWikiItem={selectedWikiItem}
    //       setSelectedWikiItem={setSelectedWikiItem}
    //       wikiList={wikiList?.wikiList}
    //       loading={loading}
    //       handleCloseFilterOrSearchResult={handleUpdateWikiSection}
    //       title={`All ${selectedWikiType?.wikiType || "Results"} (${wikiList?.total}) `}
    //       hasMore={wikiList?.total ? wikiList?.total > dataLimit * pageNum : false}
    //       nextPage={handleNextPage}
    //       setWikiList={setWikiList}
    //     />
    //   );
    // } else if (activeTheme?._id) {
    //   component = (
    //     <WikiSingleType
    //       wikiList={activeTheme?.data?.Wiki}
    //       handleCloseFilterOrSearchResult={() => setActiveTheme({})}
    //       title={`${activeTheme?.displayName} (${activeTheme?.data?.Wiki?.length}) `}
    //     />
    //   );
    // } else {
    //   component = <WikiLanding setType={handleUpdateWikiSection} />;
    // }

    return component;
  };

  useEffect(() => {
    if (wikiType && wikiId) {
      setWikiTypeSectionDetails({
        wikiTypeSection: "list",
        wikiId: wikiId,
        wikiType: wikiType as WikiType,
      });
    } else if (wikiType) {
      setWikiTypeSectionDetails({
        wikiTypeSection: "list",
        wikiType: wikiType as WikiType,
      });
    } else if (query?.search) {
      setWikiTypeSectionDetails({
        wikiTypeSection: "theme",
        isSelectedTheme: false,
        searchInput: query?.search as string,
      });
      handleWikiFilterFunc(
        { wikiType: "", category: "", selectedItems: [], searchTerm: query?.search as string },
        1,
        dataLimit,
      );
      setPageNum(1);
    } else {
      setWikiTypeSectionDetails({
        wikiTypeSection: "theme",
        isSelectedTheme: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wikiId, wikiType, query?.search]);

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
        <WikiBanner />

        <div className={styles.wikiContentContainer}>
          <div className={styles.left}>
            <WikiLeft
              currentWikiType={wikiType as WikiType}
              currentWikiId={wikiId}
              showWikiTypeHeader={false}
              // selectedWikiType={selectedWikiType}
              // setSelectedWikiType={setSelectedWikiType}
              toggle={wikiTypeSectionDetails}
              setToggle={setWikiTypeSectionDetails}
              // setInput={setSearchTerm}
              wikiThemeOnClick={wikiThemeOnClick}
              wikiTypeSectionDetails={wikiTypeSectionDetails}
            />
          </div>
          <div className={styles.center}>
            {/* {renderUI(wikiType, wikiId, activeTheme, selectedWikiType?.wikiType, selectedWikiType?.searchTerm)} */}
            {renderUI(wikiTypeSectionDetails)}
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
            // selectedWikiType={selectedWikiType}
            // setSelectedWikiType={setSelectedWikiType}
            toggle={wikiTypeSectionDetails}
            setToggle={setWikiTypeSectionDetails}
            wikiThemeOnClick={wikiThemeOnClick}
            wikiTypeSectionDetails={wikiTypeSectionDetails}
          />
        </TrayWrapper>
      </div>
    </Fragment>
  );
};

export default WikiHome;
