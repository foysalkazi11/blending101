import { useRouter } from "next/router";
import React, { useState, Fragment, useCallback, useEffect, useRef, useMemo } from "react";
import { faUserCircle } from "@fortawesome/pro-light-svg-icons";
import PlanCard from "../../modules/plan/partials/Shared/PlanCard.component";
import AppdownLoadCard from "../../components/recipe/recipeDiscovery/AppdownLoadCard/AppdownLoadCard.component";
import ContentTray from "../../components/recipe/recipeDiscovery/ContentTray/ContentTray.component";
import Icon from "../../component/atoms/Icon/Icon.component";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@apollo/client";
import { GET_FEATURED_PLANS } from "../../modules/plan/plan.graphql";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ShowLastModifiedCollection from "../../components/showLastModifiedCollection/ShowLastModifiedCollection";
import { setIsOpenPlanCollectionTray } from "../../redux/slices/Planner.slice";
import CommonSearchBar from "../../components/searchBar/CommonSearchBar";

import {
  resetAllFiltersForPlan,
  setIsPlanFilterOpen,
  updatePlanFilterSearchTerm,
} from "../../redux/slices/planFilterSlice";
import SearchtagsComponent, {
  HandleUpdateActiveFilterTagType,
  HandleUpdateFilterCriteriaType,
} from "../../components/searchtags/searchtags.component";
import useToUpdateFilterCriteriaForPlan from "../../customHooks/planFilter/useToUpdateFilterCriteriaForPlan";
import useToUpdateActiveFilterTagForPlan from "../../customHooks/planFilter/useToUpdateActiveFilterTagForPlan";
import useToAddPlanFilterCriteriaWithUrl from "../../customHooks/planFilter/useToAddPlanFilterCriteriaWithUrl";
import { AllFilterType } from "../../type/filterType";
import useToGetPlanByFilterCriteria from "../../customHooks/planFilter/useToGetPlanByFilterCriteria";
import useDebounce from "../../customHooks/useDebounce";
import { useUser } from "../../context/AuthProvider";
import MenubarComponent from "../../component/molecules/Menubar/Menubar.component";
import PlanFilterTray, { Filter } from "../../components/sidetray/planFilterTray";
import { HideOnDesktop } from "../../component/molecules/Responsive/Responsive.component";
import { faArrowLeft, faPlusCircle, faSearch } from "@fortawesome/pro-regular-svg-icons";
import PlanCollectionTray from "components/sidetray/planCollectionTray";
import useAllPlan from "@/plan/hooks/plan/useAllPlan";
import useDeletePlan from "@/plan/hooks/plan-details/useDeletePlan";
import { updateOnDelete } from "@/plan/services/plan-discovery.service";
import PlanCommentsTray from "components/sidetray/planCommentsTray";
import Button from "component/atoms/Button/Button.component";
import AddButton from "component/templates/Mobile/AddButton/AddButton.component";
import IconButton from "component/atoms/Button/IconButton.component";
import SideDrawer from "component/molecules/Drawer/SideDrawer.component";
import Header from "component/templates/Mobile/Header/Header.component";

import styles from "@pages/plan/discovery.module.scss";
import { useMediaQuery } from "@/app/hooks/interface/useMediaQuery";

const normalizeQueryParams = (queryParams) => {
  let queryParamObj = {} as AllFilterType;
  // Access dynamically added query parameters
  Object.entries(queryParams).forEach(([key, value]) => {
    queryParamObj[key] = JSON.parse(value as string);
  });

  return queryParamObj;
};

