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
import { useAppSelector } from "../../../redux/hooks";
import ErrorPage from "../404Page";
import ArrowBackIcon from "../../../public/icons/arrow_back_black_36dp.svg";
import VersionDetailsIndex from "./versionDetails";
import { DragDropContext } from "react-beautiful-dnd";

const compareRecipeResponsiveSettings = {
  ...compareRecipeResponsiveSetting,
  dotsClass: styles.button__bar,
};

const VersionCompare = () => {
  const [allVersionsEditMode, setAllVersionsEditMode] = useState(false);
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const router = useRouter();
  const recipeId = router.query?.recipeId;
  const { dbUser } = useAppSelector((state) => state.user);
  const { data, loading, error } = useQuery(GET_ALL_RECIPE_VERSION, {
    variables: { recipeId, userId: dbUser._id },
  });
  const sliderRef = useRef(null);

  const handleNormalizeData = (data: any): any[] => {
    const normalizeData = data?.recipeVersion?.map(
      ({ _id, postfixTitle, description, ...rest }) => ({
        ...data,
        name: postfixTitle ? postfixTitle : data?.name,
        description: description ? description : data?.description,
        versionId: _id,
        ...rest,
      }),
    );

    return normalizeData;
  };

  if (loading) {
    return (
      <LayoutComponent>
        <SkeletonComparePage />
      </LayoutComponent>
    );
  }

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
        <DragDropContext onDragEnd={(result) => {}}>
          <Slider {...compareRecipeResponsiveSettings} ref={sliderRef}>
            {handleNormalizeData(data?.getAllVersions)?.map((recipe, index) => {
              return (
                <VersionDetailsIndex
                  key={index}
                  recipe={recipe}
                  mainRecipe={{ ...data?.getAllVersions }}
                  versionId={recipe?.versionId}
                  setOpenCollectionModal={setOpenCollectionModal}
                  dragAndDrop={allVersionsEditMode}
                  setAllVersionsEditMode={setAllVersionsEditMode}
                />
              );
            })}
          </Slider>
        </DragDropContext>
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
