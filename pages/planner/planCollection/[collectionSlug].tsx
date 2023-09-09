import { useRouter } from "next/router";
import React, { useState } from "react";
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
import PlanCollectionTray from "components/sidetray/planCollectionTray";
import PlanCommentsTray from "components/sidetray/planCommentsTray";

const CollectionsOfPlan = () => {
  const router = useRouter();
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
    <React.Fragment>
      <PlanCollectionTray showPanle="left" showTagByDefaut={true} />
      <PlanCommentsTray showPanle="right" showTagByDefaut={false} />
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
    </React.Fragment>
  );
};

CollectionsOfPlan.meta = {
  icon: "/icons/calender__sidebar.svg",
  title: "Plan collection",
};

export default CollectionsOfPlan;
