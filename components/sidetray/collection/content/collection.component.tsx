import React, { useRef, useState } from "react";
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
  const [getLastModifiedCollection] = useLazyQuery(
    GET_LAST_MODIFIED_COLLECTION
  );
  const { dbUser } = useAppSelector((state) => state?.user);
  const {
    changeRecipeWithinCollection,
    allRecipeWithinCollectionsId,
    activeRecipeId,
  } = useAppSelector((state) => state?.collections);
  const menu = useRef<any>();

  const handleChange = async (e, collectionId) => {
    dispatch(setLoading(true));
    try {
      if (e?.target?.checked) {
        const { data } = await addExistingRecipeToAnotherCollection({
          variables: {
            data: {
              collectionId: collectionId,
              recipe: activeRecipeId,
              userEmail: dbUser?.email,
            },
          },
        });
        dispatch(
          setDbUser({
            ...dbUser,
            collections: [...data?.addRecipeToAUserCollection],
          })
        );

        let recipesId = [];
        data?.addRecipeToAUserCollection?.forEach((col) => {
          const recipes = col?.recipes;
          recipes?.forEach((recipe) => {
            recipesId?.push(recipe?._id);
          });
        });
        dispatch(setAllRecipeWithinCollectionsId(recipesId));
      } else {
        const { data } = await removeRecipeFromExistingCollection({
          variables: {
            data: {
              collectionId: collectionId,
              recipe: activeRecipeId,
              userEmail: dbUser?.email,
            },
          },
        });
        dispatch(
          setDbUser({
            ...dbUser,
            collections: [...data?.removeRecipeFromAColection],
          })
        );

        let recipesId = [];
        data?.removeRecipeFromAColection?.forEach((col) => {
          const recipes = col?.recipes;
          recipes?.forEach((recipe) => {
            recipesId?.push(recipe?._id);
          });
        });
        dispatch(setAllRecipeWithinCollectionsId(recipesId));
      }

      dispatch(setLoading(false));
      reactToastifyNotification(
        "info",
        `Successfully ${
          e?.target?.checked
            ? "added to new collection"
            : "remove form collection"
        }`
      );
    } catch (error) {
      dispatch(setLoading(false));
      reactToastifyNotification("eror", error?.message);
    }
  };

  const checkExistingRecipe = (recipes: []) => {
    let result: boolean = false;
    recipes?.forEach((recipe) => {
      //@ts-ignore
      if (recipe._id === activeRecipeId) {
        result = true;
      }
    });
    return result;
  };

  const handleDeleteCollection = async (collectionId: string) => {
    dispatch(setLoading(true));
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

      dispatch(setLoading(false));
      reactToastifyNotification("info", "Collection delete successfully");
    } catch (error) {
      dispatch(setLoading(false));
      reactToastifyNotification("eror", error?.message);
    }
  };

  const handleClick = () => {
    const elem = menu.current;
    elem.classList.toggle(styles.showMenu);
  };

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
                        checkExistingRecipe(item?.recipes)
                      }
                      /* @ts-ignore */
                      handleChange={(e) => handleChange(e, item?._id)}
                    />
                  </div>
                ) : /* @ts-ignore */
                item?.name === "My Favourite" ? null : (
                  <div className={styles.rightSide}>
                    <MdMoreVert
                      className={styles.moreIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick();
                      }}
                    />

                    <div className={`${styles.menu}`} ref={menu}>
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
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
