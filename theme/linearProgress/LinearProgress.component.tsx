import React from "react";
import useGetDefaultPortionOfnutration from "../../customHooks/useGetDefaultPortionOfNutration";
import styles from "./linearProgress.module.scss";
import LinearIndicatorcomponent from "./progress/progress.component";
interface Props {
  name: string;
  ingredientId?: string;
  percent: number;
  checkbox?: boolean;
  units?: string;
  highestValue: number;
}

const Linearcomponent = ({
  name,
  percent,
  checkbox,
  units,
  highestValue,
  ingredientId = "",
}: Props) => {
  const getDefaultPortion = useGetDefaultPortionOfnutration();

  const handleIngredientWiki = async (id: string) => {
    await (
      await getDefaultPortion
    )(id);
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.cardHeadComponent}>
        {checkbox === true ? (
          <span className={styles.container}>
            <input className={styles.checkbox} type="checkbox" />
            <span className={styles.mark}></span>
          </span>
        ) : null}
        <div
          className={styles.title}
          onClick={() => handleIngredientWiki(ingredientId)}
        >
          {name}
        </div>
        <div className={styles.score}>
          {percent} {units}
        </div>
      </div>
      <LinearIndicatorcomponent percent={percent} highestValue={highestValue} />
    </div>
  );
};
export default Linearcomponent;
