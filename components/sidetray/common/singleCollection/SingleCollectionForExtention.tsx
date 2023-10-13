import React from "react";
import CustomCheckbox from "../../../../theme/checkbox/CustomCheckbox";
import styles from "./SingleMenu.module.scss";

interface IndividualCollectionType {
  name?: string;
  image?: string;
  changeItemWithinCollection?: boolean;
  isItemWithinCollection?: boolean;
  id?: string;
  handleClickCheckBox?: (e: React.SyntheticEvent, id: string) => void;
  collectionItemLength?: number;
  handleCollectionClick?: () => void;
}

const SingleCollectionForExtension = ({
  name = "All Recipes",
  image = "/cards/food.png",
  changeItemWithinCollection = false,
  isItemWithinCollection = false,
  id = "",
  handleClickCheckBox = () => {},
  collectionItemLength = 0,
  handleCollectionClick = () => {},
}: IndividualCollectionType) => {
  return (
    <>
      <div className={styles.collection__child}>
        <div className={styles.leftSide} onClick={handleCollectionClick}>
          <div className={styles.img}>
            <img className={styles.abs} src={image} alt="col_img" width={47} height={47} />
          </div>
          <p>{name}</p>
        </div>

        {changeItemWithinCollection ? (
          <div className={styles.checkBox}>
            <CustomCheckbox checked={isItemWithinCollection} handleChange={(e) => handleClickCheckBox(e, id)} />
          </div>
        ) : (
          <p>{collectionItemLength}</p>
        )}
      </div>
    </>
  );
};

export default SingleCollectionForExtension;
