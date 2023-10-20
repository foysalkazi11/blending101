import { useQuery } from "@apollo/client";
import { faFerrisWheel } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PanelHeader from "components/recipe/share/panelHeader/PanelHeader";
import WikiThemeContainer from "components/wiki/wikiTheme/wikiThemContainer";
import { useUser } from "context/AuthProvider";
import GET_BLOG_THEME from "gqlLib/blog/query/getBlogTheme";
import React from "react";
import ToggleMenu from "theme/toggleMenu/ToggleMenu";

type BlogLeftSideProps = React.ComponentPropsWithoutRef<"div"> & {
  blogThemeOnClick?: (data: { [key: string]: any }) => void;
  checkActiveTheme?: (id: string) => boolean;
};

const BlogLeftSide = ({ blogThemeOnClick, checkActiveTheme, ...props }: BlogLeftSideProps) => {
  const user = useUser();
  const { data, loading } = useQuery(GET_BLOG_THEME, {
    variables: { widgetSlug: "blog-theme", userId: user?.id, currentDate: new Date().toISOString().slice(0, 10) },
  });

  return (
    <div {...props}>
      <PanelHeader title="Blog Theme" icon={<FontAwesomeIcon icon={faFerrisWheel} fontSize={24} />} />
      {/* <ToggleMenu
        toggleMenuList={[
          <div key={"key1"} className="d-flex ai-center">
            <FontAwesomeIcon icon={faFerrisWheel} style={{ marginRight: "5px" }} />
            <p>Themes</p>
          </div>,
        ]}
        variant={"outlineSecondary"}
      /> */}
      <WikiThemeContainer
        wikiThemeOnClick={blogThemeOnClick}
        checkActiveWiki={checkActiveTheme}
        //  scrollAreaMaxHeight={panelHeight - 310}
        loading={loading}
        data={data?.getEntityWidget?.widgetCollections}
      />
    </div>
  );
};

export default BlogLeftSide;
