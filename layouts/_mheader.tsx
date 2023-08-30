import React, { useState } from "react";
import IconButton from "../component/atoms/Button/IconButton.component";
import {
  faArrowLeft,
  faBarsSort,
  faSearch,
} from "@fortawesome/pro-regular-svg-icons";
import styles from "./_mheader.module.scss";
import SideDrawer from "../component/molecules/Drawer/SideDrawer.component";
import { Filter } from "../components/sidetray/planFilterTray";
import SearchtagsComponent, {
  HandleUpdateActiveFilterTagType,
  HandleUpdateFilterCriteriaType,
} from "../components/searchtags/searchtags.component";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useToAddPlanFilterCriteriaWithUrl from "../customHooks/planFilter/useToAddPlanFilterCriteriaWithUrl";
import useToUpdateActiveFilterTagForPlan from "../customHooks/planFilter/useToUpdateActiveFilterTagForPlan";
import useToUpdateFilterCriteriaForPlan from "../customHooks/planFilter/useToUpdateFilterCriteriaForPlan";
import {
  updatePlanFilterSearchTerm,
  setIsPlanFilterOpen,
} from "../redux/slices/planFilterSlice";
import CommonSearchBar from "../components/searchBar/CommonSearchBar";

const MHeader = () => {
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const { allFiltersForPlan } = useAppSelector((state) => state.planFilter);
  const { isPlanFilterOpen } = useAppSelector((state) => state?.planFilter);

  const allFilters = [].concat(...Object.values(allFiltersForPlan));

  // handle update recipe filter criteria
  const handleUpdateFilterCriteriaForPlan = useToUpdateFilterCriteriaForPlan();
  // handle update recipe active filter tag
  const handleUpdateActiveFilterTagForPlan =
    useToUpdateActiveFilterTagForPlan();
  // handle add plan Filter with url
  const handleAddFilterCriteriaWithUrl = useToAddPlanFilterCriteriaWithUrl();

  const handleUpdateFilterCriteriaForPlanFunc = (
    obj: HandleUpdateFilterCriteriaType,
  ) => {
    if (obj.filterCriteria === "searchTerm") {
      dispatch(updatePlanFilterSearchTerm(""));
      setSearchTerm("");
    } else {
      handleUpdateFilterCriteriaForPlan(obj);
    }
  };
  const handleUpdateActiveFilterTagFunc: HandleUpdateActiveFilterTagType = (
    activeSection,
    filterCriteria,
    activeTab,
    childTab,
  ) => {
    dispatch(setIsPlanFilterOpen(true));
    handleUpdateActiveFilterTagForPlan(
      activeSection,
      filterCriteria,
      activeTab,
      childTab,
    );
  };

  const [showFilter, setShowFilter] = useState(true);
  return (
    <div className={styles.header}>
      <IconButton fontName={faBarsSort} className={styles.header__menu} />
      <h1 className={styles.header__title}>Plan Discovery</h1>
      <SideDrawer
        show={showFilter}
        button={
          <IconButton
            fontName={faSearch}
            size="small"
            className={styles.header__search}
            onClick={() => setShowFilter(true)}
          />
        }
      >
        <div className={styles.search}>
          <div className={styles.search__header}>
            <IconButton
              fontName={faArrowLeft}
              onClick={() => setShowFilter(false)}
            />
            <h3>Search</h3>
            <div></div>
          </div>
          <div className={styles.search__content}>
            <CommonSearchBar
              input={searchTerm}
              handleOnChange={(e) => setSearchTerm(e.target.value)}
              isSearchTag={false}
              openPanel={() => dispatch(setIsPlanFilterOpen(!isPlanFilterOpen))}
            />
            {allFilters?.length ? (
              <SearchtagsComponent
                allFilters={allFilters}
                handleUpdateActiveFilterTag={handleUpdateActiveFilterTagFunc}
                handleUpdateFilterCriteria={
                  handleUpdateFilterCriteriaForPlanFunc
                }
              />
            ) : null}
            <Filter />
          </div>
        </div>
      </SideDrawer>
    </div>
  );
};

export default MHeader;
