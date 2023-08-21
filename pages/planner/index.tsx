import { useRouter } from "next/router";
import React, {
  useState,
  Fragment,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { faUserCircle } from "@fortawesome/pro-light-svg-icons";
import PlanCard from "../../component/module/Planner/PlanCard.component";
import AppdownLoadCard from "../../components/recipe/recipeDiscovery/AppdownLoadCard/AppdownLoadCard.component";
import ContentTray from "../../components/recipe/recipeDiscovery/ContentTray/ContentTray.component";
import AContainer from "../../containers/A.container";
import Icon from "../../component/atoms/Icon/Icon.component";
import styles from "../../styles/pages/planner.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@apollo/client";
import { GET_FEATURED_PLANS } from "../../graphql/Planner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ShowLastModifiedCollection from "../../components/showLastModifiedCollection/ShowLastModifiedCollection";
import { setIsOpenPlanCollectionTray } from "../../redux/slices/Planner.slice";
import CommonSearchBar from "../../components/searchBar/CommonSearchBar";
import { useAllPlan } from "../../hooks/modules/Plan/usePlanDiscovery";
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
import ShowRecipeContainer from "../../components/showRecipeContainer";
import useDebounce from "../../customHooks/useDebounce";
import { useUser } from "../../context/AuthProvider";

const normalizeQueryParams = (queryParams) => {
  let queryParamObj = {} as AllFilterType;
  // Access dynamically added query parameters
  Object.entries(queryParams).forEach(([key, value]) => {
    queryParamObj[key] = JSON.parse(value as string);
  });

  return queryParamObj;
};

const PlanDiscovery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const query = router.query.query;
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const dispatch = useAppDispatch();
  const { lastModifiedPlanCollection } = useAppSelector(
    (state) => state?.planner,
  );
  const { allFiltersForPlan } = useAppSelector((state) => state.planFilter);
  const { isPlanFilterOpen } = useAppSelector((state) => state?.planFilter);
  const queryParameters = router.query;
  const isMounted = useRef(false);

  // handle update recipe filter criteria
  const handleUpdateFilterCriteriaForPlan = useToUpdateFilterCriteriaForPlan();
  // handle update recipe active filter tag
  const handleUpdateActiveFilterTagForPlan =
    useToUpdateActiveFilterTagForPlan();
  // handle add plan Filter with url
  const handleAddFilterCriteriaWithUrl = useToAddPlanFilterCriteriaWithUrl();
  // handle add plan Filter with url

  const debounceValue = useDebounce(searchTerm, 500);
  const {
    handleFilterPlan,
    data: planFilterData,
    loading: planFilterLoading,
  } = useToGetPlanByFilterCriteria();

  const handleRemoveFilters = () => {
    router.push(`/planner`, undefined, {
      shallow: true,
    });
    dispatch(resetAllFiltersForPlan());
  };
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

  return (
    <Fragment>
      <div className={styles.discovery}>
        <div className={styles.searchBarContainer}>
          <CommonSearchBar
            input={searchTerm}
            handleOnChange={(e) => setSearchTerm(e.target.value)}
            isSearchTag={false}
            openPanel={() => dispatch(setIsPlanFilterOpen(!isPlanFilterOpen))}
          />
          <MyPlanButton router={router} />
        </div>

        {allFilters?.length ? null : <AppdownLoadCard />}

        {allFilters?.length ? (
          <SearchtagsComponent
            allFilters={allFilters}
            handleUpdateActiveFilterTag={handleUpdateActiveFilterTagFunc}
            handleUpdateFilterCriteria={handleUpdateFilterCriteriaForPlanFunc}
          />
        ) : null}

        {/* {query && query !== "" ? (
          <SearchedPlan
            query={query}
            setOpenCollectionModal={setOpenCollectionModal}
          />
        ) : (
          <FeaturedPlan setOpenCollectionModal={setOpenCollectionModal} />
        )} */}

        {allFilters?.length ? (
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
        )}
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
    </Fragment>
  );
};

const MyPlanButton = ({ router }) => {
  return (
    <button
      className={styles.discovery__myplan}
      onClick={() => router.push("/planner/plan/")}
    >
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

  return (
    <Fragment>
      <div className="mt-40">
        <ContentTray
          heading="Recommended"
          image="/images/thumbs-up.svg"
          allUrl="planner/recommended"
        >
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
                  planComrFrom="list"
                  noOfRatings={item?.numberOfRating}
                  ratings={item?.averageRating}
                  myRating={item?.myRating}
                />
              </div>
            </div>
          ))}
        </ContentTray>
      </div>
      <div className="mt-40">
        <ContentTray
          heading="Recent"
          image="/images/clock-light.svg"
          allUrl="planner/recent"
        >
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
                  planComrFrom="list"
                  noOfRatings={item?.numberOfRating}
                  ratings={item?.averageRating}
                  myRating={item?.myRating}
                />
              </div>
            </div>
          ))}
        </ContentTray>
      </div>
      <div className="mt-40">
        <ContentTray
          heading="Popular"
          image="/images/fire-alt-light.svg"
          allUrl="planner/popular"
        >
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
                  planComrFrom="list"
                  noOfRatings={item?.numberOfRating}
                  ratings={item?.averageRating}
                  myRating={item?.myRating}
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

PlanDiscovery.meta = {
  title: "Plan Discovery",
  icon: "/icons/calender__sidebar.svg",
};
