import { faSearch, faArrowLeft } from "@fortawesome/pro-regular-svg-icons";
import IconButton from "component/atoms/Button/IconButton.component";
import SideDrawer from "component/molecules/Drawer/SideDrawer.component";
import CommonSearchBar from "components/searchBar/CommonSearchBar";
import SearchtagsComponent, {
  HandleUpdateActiveFilterTagType,
  HandleUpdateFilterCriteriaType,
} from "components/searchtags/searchtags.component";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { resetAllFiltersForPlan, setIsPlanFilterOpen, updatePlanFilterSearchTerm } from "redux/slices/planFilterSlice";

import styles from "@pages/plan/discovery.module.scss";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import PlanFilterTray, { Filter } from "components/sidetray/planFilterTray";
import { useRouter } from "next/router";
import useToUpdateActiveFilterTagForPlan from "customHooks/planFilter/useToUpdateActiveFilterTagForPlan";
import useToAddPlanFilterCriteriaWithUrl from "customHooks/planFilter/useToAddPlanFilterCriteriaWithUrl";
import useToUpdateFilterCriteriaForPlan from "customHooks/planFilter/useToUpdateFilterCriteriaForPlan";
import useToGetPlanByFilterCriteria from "customHooks/planFilter/useToGetPlanByFilterCriteria";
import useDebounce from "customHooks/useDebounce";
import { AllFilterType } from "type/filterType";
import { useMediaQuery } from "@/app/hooks/interface/useMediaQuery";

const normalizeQueryParams = (queryParams) => {
  let queryParamObj = {} as AllFilterType;
  // Access dynamically added query parameters
  Object.entries(queryParams).forEach(([key, value]) => {
    queryParamObj[key] = JSON.parse(value as string);
  });

  return queryParamObj;
};

const MainFilter = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const queryParameters = router.query;
  const isMounted = useRef(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const debounceValue = useDebounce(searchTerm, 500);
  const { handleFilterPlan } = useToGetPlanByFilterCriteria();

  const { allFiltersForPlan } = useAppSelector((state) => state.planFilter);
  const { isPlanFilterOpen } = useAppSelector((state) => state?.planFilter);

  // handle update recipe active filter tag
  const handleUpdateActiveFilterTagForPlan = useToUpdateActiveFilterTagForPlan();
  // handle update recipe filter criteria
  const handleUpdateFilterCriteriaForPlan = useToUpdateFilterCriteriaForPlan();
  // handle add plan Filter with url
  const handleAddFilterCriteriaWithUrl = useToAddPlanFilterCriteriaWithUrl();

  const handleRemoveFilters = () => {
    router.push(`/planner`, undefined, {
      shallow: true,
    });
    dispatch(resetAllFiltersForPlan());
  };

  const handleUpdateFilterCriteriaForPlanFunc = (obj: HandleUpdateFilterCriteriaType) => {
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
    id,
  ) => {
    dispatch(setIsPlanFilterOpen(true));
    handleUpdateActiveFilterTagForPlan(activeSection, filterCriteria, activeTab, childTab, id);
  };

  useEffect(() => {
    let queryParamObj = normalizeQueryParams(queryParameters);
    handleUpdateFilterCriteriaForPlan({
      updateStatus: "bulkAdd",
      queryFilters: queryParamObj,
    });
    handleFilterPlan(queryParamObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      handleAddFilterCriteriaWithUrl(allFiltersForPlan);
      handleFilterPlan(allFiltersForPlan);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allFiltersForPlan]);

  useEffect(() => {
    if (isMounted.current) {
      dispatch(updatePlanFilterSearchTerm(debounceValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const allFilters = [].concat(...Object.values(allFiltersForPlan));

  return (
    <MobileFilter
      showFilter={showFilter}
      setShowFilter={setShowFilter}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      allFilters={allFilters}
      isPlanFilterOpen={isPlanFilterOpen}
      handleUpdateActiveFilterTagFunc={handleUpdateActiveFilterTagFunc}
      handleUpdateFilterCriteriaForPlanFunc={handleUpdateFilterCriteriaForPlanFunc}
    />
  );
};

const MobileFilter = ({
  showFilter,
  setShowFilter,
  searchTerm,
  setSearchTerm,
  allFilters,
  isPlanFilterOpen,
  handleUpdateActiveFilterTagFunc,
  handleUpdateFilterCriteriaForPlanFunc,
}) => {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery("md");
  return (
    <SideDrawer
      show={showFilter}
      button={
        <IconButton
          fontName={faSearch}
          size="small"
          className={styles.search__button}
          onClick={() => setShowFilter(true)}
        />
      }
    >
      <div className={styles.search}>
        <div className={styles.search__header}>
          <IconButton fontName={faArrowLeft} onClick={() => setShowFilter(false)} />
          <h3>Search</h3>
          <div></div>
        </div>
        <div className={styles.search__content}>
          <CommonSearchBar
            input={searchTerm}
            handleOnChange={(e) => setSearchTerm(e.target.value)}
            isSearchTag={false}
            openFilterPanel={() => dispatch(setIsPlanFilterOpen(!isPlanFilterOpen))}
          />
          {allFilters?.length ? (
            <SearchtagsComponent
              allFilters={allFilters}
              handleUpdateActiveFilterTag={handleUpdateActiveFilterTagFunc}
              handleUpdateFilterCriteria={handleUpdateFilterCriteriaForPlanFunc}
            />
          ) : null}
          <Filter />
        </div>
      </div>
    </SideDrawer>
  );
};

const DesktopFilter = ({
  showFilter,
  setShowFilter,
  searchTerm,
  setSearchTerm,
  allFilters,
  isPlanFilterOpen,
  handleUpdateActiveFilterTagFunc,
  handleUpdateFilterCriteriaForPlanFunc,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <PlanFilterTray showPanle="left" showTagByDefaut={false} />
      <CommonSearchBar
        input={searchTerm}
        handleOnChange={(e) => setSearchTerm(e.target.value)}
        isSearchTag={false}
        openFilterPanel={() => dispatch(setIsPlanFilterOpen(!isPlanFilterOpen))}
        showFilterIcon={true}
      />
      {allFilters?.length ? (
        <SearchtagsComponent
          allFilters={allFilters}
          handleUpdateActiveFilterTag={handleUpdateActiveFilterTagFunc}
          handleUpdateFilterCriteria={handleUpdateFilterCriteriaForPlanFunc}
        />
      ) : null}
    </Fragment>
  );
};

export default MainFilter;