const PlanDiscovery = () => {
  const router = useRouter();
  const query = router.query.query;

  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const dispatch = useAppDispatch();
  const { lastModifiedPlanCollection } = useAppSelector((state) => state?.planner);
  const { allFiltersForPlan } = useAppSelector((state) => state.planFilter);
  const { isPlanFilterOpen } = useAppSelector((state) => state?.planFilter);
  const queryParameters = router.query;
  const isMounted = useRef(false);

  const deletePlan = useDeletePlan();

  // handle update recipe filter criteria
  const handleUpdateFilterCriteriaForPlan = useToUpdateFilterCriteriaForPlan();
  // handle update recipe active filter tag
  const handleUpdateActiveFilterTagForPlan = useToUpdateActiveFilterTagForPlan();
  // handle add plan Filter with url
  const handleAddFilterCriteriaWithUrl = useToAddPlanFilterCriteriaWithUrl();
  // handle add plan Filter with url

  const debounceValue = useDebounce(searchTerm, 500);
  const { handleFilterPlan } = useToGetPlanByFilterCriteria();

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
  ) => {
    dispatch(setIsPlanFilterOpen(true));
    handleUpdateActiveFilterTagForPlan(activeSection, filterCriteria, activeTab, childTab);
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

  const onPlanSearch = useCallback((value: string) => {
    // if (value === "") {
    //   router.push(`/planner`, undefined, {
    //     shallow: true,
    //   });
    // } else {
    //   router.push(`/planner?query=${value}`, undefined, {
    //     shallow: true,
    //   });
    // }
  }, []);

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

  const isMobile = useMediaQuery("md");

  return (
    <Fragment>
      <PlanFilterTray showPanle="left" showTagByDefaut={false}>
        <Filter />
      </PlanFilterTray>
      <PlanCommentsTray showPanle="right" showTagByDefaut={false} />
      <Header title="Plan Discovery">
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
              <div className="ml-10 mr-10">
                <CommonSearchBar
                  input={searchTerm}
                  handleOnChange={(e) => setSearchTerm(e.target.value)}
                  isSearchTag={false}
                  openFilterPanel={() => dispatch(setIsPlanFilterOpen(!isPlanFilterOpen))}
                />
              </div>
              {allFilters?.length ? (
                <SearchtagsComponent
                  allFilters={allFilters}
                  handleUpdateActiveFilterTag={handleUpdateActiveFilterTagFunc}
                  handleUpdateFilterCriteria={handleUpdateFilterCriteriaForPlanFunc}
                />
              ) : null}
              <div className="ml-10 mr-10">
                <Filter />
              </div>
            </div>
          </div>
        </SideDrawer>
      </Header>
      <div className="flex pl-20">
        <PlanCollectionTray showPanle="left" showTagByDefaut={true} />
        <HideOnDesktop>
          <Button className="ml-10" onClick={() => router.push("/planner/plan/")}>
            <Icon fontName={faUserCircle} className="mr-10" size="2rem" color="#7DBD3B" />
            My Plans
          </Button>
        </HideOnDesktop>
      </div>
      <div className={styles.discovery}>
        {!isMobile && (
          <>
            <div className={styles.header__search}>
              <CommonSearchBar
                input={searchTerm}
                handleOnChange={(e) => setSearchTerm(e.target.value)}
                isSearchTag={false}
                openFilterPanel={() => dispatch(setIsPlanFilterOpen(!isPlanFilterOpen))}
                showFilterIcon={true}
              />
              <button className={styles.header__button} onClick={() => router.push("/planner/plan/add-plan")}>
                <Icon fontName={faPlusCircle} className="mr-20" size="2rem" />
                Add Plan
              </button>
              <button className={styles.header__button} onClick={() => router.push("/planner/plan/")}>
                <Icon fontName={faUserCircle} className="mr-20" size="2rem" />
                My Plans
              </button>
            </div>

            {allFilters?.length ? null : <AppdownLoadCard />}

            {allFilters?.length ? (
              <SearchtagsComponent
                allFilters={allFilters}
                handleUpdateActiveFilterTag={handleUpdateActiveFilterTagFunc}
                handleUpdateFilterCriteria={handleUpdateFilterCriteriaForPlanFunc}
              />
            ) : null}

            {query && query !== "" ? (
              <SearchedPlan query={query} setOpenCollectionModal={setOpenCollectionModal} />
            ) : (
              <FeaturedPlan setOpenCollectionModal={setOpenCollectionModal} />
            )}
          </>
        )}
        {/* {allFilters?.length ? (
          <ShowRecipeContainer
            data={planFilterData?.plans || []}
            loading={planFilterLoading}
            showDefaultLeftHeader
            closeHandler={handleRemoveFilters}
            showItems="plan"
            showDefaultRightHeader
          />
        ) : (
          <FeaturedPlan setOpenCollectionModal={setOpenCollectionModal} />
        )} */}
        <HideOnDesktop>
          <ListPlans setOpenCollectionModal={setOpenCollectionModal} />
        </HideOnDesktop>
      </div>
      <ShowLastModifiedCollection
        open={openCollectionModal}
        setOpen={setOpenCollectionModal}
        shouldCloseOnOverlayClick={true}
        lastModifiedCollectionName={lastModifiedPlanCollection?.name}
        openCollectionPanel={() => {
          dispatch(setIsOpenPlanCollectionTray(true));
          setOpenCollectionModal(false);
        }}
      />
      <AddButton onClick={() => router.push("/planner/plan/add-plan")} />
    </Fragment>
  );
};

const MyPlanButton = ({ router }) => {
  return (
    <button className={styles.discovery__myplan} onClick={() => router.push("/planner/plan/")}>
      <Icon fontName={faUserCircle} className="mr-20" size="2rem" />
      My Plans
    </button>
  );
};

const SearchedPlan = ({ query, setOpenCollectionModal }) => {
  const [page, setPage] = useState(1);
  const { plans, loading, observer } = useAllPlan({
    page,
    setPage,
    limit: 16,
    query,
  });

  return (
    <div className="row mt-40 mb-20">
      {plans?.map((item) => (
        <div key={item?._id} className="col-3" ref={observer}>
          <PlanCard
            planId={item?._id}
            title={item.planName}
            image={item?.image?.url}
            isCollectionIds={item?.planCollections}
            noOfComments={item?.commentsCount}
            setOpenCollectionModal={setOpenCollectionModal}
            noOfRatings={item?.numberOfRating}
            ratings={item?.averageRating}
            myRating={item?.myRating}
          />
        </div>
      ))}
    </div>
  );
};

