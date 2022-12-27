import { useRouter } from "next/router";
import React, { useState } from "react";
import { faUserCircle } from "@fortawesome/pro-light-svg-icons";
import PlanCard from "../../component/module/Planner/PlanCard.component";
import AppdownLoadCard from "../../components/recipe/recipeDiscovery/AppdownLoadCard/AppdownLoadCard.component";
import ContentTray from "../../components/recipe/recipeDiscovery/ContentTray/ContentTray.component";
import AContainer from "../../containers/A.container";
import Icon from "../../component/atoms/Icon/Icon.component";
import styles from "../../styles/pages/planner.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@apollo/client";
import { GET_ALL_PLANS, GET_FEATURED_PLANS } from "../../graphql/Planner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ShowLastModifiedCollection from "../../components/showLastModifiedCollection/ShowLastModifiedCollection";
import { setIsOpenPlanCollectionTray } from "../../redux/slices/Planner.slice";
import CommonSearchBar from "../../components/searchBar/CommonSearchBar";

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
  const userId = useAppSelector((state) => state.user.dbUser._id || "");
  const { data } = useQuery(GET_FEATURED_PLANS, {
    variables: { limit: 8, memberId: userId },
  });
  const [openCollectionModal, setOpenCollectionModal] = useState(false);

  const { lastModifiedPlanCollection } = useAppSelector(
    (state) => state?.planner,
  );
  const dispatch = useAppDispatch();

  return (
    <AContainer
      headerTitle="MEAL PLAN DISCOVERY"
      showPlanCollectionTray={{
        show: true,
        showPanle: "left",
        showTagByDeafult: true,
      }}
    >
      <div className={styles.discovery}>
        <div className={styles.searchBarContainer}>
          <CommonSearchBar
            input={input}
            setInput={setInput}
            isSearchTag={false}
          />
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
                  <PlanCard
                    planId={item?._id}
                    title={item.planName}
                    isCollectionIds={item?.planCollections}
                    setOpenCollectionModal={setOpenCollectionModal}
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
            allUrl="planner/recommended"
          >
            {data?.getAllRecentPlans?.map((item) => (
              <div key={item?._id}>
                <div className="mr-10">
                  <PlanCard
                    planId={item?._id}
                    title={item.planName}
                    isCollectionIds={item?.planCollections}
                    setOpenCollectionModal={setOpenCollectionModal}
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
            allUrl="planner/recommended"
          >
            {data?.getAllPopularPlans?.map((item) => (
              <div key={item?._id}>
                <div className="mr-10">
                  <PlanCard
                    planId={item?._id}
                    title={item.planName}
                    isCollectionIds={item?.planCollections}
                    setOpenCollectionModal={setOpenCollectionModal}
                  />
                </div>
              </div>
            ))}
          </ContentTray>
        </div>
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
    </AContainer>
  );
};

export default PlanDiscovery;
