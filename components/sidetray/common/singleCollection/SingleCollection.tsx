import {
  faPencil,
  faShareNodes,
  faTrash,
} from "@fortawesome/pro-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { setChangeRecipeWithinCollection } from "../../../../redux/slices/collectionSlice";
import { setOpenCollectionsTary } from "../../../../redux/slices/sideTraySlice";
import CustomCheckbox from "../../../../theme/checkbox/CustomCheckbox";
import CircularRotatingLoader from "../../../../theme/loader/circularRotatingLoader.component";
import useHover from "../../../utility/useHover";
import styles from "./SingleMenu.module.scss";

interface IndividualCollectionType {
  name?: string;
  image?: string;
  slug?: string;
  description?: string;
  showMoreMenu?: boolean;
  changeItemWithinCollection?: boolean;
  isRecipeWithinCollection?: boolean;
  id?: string;
  handleClickCheckBox?: (e: React.SyntheticEvent, id: string) => void;
  index?: number;
  collectionItemLength?: number;
  menuIndex?: number;
  setMenuIndex?: Dispatch<SetStateAction<number>>;
  handleDeleteCollection?: (id: string) => void;
  handleEditCollection?: (
    id: string,
    name: string,
    slug: string,
    description: string,
  ) => void;
  deleteCollectionLoading?: boolean;
  collectionRoute: "recipeCollection" | "blogCollection" | "planCollection";
}

const SingleCollection = ({
  name = "All Recipes",
  image = "/cards/food.png",
  slug = "",
  description = "",
  showMoreMenu = false,
  changeItemWithinCollection = false,
  isRecipeWithinCollection = false,
  id = "",
  handleClickCheckBox = () => {},
  index,
  collectionItemLength = 0,
  menuIndex = 0,
  setMenuIndex = () => {},
  handleDeleteCollection = () => {},
  handleEditCollection = () => {},
  deleteCollectionLoading = false,
  collectionRoute = "recipeCollection",
}: IndividualCollectionType) => {
  const [hoverRef, isHovered] = useHover();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleClick = (index: number) => {
    if (menuIndex === index) {
      setMenuIndex(index);
    } else {
      setMenuIndex(index);
    }
  };

  // close recipe collection tray
  const handleCollectionRoute = (route: string) => {
    router.push(route);
    if (collectionRoute === "recipeCollection") {
      dispatch(setOpenCollectionsTary(false));
      dispatch(setChangeRecipeWithinCollection(false));
    }
  };

  return (
    <>
      <div className={styles.collection__child} key={id} ref={hoverRef}>
        <div
          className={styles.leftSide}
          onClick={() =>
            handleCollectionRoute(`/collection/${collectionRoute}/${slug}`)
          }
        >
          <div className={styles.img}>
            <div
              className={styles.abs}
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></div>
          </div>
          <p>{name}</p>
        </div>

        {showMoreMenu ? (
          changeItemWithinCollection ? (
            <div className={styles.checkBox}>
              <CustomCheckbox
                checked={isRecipeWithinCollection}
                handleChange={(e) => handleClickCheckBox(e, id)}
              />
            </div>
          ) : isHovered ? (
            name === "My Favorite" ? (
              <p style={{ marginRight: "10px" }}>{collectionItemLength}</p>
            ) : (
              <div
                className={styles.rightSide}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(index);
                }}
              >
                <FontAwesomeIcon icon={faEllipsisVertical} />

                <div
                  className={`${styles.menu} ${
                    menuIndex === index ? styles.showMenu : ""
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faPencil}
                    className={styles.icon}
                    onClick={() =>
                      handleEditCollection(id, name, slug, description)
                    }
                  />
                  {deleteCollectionLoading ? (
                    <CircularRotatingLoader
                      color="primary"
                      style={{ fontSize: "16px" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={styles.icon}
                      onClick={() => handleDeleteCollection(id)}
                    />
                  )}

                  <FontAwesomeIcon
                    icon={faShareNodes}
                    className={styles.icon}
                  />
                </div>
              </div>
            )
          ) : (
            <p style={{ marginRight: "10px" }}>{collectionItemLength}</p>
          )
        ) : null}
      </div>
    </>
  );
};

export default SingleCollection;