const FeaturedPlan = ({ setOpenCollectionModal }) => {
  const userId = useUser().id;

  const { data } = useQuery(GET_FEATURED_PLANS, {
    variables: { limit: 8, memberId: userId },
  });

  const deletePlan = useDeletePlan(updateOnDelete);

  return (
    <Fragment>
      <div className="mt-40">
        <ContentTray heading="Recommended" image="/images/thumbs-up.svg" allUrl="planner/recommended">
          {data?.getAllRecommendedPlans?.plans?.map((item) => (
            <div key={item?._id}>
              <div className="mr-10">
                <PlanCard
                  planId={item?._id}
                  title={item.planName}
                  image={item?.image?.url}
                  isCollectionIds={item?.planCollections}
                  noOfComments={item?.commentsCount}
                  setOpenCollectionModal={setOpenCollectionModal}
                  planComeFrom="list"
                  noOfRatings={item?.numberOfRating}
                  ratings={item?.averageRating}
                  myRating={item?.myRating}
                  calorie={item?.calorie?.value}
                  score={item?.gigl?.rxScore}
                  carbs={item?.gigl?.netCarbs}
                />
              </div>
            </div>
          ))}
        </ContentTray>
      </div>
      <div className="mt-40">
        <ContentTray heading="Recent" image="/images/clock-light.svg" allUrl="planner/recent">
          {data?.getAllRecentPlans?.plans?.map((item) => (
            <div key={item?._id}>
              <div className="mr-10">
                <PlanCard
                  planId={item?._id}
                  title={item.planName}
                  image={item?.image?.url}
                  isCollectionIds={item?.planCollections}
                  noOfComments={item?.commentsCount}
                  setOpenCollectionModal={setOpenCollectionModal}
                  planComeFrom="list"
                  noOfRatings={item?.numberOfRating}
                  ratings={item?.averageRating}
                  myRating={item?.myRating}
                  calorie={item?.calorie?.value}
                  score={item?.gigl?.rxScore}
                  carbs={item?.gigl?.netCarbs}
                />
              </div>
            </div>
          ))}
        </ContentTray>
      </div>
      <div className="mt-40">
        <ContentTray heading="Popular" image="/images/fire-alt-light.svg" allUrl="planner/popular">
          {data?.getAllPopularPlans?.plans?.map((item) => (
            <div key={item?._id}>
              <div className="mr-10">
                <PlanCard
                  planId={item?._id}
                  title={item.planName}
                  image={item?.image?.url}
                  isCollectionIds={item?.planCollections}
                  noOfComments={item?.commentsCount}
                  setOpenCollectionModal={setOpenCollectionModal}
                  planComeFrom="list"
                  noOfRatings={item?.numberOfRating}
                  ratings={item?.averageRating}
                  myRating={item?.myRating}
                  calorie={item?.calorie?.value}
                  score={item?.gigl?.rxScore}
                  carbs={item?.gigl?.netCarbs}
                />
              </div>
            </div>
          ))}
        </ContentTray>
      </div>
    </Fragment>
  );
};

export default PlanDiscovery;

const ListPlans = ({ setOpenCollectionModal }) => {
  const userId = useUser().id;
  const { data } = useQuery(GET_FEATURED_PLANS, {
    variables: { limit: 8, memberId: userId },
  });

  const [active, setActive] = useState("");
  const plans = useMemo(() => {
    if (active === "Recommended") {
      return data?.getAllRecommendedPlans?.plans;
    } else if (active === "Recent") {
      return data?.getAllRecentPlans?.plans;
    } else {
      return data?.getAllPopularPlans?.plans;
    }
  }, [active, data]);

  return (
    <Fragment>
      <MenubarComponent
        className="mt-20 mb-20 ml-10"
        items={["Recommended", "Recent", "Popular"]}
        onChange={(menu) => setActive(menu)}
      />
      {plans?.map((item) => (
        <div key={item?._id}>
          <div className="mr-10">
            <PlanCard
              planId={item?._id}
              title={item.planName}
              image={item?.image?.url}
              isCollectionIds={item?.planCollections}
              noOfComments={item?.commentsCount}
              setOpenCollectionModal={setOpenCollectionModal}
              planComeFrom="list"
              noOfRatings={item?.numberOfRating}
              ratings={item?.averageRating}
              myRating={item?.myRating}
              calorie={item?.calorie?.value}
              score={item?.gigl?.rxScore}
              carbs={item?.gigl?.netCarbs}
            />
          </div>
        </div>
      ))}
    </Fragment>
  );
};

PlanDiscovery.meta = {
  title: "Plan Discovery",
  icon: "/icons/calender__sidebar.svg",
};
