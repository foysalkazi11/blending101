import React, { useEffect, useRef, useState } from "react";
import styles from "./content.module.scss";
import { MdMoreVert, MdDeleteOutline } from "react-icons/md";
import { HiOutlineShare } from "react-icons/hi";
import { BiEditAlt } from "react-icons/bi";
import {
  setOpenCollectionsTary,
  setToggleModal,
} from "../../../../redux/slices/sideTraySlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setLoading } from "../../../../redux/slices/utilitySlice";
import { useLazyQuery, useMutation } from "@apollo/client";
import DELETE_COLLECTION from "../../../../gqlLib/collection/mutation/deleteCollection";
import { setDbUser } from "../../../../redux/slices/userSlice";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import CustomCheckbox from "../../../../theme/checkbox/CustomCheckbox";
import ADD_EXISTING_RECIPE_TO_ANOTHER_COLLECTION from "../../../../gqlLib/collection/mutation/addExistingRecipeToAnotherCollection";
import REMOVE_EXISTING_RECIPE_TO_ANOTHER_COLLECTION from "../../../../gqlLib/collection/mutation/removeReicpeFromExistingCollection";
import {
  setAllRecipeWithinCollectionsId,
  setCollectionDetailsId,
  setShowAllRecipes,
} from "../../../../redux/slices/collectionSlice";
import GET_LAST_MODIFIED_COLLECTION from "../../../../gqlLib/collection/query/getLastModifiedCollection";
import ADD_OR_REMOVE_RECIPE_FORM_COLLECTION from "../../../../gqlLib/collection/mutation/addOrRemoveRecipeFromCollection";
import SkeletonCollection from "../../../../theme/skeletons/skeletonCollection/SkeletonCollection";

type CollectionComponentProps = {
  collections: {}[];
  setInput: any;
  setIsEditCollection: any;
  setCollectionId: any;
};

