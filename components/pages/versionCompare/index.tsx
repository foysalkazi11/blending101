import { useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { FC, useRef, useState } from "react";
import AContainer from "../../../containers/A.container";
import GET_ALL_RECIPE_VERSION from "../../../gqlLib/versionCompare/query/getAllRecipeVersions";
import SkeletonComparePage from "../../../theme/skeletons/skeletonComparePage/SkeletonComparePage";
import styles from "./index.module.scss";
import Slider from "react-slick";
import { compareRecipeResponsiveSetting } from "./utility";
import RecipeDetails from "../../recipe/share/recipeDetails/RecipeDetails";
import { useAppSelector } from "../../../redux/hooks";
import ErrorPage from "../404Page";
import ArrowBackIcon from "../../../public/icons/arrow_back_black_36dp.svg";

const compareRecipeResponsiveSettings = {
  ...compareRecipeResponsiveSetting,
  dotsClass: styles.button__bar,
};

const VersionCompare = () => {
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const router = useRouter();
  const recipeId = router.query?.recipeId;
  const { dbUser } = useAppSelector((state) => state.user);
  const { data, loading, error } = useQuery(GET_ALL_RECIPE_VERSION, {
    variables: { recipeId, userId: dbUser._id },
  });
  const sliderRef = useRef(null);

  if (loading) {
    return (
      <LayoutComponent>
        <SkeletonComparePage />
      </LayoutComponent>
    );
  }
  const handleNormalizeData = (data: any): any[] => {
    const normalizeData = data?.recipeVersion?.map(
      ({ postfixTitle, description, ...rest }) => ({
        ...data,
        name: postfixTitle ? postfixTitle : data?.name,
        description: description ? description : data?.description,
        ...rest,
      }),
    );

    return normalizeData;
  };

  if (error) {
    return (
      <LayoutComponent>
        <ErrorPage />
      </LayoutComponent>
    );
  }

  return (
    <>
      <LayoutComponent>
        <div className={styles.versionCompareNav} onClick={() => router.back()}>
          <ArrowBackIcon className={styles.versionCompareNav__icon} />
          <p>Back</p>
        </div>

        <Slider {...compareRecipeResponsiveSettings} ref={sliderRef}>
          {handleNormalizeData(data?.getAllVersions)?.map((recipe, index) => {
            return (
              <RecipeDetails
                key={index}
                recipe={recipe}
                setOpenCollectionModal={setOpenCollectionModal}
              />
            );
          })}
        </Slider>
      </LayoutComponent>
    </>
  );
};

const LayoutComponent: FC = ({ children }) => {
  return (
    <AContainer
      logo={false}
      headerTitle="Compare versions"
      showCollectionTray={{
        show: true,
        showPanle: "left",
        showTagByDeafult: false,
      }}
      showCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
    >
      <div className={styles.versionCompareContainer}>{children}</div>
    </AContainer>
  );
};

export default VersionCompare;
