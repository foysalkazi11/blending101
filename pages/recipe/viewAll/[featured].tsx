import { useRouter } from "next/router";
import React, { useState } from "react";
import Icon from "../../../component/atoms/Icon/Icon.component";
import AContainer from "../../../containers/A.container";
import useLocalStorage from "../../../customHooks/useLocalStorage";
import useViewAll, {
  QUERY_DICTIONARY,
} from "../../../hooks/modules/useViewAll";

import styles from "../../../components/recipe/recipeDiscovery/recipeDiscovery.module.scss";
import classes from "../../../styles/pages/viewAll.module.scss";
import ShowRecipeContainer from "../../../components/showRecipeContainer";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-regular-svg-icons";
let dataLimit = 12;

const ViewAll = () => {
  const [pageNo, setPageNo] = useState(1);
  const router = useRouter();
  const featured = router.query?.featured as string;
  const page = featured && QUERY_DICTIONARY[featured];
  const { data, loading } = useViewAll(featured, dataLimit, pageNo);

  return (
    <AContainer
      showCollectionTray={{ show: true, showTagByDefault: true }}
      showCommentsTray={{
        show: true,
        showPanel: "right",
        showTagByDefault: false,
      }}
    >
      <div className={styles.main__div}>
        <ShowRecipeContainer
          data={data?.recipes || []}
          nextPage={() => setPageNo((currentPage) => currentPage + 1)}
          hasMore={data?.totalRecipes > dataLimit * pageNo}
          totalDataCount={data?.totalRecipes}
          loading={loading}
          headerLeftSide={
            <div className="flex ai-center">
              <Icon
                className={classes.head__icon}
                fontName={page?.icon}
                size="3rem"
                color="#fe5d1f"
              />
              <h2 className={classes.head__title}>{page?.title}</h2>
            </div>
          }
          // headerMiddle={
          //   <div style={{ display: "flex" }}>
          //     <IconWarper
          //       iconColor="iconColorPrimary"
          //       defaultBg="slightGray"
          //       hover="bgPrimary"
          //       style={{ width: "28px", height: "28px", marginRight: "10px" }}
          //     >
          //       <FontAwesomeIcon icon={faBookmark} />
          //     </IconWarper>
          //     <IconWarper
          //       iconColor="iconColorPrimary"
          //       defaultBg="slightGray"
          //       hover="bgPrimary"
          //       style={{ width: "28px", height: "28px" }}
          //     >
          //       <FontAwesomeIcon icon={faShareNodes} />
          //     </IconWarper>
          //   </div>
          // }
          // showDefaultMiddleHeader={true}
          headerRightSide={
            <IconWarper
              handleClick={() => router.back()}
              iconColor="iconColorWhite"
              defaultBg="secondary"
              hover="bgSecondary"
              style={{ width: "28px", height: "28px" }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </IconWarper>
          }
          showItems="recipe"
        />
      </div>
    </AContainer>
  );
};

export default ViewAll;