export default function CollectionComponent({
  collections,
  setInput,
  setIsEditCollection,
  setCollectionId,
}: CollectionComponentProps) {
  const dispatch = useAppDispatch();
  const [deleteCollection] = useMutation(DELETE_COLLECTION);
  const [addExistingRecipeToAnotherCollection] = useMutation(
    ADD_EXISTING_RECIPE_TO_ANOTHER_COLLECTION
  );
  const [removeRecipeFromExistingCollection] = useMutation(
    REMOVE_EXISTING_RECIPE_TO_ANOTHER_COLLECTION
  );
  const [addOrRemoveRecipeFromCollection] = useMutation(
    ADD_OR_REMOVE_RECIPE_FORM_COLLECTION
  );
  const { dbUser } = useAppSelector((state) => state?.user);
  const {
    changeRecipeWithinCollection,
    allRecipeWithinCollectionsId,
    activeRecipeId,
  } = useAppSelector((state) => state?.collections);
  const menu = useRef<any>();
  const [showMenu, setShowMenu] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(0);
  const [collectionHasRecipe, setCollectionHasRecipe] = useState<string[]>([]);
  const { openCollectionsTary } = useAppSelector((state) => state?.sideTray);
  const [isCollectionUpdate, setIsCollectionUpdate] = useState(false);
  const isMounted = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleAddorRemoveRecipeFormCollection = async () => {
    setLoading(true);
    try {
      const { data } = await addOrRemoveRecipeFromCollection({
        variables: {
          data: {
            userEmail: dbUser?.email,
            addToTheseCollections: collectionHasRecipe,
            recipe: activeRecipeId,
          },
        },
      });
      dispatch(
        setDbUser({
          ...dbUser,
          collections: [...data?.addOrRemoveRecipeFromCollection],
        })
      );

      let recipesId = [];
      data?.addOrRemoveRecipeFromCollection?.forEach((col) => {
        const recipes = col?.recipes;
        recipes?.forEach((recipe) => {
          recipesId?.push(recipe?._id);
        });
      });
      dispatch(setAllRecipeWithinCollectionsId(recipesId));

      setLoading(false);
      reactToastifyNotification("info", `Collection update successfully`);
      setIsCollectionUpdate(false);
    } catch (error) {
      setLoading(false);
      reactToastifyNotification("eror", error?.message);
      setIsCollectionUpdate(false);
    }
  };

  const handleChange = async (e, collectionId) => {
    setIsCollectionUpdate(true);
    if (e?.target?.checked) {
      setCollectionHasRecipe((pre) => [...pre, collectionId]);
    } else {
      setCollectionHasRecipe((pre) => [
        ...pre?.filter((id) => id !== collectionId),
      ]);
    }
  };

  // const checkExistingRecipe = (item) => {
  //   let result: boolean = false;
  //   item?.recipes?.forEach((recipe) => {
  //     if (recipe._id === activeRecipeId) {
  //       result = true;
  //       return;
  //     }
  //   });
  //   return result;
  // };

  const handleDeleteCollection = async (collectionId: string) => {
    setLoading(true);
    try {
      const { data } = await deleteCollection({
        variables: {
          data: {
            collectionId: collectionId,
            userEmail: dbUser?.email,
          },
        },
      });

      dispatch(
        setDbUser({
          ...dbUser,
          collections: [...data?.deleteCollection],
        })
      );

      let recipesId = [];
      data?.deleteCollection?.forEach((col) => {
        const recipes = col?.recipes;
        recipes?.forEach((recipe) => {
          recipesId?.push(recipe?._id);
        });
      });
      dispatch(setAllRecipeWithinCollectionsId(recipesId));
      dispatch(setCollectionDetailsId(""));
      dispatch(setShowAllRecipes(false));

      setLoading(false);
      reactToastifyNotification("info", "Collection delete successfully");
    } catch (error) {
      setLoading(false);
      reactToastifyNotification("eror", error?.message);
    }
  };

  const handleClick = (index: number) => {
    if (menuIndex === index) {
      setMenuIndex(index);
      setShowMenu((pre) => !pre);
    } else {
      setMenuIndex(index);
      setShowMenu(true);
    }

    // const elem = menu.current;
    // elem.classList.toggle(styles.showMenu);
  };

  useEffect(() => {
    let collectionIds: string[] = [];
    if (changeRecipeWithinCollection) {
      collections?.forEach((col) => {
        //@ts-ignore
        const recipes = col?.recipes;
        //@ts-ignore
        const id = col?._id;
        recipes?.forEach((recipe) => {
          if (recipe._id === activeRecipeId) {
            collectionIds?.push(id);
          }
        });
      });
      setCollectionHasRecipe(collectionIds);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRecipeId, changeRecipeWithinCollection]);

  useEffect(() => {
    if (isMounted.current) {
      if (!openCollectionsTary) {
        if (isCollectionUpdate) {
          handleAddorRemoveRecipeFormCollection();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCollectionsTary]);
  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  if (loading) {
    return <SkeletonCollection />;
  }

  return (
    <div className={styles.collection}>
      <div className={styles.collection__add}></div>
      <div className={styles.collection__collections}>
        {changeRecipeWithinCollection ? null : (
          <div className={styles.collection__child}>
            <div
              className={styles.leftSide}
              onClick={() => {
                dispatch(setShowAllRecipes(true));
                dispatch(setOpenCollectionsTary(false));
              }}
            >
              <div className={styles.img}>
                <div
                  className={styles.abs}
                  style={{
                    backgroundImage: `url(${
                      //@ts-ignore
                      "/cards/food.png"
                    })`,
                  }}
                ></div>
              </div>

              {/* @ts-ignore */}
              <p>All Recipies</p>
            </div>
          </div>
        )}
        {collections?.length &&
          collections?.map((item, i) => {
            //@ts-ignore
            const defaultImage = item?.recipes[
              //@ts-ignore
              item?.recipes?.length - 1
            ]?.image?.find((img) => img?.default === true)?.image;

            return (
              <div
                className={styles.collection__child}
                key={"collections__child" + i}
                onMouseOver={() => setHoverIndex(i + 1)}
                onMouseLeave={() => setHoverIndex(0)}
              >
                <div
                  className={styles.leftSide}
                  onClick={() => {
                    dispatch(setShowAllRecipes(false));
                    /* @ts-ignore */
                    dispatch(setCollectionDetailsId(item?._id));
                    dispatch(setOpenCollectionsTary(false));
                  }}
                >
                  <div className={styles.img}>
                    <div
                      className={styles.abs}
                      style={{
                        backgroundImage: `url(${
                          //@ts-ignore
                          defaultImage || "/cards/food.png"
                        })`,
                      }}
                    ></div>
                  </div>

                  {/* @ts-ignore */}
                  <p>{item?.name}</p>
                </div>
                {changeRecipeWithinCollection ? (
                  <div className={styles.checkBox}>
                    <CustomCheckbox
                      checked={
                        /* @ts-ignore */
                        collectionHasRecipe?.includes(item?._id)
                      }
                      /* @ts-ignore */
                      handleChange={(e) => handleChange(e, item?._id)}
                    />
                  </div>
                ) : hoverIndex === i + 1 ? (
                  /* @ts-ignore */
                  item?.name === "My Favourite" ? (
                    <p style={{ marginRight: "10px" }}>
                      {/* @ts-ignore */}
                      {item?.recipes?.length}
                    </p>
                  ) : (
                    <div className={styles.rightSide}>
                      <MdMoreVert
                        className={styles.moreIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClick(i);
                        }}
                      />

                      <div
                        className={`${styles.menu} ${
                          menuIndex === i && showMenu ? styles.showMenu : ""
                        }`}
                      >
                        <BiEditAlt
                          className={styles.icon}
                          onClick={() => {
                            /* @ts-ignore */
                            setInput((pre) => ({ ...pre, name: item?.name }));
                            setIsEditCollection(true);
                            /* @ts-ignore */
                            setCollectionId(item?._id);
                            dispatch(setToggleModal(true));
                          }}
                        />
                        <MdDeleteOutline
                          className={styles.icon}
                          /* @ts-ignore  */
                          onClick={() => handleDeleteCollection(item?._id)}
                        />
                        <HiOutlineShare className={styles.icon} />
                      </div>
                    </div>
                  )
                ) : (
                  // @ts-ignore
                  <p style={{ marginRight: "10px" }}>{item?.recipes?.length}</p>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
