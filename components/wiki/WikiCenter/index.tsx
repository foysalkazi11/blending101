/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./wikiCenter.module.scss";
import { GiGl } from "../../../type/nutrationType";
import { Portion, WikiType } from "../../../type/wikiListType";
import SecondPortion from "./jsonToHtml";
import {
  IngredientBookmarkListType,
  NutrientBookmarkListType,
} from "../../../type/wikiDetailsType";
import FirstPortion from "./firstPortion";

export interface WikiCenterComponentProps {
  heading?: string;
  name?: string;
  description?: string;
  categroy?: string;
  author?: string;
  coverImages?: string[];
  body?: any;
  giGl?: GiGl;
  type?: WikiType;
  wikiId?: string;
  commentsCount?: number;
  scrollPoint?: string;
  ingredientBookmarkList?: IngredientBookmarkListType[];
  nutrientBookmarkList?: NutrientBookmarkListType[];
  fetchNutritionPanelData?: (measureMentWeight: string, id: string) => void;
  setDefaultMeasureMentWeight?: Dispatch<SetStateAction<string>>;
  setCurrentWikiId?: Dispatch<SetStateAction<string>>;
  setPortions?: Dispatch<SetStateAction<any[]>>;
  originalPortions?: Portion[];
}

function WikiCenterComponent(props: WikiCenterComponentProps) {
  const { body = "", scrollPoint = "", ...rest } = props;

  const [expandAllCollapse, setExpandAllCollapse] = useState(true);

  return (
    <div className={styles.centerMain}>
      <FirstPortion
        {...rest}
        expandAllCollapse={expandAllCollapse}
        setExpandAllCollapse={setExpandAllCollapse}
      />
      {body ? (
        <SecondPortion
          blocks={JSON.parse(body)?.blocks}
          scrollPoint={scrollPoint}
          expandAllCollapse={expandAllCollapse}
          setExpandAllCollapse={setExpandAllCollapse}
        />
      ) : null}
    </div>
  );
}

export default WikiCenterComponent;
