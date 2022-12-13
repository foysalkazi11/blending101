import { faMessageDots } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
import TrayTag from "../TrayTag";
import TrayWrapper from "../TrayWrapper";

interface Props {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}
const BlogCommentsTray = ({
  showPanle = "right",
  showTagByDefaut = false,
}: Props) => {
  return (
    <TrayWrapper
      openTray={true}
      showPanle={showPanle}
      showTagByDefaut={showTagByDefaut}
      panleTag={(hover) => (
        <TrayTag
          icon={<FontAwesomeIcon icon={faMessageDots} />}
          placeMent="left"
          hover={hover}
          //   handleTagClick={() => dispatch(setIsOpenWikiCommentsTray(false))}
        />
      )}
    >
      <ToggleMenu
        toggleMenuList={["Blog Comments"]}
        variant="outlineSecondary"
      />
      {/* <section className={s.wikiCommentsContainer}>
        <header className={s.wikiItemName}>
          <img src={wikiCommentsTrayCurrentWikiEntity?.image} alt="img" />
          <h3>{wikiCommentsTrayCurrentWikiEntity?.title}</h3>
        </header>
      </section> */}
    </TrayWrapper>
  );
};

export default BlogCommentsTray;
