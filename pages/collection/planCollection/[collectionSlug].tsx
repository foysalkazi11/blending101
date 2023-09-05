import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import AContainer from "../../../containers/A.container";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import styles from "../../../components/recipe/recipeDiscovery/recipeDiscovery.module.scss";
import classes from "../../../styles/pages/viewAll.module.scss";
import { useQuery } from "@apollo/client";
import ShowRecipeContainer from "../../../components/showRecipeContainer";
import CommonSearchBar from "../../../components/searchBar/CommonSearchBar";
import WikiBanner from "../../../components/wiki/wikiBanner/WikiBanner";
import { GET_ALL_PLANS_FOR_A_COLLECTION } from "../../../modules/plan/plan.graphql";
import slugToTitle from "../../../helperFunc/string/slugToTittle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/pro-regular-svg-icons";
import { useUser } from "../../../context/AuthProvider";

const CollectionsOfPlan = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const slug = router.query?.collectionSlug as string;
  const [input, setInput] = useState("");
  const memberId = useUser().id;
  const { data: allPlans, loading: allPlansLoading } = useQuery(
    GET_ALL_PLANS_FOR_A_COLLECTION,
    {
      variables: {
        slug,
        memberId,
        page: 1,
        limit: 12,
      },
    },
  );

  return (
    <AContainer
      headerIcon="/icons/calender__sidebar.svg"
      headerTitle="Plan collection"
      showPlanCollectionTray={{
        show: true,
        showPanel: "left",
        showTagByDefault: true,
      }}
      headTagInfo={{
        title: "Plan collection",
        description: "plan collection",
      }}
      showCommentsTrayForPlan={{
        show: true,
        showPanel: "right",
        showTagByDefault: false,
      }}
    >
      <div className={styles.main__div}>
        <CommonSearchBar
          input={input}
          setInput={setInput}
          isSearchTag={false}
          styles={{ marginLeft: "16px" }}
        />
        <WikiBanner />

        <ShowRecipeContainer
          data={allPlans?.getAllPlansForACollection?.plans}
          loading={allPlansLoading}
          headerLeftSide={
            <div className="flex ai-center">
              {slug === "my-favorite" ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  className={classes.head__icon}
                />
              ) : (
                <FontAwesomeIcon icon={faStar} className={classes.head__icon} />
              )}
              <h2 className={classes.head__title}>{slugToTitle(slug)}</h2>
            </div>
          }
          closeHandler={() => router.push("/planner")}
          showItems="plan"
          showDefaultRightHeader
        />
      </div>
    </AContainer>
  );
};

export default CollectionsOfPlan;
