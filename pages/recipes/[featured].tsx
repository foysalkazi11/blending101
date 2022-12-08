import { useRouter } from "next/router";
import React, { useState } from "react";
import { faTimes } from "@fortawesome/pro-solid-svg-icons";
import IconButton from "../../component/atoms/Button/IconButton.component";
import Icon from "../../component/atoms/Icon/Icon.component";
import FooterRecipeFilter from "../../components/footer/footerRecipeFilter.component";
import AContainer from "../../containers/A.container";
import useLocalStorage from "../../customHooks/useLocalStorage";
import useViewAll, { QUERY_DICTIONARY } from "../../hooks/modules/useViewAll";

import styles from "../../components/recipe/recipeDiscovery/recipeDiscovery.module.scss";
import classes from "../../styles/pages/viewAll.module.scss";
import ShowRecipeContainer from "../../components/showRecipeContainer";
import IconWarper from "../../theme/iconWarper/IconWarper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faShareNodes } from "@fortawesome/pro-light-svg-icons";

const ViewAll = () => {
  const router = useRouter();
  const featured = router.query?.featured as string;
  const page = featured && QUERY_DICTIONARY[featured];

  const data = useViewAll(featured);
  const [compareRecipeList, setcompareRecipeList] = useLocalStorage<any>(
    "compareList",
    [],
  );
  const [openCollectionModal, setOpenCollectionModal] = useState(false);

  return (
    <AContainer
      showCollectionTray={{ show: true, showTagByDeafult: true }}
      filterTray={true}
      showCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
    >
      <div className={styles.main__div}>
        <ShowRecipeContainer
          data={data || []}
          loading={data.length ? false : true}
          setOpenCollectionModal={setOpenCollectionModal}
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
          headerMiddle={
            <div style={{ display: "flex" }}>
              <IconWarper
                iconColor="iconColorPrimary"
                defaultBg="slightGray"
                hover="bgPrimary"
                style={{ width: "28px", height: "28px", marginRight: "10px" }}
              >
                <FontAwesomeIcon icon={faBookmark} />
              </IconWarper>
              <IconWarper
                iconColor="iconColorPrimary"
                defaultBg="slightGray"
                hover="bgPrimary"
                style={{ width: "28px", height: "28px" }}
              >
                <FontAwesomeIcon icon={faShareNodes} />
              </IconWarper>
            </div>
          }
          headerRightSide={
            <IconButton
              fontName={faTimes}
              variant="secondary"
              size="small"
              colorCode="#fff"
              onClick={() => {
                router.back();
              }}
            />
          }
        />
      </div>
      <div className={styles.footerMainDiv}>
        <FooterRecipeFilter />
      </div>
    </AContainer>
  );
};

export default ViewAll;
