import React, { useState } from "react";
import TrayWrapper from "../TrayWrapper";
import TrayTag from "../TrayTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToggleMenu from "theme/toggleMenu/ToggleMenu";
import { faFilter, faTag } from "@fortawesome/pro-thin-svg-icons";
import BlogFilterTagSection from "./blogFilterTagSection";
interface BlogFilterTrayProps {
  showTagByDefault?: boolean;
  showPanel?: "left" | "right";
}

const BlogFilterTray = ({ showPanel = "left", showTagByDefault = false }: BlogFilterTrayProps) => {
  const [openBlogFilterTray, setOpenBlogFilterTray] = useState(false);
  return (
    <TrayWrapper
      closeTray={() => setOpenBlogFilterTray(!openBlogFilterTray)}
      openTray={openBlogFilterTray}
      showTagByDefault={showTagByDefault}
      showPanel={showPanel}
      panelTag={(hover) => <TrayTag icon={<FontAwesomeIcon icon={faFilter} />} placeMent="left" hover={hover} />}
    >
      <ToggleMenu
        toggle={0}
        toggleMenuList={[
          <div key={"key1"} className="flex ai-center">
            <FontAwesomeIcon icon={faTag} />
            <p>Tags</p>
          </div>,
        ]}
        variant={"outlineSecondary"}
      />
      <BlogFilterTagSection />
    </TrayWrapper>
  );
};

export default BlogFilterTray;
