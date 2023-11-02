import React, { Fragment, useRef, useState } from "react";
import Header from "./_header";

import styles from "./index.module.scss";
import {
  faBooks,
  faCalendarDay,
  faCircleArrowDown,
  faEllipsis,
  faEllipsisV,
  faPlus,
} from "@fortawesome/pro-light-svg-icons";
import Panel from "component/templates/Panel/Panel.component";
import Menu from "@/spaces/partials/Shared/Menu.component";
import IconButton from "component/atoms/Button/IconButton.component";
import Icon from "component/atoms/Icon/Icon.component";
import Post from "@/spaces/partials/Shared/Post.component";
import RichEditor from "component/molecules/Editor/Editor.component";

interface LayoutProps {}

const SpaceLayout: React.FC<LayoutProps> = (props) => {
  const { children } = props;
  const [showMenu, setShowMenu] = useState(true);
  const [showSettings, setShowSettings] = useState(true);

  return (
    <div className={styles.body}>
      <Header />
      <main className={styles.main}>
        <div className={styles.wrapper}>
          <Panel always width="17%" icon={faBooks} open={showMenu} onClose={() => setShowMenu((prev) => !prev)}>
            <Menu />
          </Panel>
          <Feed />
          <Panel
            width="33%"
            always
            direction="right"
            open={showSettings}
            onClose={() => setShowSettings((prev) => !prev)}
          >
            {children}
          </Panel>
        </div>
      </main>
    </div>
  );
};

const Feed = () => {
  return (
    <div className={styles.feed}>
      <div className={styles.feed__header}>
        <h3>
          <Icon fontName={faCalendarDay} size={20} color="#fd5109" /> 30 Day Blending Challenge
        </h3>
        <IconButton fontName={faEllipsisV} variant="fade" size="medium" />
      </div>
      <div className={styles.feed__content}>
        <img src="/background/banner.png" alt="Hero Image" className={styles.feed__hero} />
        <div className={styles.feed__posts}>
          <Post
            name="Blenda"
            picture="https://blending-spaces.netlify.app/img/Gabriel.png"
            timestamp="12:45 PM"
            attachment="https://blending-spaces.netlify.app/img/blend.png"
          />
          <Post name="Blenda" picture="https://blending-spaces.netlify.app/img/Gabriel.png" timestamp="12:45 PM" />
        </div>
      </div>
      <div className={styles.feed__editor}>
        <RichEditor />
      </div>
    </div>
  );
};

SpaceLayout.defaultProps = {
  sidebar: true,
};

export default SpaceLayout;
