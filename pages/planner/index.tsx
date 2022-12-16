import { useRouter } from "next/router";
import React, { FormEvent, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsSoundwave, BsSearch, BsMic } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { Tooltip } from "recharts";
import { faUserCircle } from "@fortawesome/pro-light-svg-icons";

import PlanCard from "../../component/module/Planner/PlanCard.component";
import AppdownLoadCard from "../../components/recipe/recipeDiscovery/AppdownLoadCard/AppdownLoadCard.component";
import ContentTray from "../../components/recipe/recipeDiscovery/ContentTray/ContentTray.component";

import useOnClickOutside from "../../components/utility/useOnClickOutside";
import AContainer from "../../containers/A.container";
import Icon from "../../component/atoms/Icon/Icon.component";
import WeekPicker from "../../component/molecules/DatePicker/Week.component";

import classes from "../../components/searchBar/SearchBar.module.scss";
import styles from "../../styles/pages/planner.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@apollo/client";
import { GET_ALL_PLANS, GET_FEATURED_PLANS } from "../../graphql/Planner";

const PlanDiscovery = ({
  input = "",
  setInput = () => {},
  handleSubmitFunc = () => {},
  handleSearchTagCleanFunc = () => {},
  openPanel = () => {},
  isOpenPanel = false,
  isSearchTag = false,
  handleOnChange = () => {},
}) => {
  const router = useRouter();
  const { data } = useQuery(GET_FEATURED_PLANS);

  const [isInputFocus, setIsInputFocus] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useOnClickOutside(inputRef, () => {
    setIsSubmit(false);
    setIsInputFocus(false);
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input) {
      setIsSubmit(true);
      handleSubmitFunc();
    }
  };

  const handleClean = () => {
    //@ts-ignore
    setInput("");
    setIsSubmit(false);
    setIsInputFocus(false);
    // inputRef?.current?.focus();
  };

  const handleSearchTagClean = () => {
    handleSearchTagCleanFunc();
    setIsSubmit(false);
    setIsInputFocus(false);
  };

  return (
    <AContainer
      headerTitle="MEAL PLAN DISCOVERY"
      showGroceryTray={{
        show: false,
        showPanle: "right",
        // showTagByDeafult: showGroceryTray,
      }}
    >
      <div className={styles.discovery}>
        <div className={classes.searchBarContainer}>
          <div className={classes.inputContainer} ref={inputRef}>
            <div
              className={classes.filterIconContainer}
              style={
                isOpenPanel ? { marginRight: "10px", paddingRight: "20px" } : {}
              }
            >
              {isOpenPanel ? null : (
                <FiFilter
                  className={`${classes.filterIcon} ${
                    isOpenPanel ? classes.active : ""
                  }`}
                  onClick={openPanel}
                />
              )}
            </div>
            <div className={classes.inputBox}>
              {isInputFocus ? null : isMicOn ? (
                <BsSoundwave className={classes.waveIcon} />
              ) : (
                <BsSearch className={classes.seachIcon} />
              )}
              <form onSubmit={handleSubmit}>
                <input
                  style={
                    isOpenPanel ? { width: "30vw", minWidth: "200px" } : {}
                  }
                  disabled={isMicOn}
                  placeholder={isMicOn ? "Speak" : "Search"}
                  value={input}
                  onChange={(e) => handleOnChange()}
                  onFocus={() => setIsInputFocus(true)}
                />
              </form>

              {isSubmit ? (
                <AiOutlineClose
                  className={classes.seachIconActive}
                  onClick={handleClean}
                />
              ) : isInputFocus ? (
                <BsSearch
                  className={`${classes.seachIconActive}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (input) {
                      setIsSubmit(true);
                    }
                  }}
                />
              ) : (
                <>
                  {isSearchTag ? (
                    <AiOutlineClose
                      className={classes.seachIconActive}
                      onClick={handleSearchTagClean}
                    />
                  ) : (
                    //@ts-ignore
                    <Tooltip direction="bottom" content="Voice search">
                      <BsMic
                        className={`${classes.mic} ${
                          isMicOn ? classes.active : ""
                        }`}
                        onClick={() => setIsMicOn(!isMicOn)}
                      />
                    </Tooltip>
                  )}
                </>
              )}
            </div>
          </div>
          <button
            className={styles.discovery__myplan}
            onClick={() => router.push("/planner/plan/")}
          >
            <Icon fontName={faUserCircle} className="mr-20" size="2rem" />
            My Plans
          </button>
        </div>

        <AppdownLoadCard />
        <div className="mt-40">
          <ContentTray
            heading="Recommended"
            image="/images/thumbs-up.svg"
            allUrl="planner/recommended"
          >
            {data?.getAllRecommendedPlans?.map((item) => (
              <div key={item?._id}>
                <div className="mr-10">
                  <PlanCard planId={item?._id} title={item.planName} />
                </div>
              </div>
            ))}
          </ContentTray>
        </div>
        <div className="mt-40">
          <ContentTray
            heading="Recent"
            image="/images/clock-light.svg"
            allUrl="planner/recommended"
          >
            {data?.getAllRecentPlans?.map((item) => (
              <div key={item?._id}>
                <div className="mr-10">
                  <PlanCard planId={item?._id} title={item.planName} />
                </div>
              </div>
            ))}
          </ContentTray>
        </div>
        <div className="mt-40">
          <ContentTray
            heading="Popular"
            image="/images/fire-alt-light.svg"
            allUrl="planner/recommended"
          >
            {data?.getAllPopularPlans?.map((item) => (
              <div key={item?._id}>
                <div className="mr-10">
                  <PlanCard planId={item?._id} title={item.planName} />
                </div>
              </div>
            ))}
          </ContentTray>
        </div>
      </div>
    </AContainer>
  );
};

export default PlanDiscovery;
