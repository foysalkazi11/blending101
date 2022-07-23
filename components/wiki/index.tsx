import React, { useState } from "react";
import AContainer from "../../containers/A.container";
import styles from "./wiki.module.scss";
import WikiLeft from "./WikiLeft/WikiLeft";
import WikiSingleType from "./wikiSingleType/WikiSingleType";

export type Type = "Nutrient" | "Ingredient" | "Health";

const WikiHome = () => {
  const [selectedWikiItem, setSelectedWikiItem] = useState<string[]>([]);
  const [type, setType] = useState<Type>("Ingredient");

  return (
    <AContainer>
      <div className={styles.main}>
        <div className={styles.left}>
          <WikiLeft
            type={type}
            setType={setType}
            selectedWikiItem={selectedWikiItem}
            setSelectedWikiItem={setSelectedWikiItem}
          />
        </div>
        <div className={styles.center}>
          <WikiSingleType
            type={type}
            selectedWikiItem={selectedWikiItem}
            setSelectedWikiItem={setSelectedWikiItem}
          />
        </div>
      </div>
    </AContainer>
  );
};

export default WikiHome;
