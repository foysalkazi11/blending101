import React, { useState, useRef, useEffect, useCallback } from "react";
import AContainer from "../../../containers/A.container";
import SubNav from "../share/subNav/SubNav";
import styles from "./compareRecipe.module.scss";
import { useRouter } from "next/router";
import SmallcardComponent from "../../../theme/cards/smallCard/SmallCard.component";
import Carousel from "../../../theme/carousel/carousel.component";
import Slider from "react-slick";
import RecipeDetails from "../share/recipeDetails/RecipeDetails";
import { useMutation, useQuery } from "@apollo/client";
import GET_COMPARE_LIST from "../../../gqlLib/compare/query/getCompareList";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import SkeletonComparePage from "../../../theme/skeletons/skeletonComparePage/SkeletonComparePage";
import notification from "../../utility/reactToastifyNotification";
import useLocalStorage from "../../../customHooks/useLocalStorage";
import { DragDropContext } from "react-beautiful-dnd";
import CreateNewRecipe from "../share/createNewRecipe/CreateNewRecipe";
import {
  responsiveSetting,
  reorder,
  responsiveColumnDesktop,
  responsiveColumnLaptop,
  responsiveColumnScreen,
  compareRecipeResponsiveSetting,
} from "./utility";
import useWindowSize from "../../utility/useWindowSize";
import {
  setCompareList,
  setLatest,
  setPopular,
  setRecommended,
} from "../../../redux/slices/recipeSlice";
import EMPTY_COMPARE_LIST from "../../../gqlLib/compare/mutation/emptyCompareList";
import { setDbUser } from "../../../redux/slices/userSlice";
import { setLoading } from "../../../redux/slices/utilitySlice";
import ShowCollectionModal from "../../showLastModifiedCollection/ShowLastModifiedCollection";
import useChangeCompare from "../../../customHooks/useChangeComaper";
import imageUploadS3 from "../../utility/imageUploadS3";
import CREATE_A_RECIPE_BY_USER from "../../../gqlLib/recipes/mutations/createARecipeByUser";
import EDIT_A_RECIPE from "../../../gqlLib/recipes/mutations/editARecipe";
import {
  setChangeRecipeWithinCollection,
  setSingleRecipeWithinCollecions,
} from "../../../redux/slices/collectionSlice";
import { setOpenCollectionsTary } from "../../../redux/slices/sideTraySlice";
import { CompareRecipeType } from "../../../type/compareRecipeType";
import useToGetARecipe from "../../../customHooks/useToGetARecipe";
import {
  setOpenVersionTray,
  setOpenVersionTrayFormWhichPage,
  setShouldCloseVersionTrayWhenClickAVersion,
} from "../../../redux/slices/versionTraySlice";
import EDIT_A_VERSION_OF_RECIPE from "../../../gqlLib/versions/mutation/editAVersionOfRecipe";
import { RecipeDetailsType } from "../../../type/recipeDetailsType";

const compareRecipeResponsiveSettings = {
  ...compareRecipeResponsiveSetting,
  dotsClass: styles.button__bar,
};

const formulateRecipeResponsiveSetting = (length: number) => {
  let slidesToShow = 3;
  switch (length) {
    case 1:
      slidesToShow = 1;
      break;
    case 2:
      slidesToShow = 2;
      break;
    default:
      slidesToShow;
      break;
  }
  return {
    slidesToShow,
    slidesToScroll: 1,
    swipeToSlide: false,
    arrows: false,
    infinite: false,
    swipe: false,
    dots: true,
    dotsClass: styles.button__bar,

    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: length === 1 ? 1 : 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
};

const CompareRecipe = () => {
  const [isFormulatePage, setIsFormulatePage] = useState(false);
  // const [copyImage, setCopyImage] = useState("");
  const router = useRouter();
  const { compareList } = useAppSelector((state) => state.recipe);
  const [compareRecipeList, setCompareRecipeList] = useLocalStorage<
    CompareRecipeType[]
  >("compareList", []);
  const [newlyCreatedRecipe, setNewlyCreatedRecipe] =
    useLocalStorage<RecipeDetailsType>("newlyCreatedRecipe", {});
  const [createNewRecipeByUser, createRecipeState] = useMutation(
    CREATE_A_RECIPE_BY_USER,
  );
  const [editRecipe, EditRecipeState] = useMutation(EDIT_A_RECIPE);
  const [editARecipeVersion, EditARecipeVersionState] = useMutation(
    EDIT_A_VERSION_OF_RECIPE,
  );
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const dispatch = useAppDispatch();
  const sliderRef = useRef(null);
  const { dbUser } = useAppSelector((state) => state?.user);
  const { data, loading, error, refetch } = useQuery(GET_COMPARE_LIST, {
    variables: { userId: dbUser?._id },
    fetchPolicy: "network-only",
  });
  const windowSize = useWindowSize();
  const [newRecipe, setNewRecipe] = useState({
    userId: dbUser?._id,
    name: "",
    image: [],
    description: "",
    recipeBlendCategory: "61cafc34e1f3e015e7936587",
    ingredients: [],
  });
  const isMounted = useRef(false);
  const [emptyCompareList] = useMutation(EMPTY_COMPARE_LIST);
  const { latest, popular, recommended } = useAppSelector(
    (state) => state?.recipe,
  );
  const { handleChangeCompare } = useChangeCompare();
  const { handleToGetARecipe } = useToGetARecipe();
  const [uploadNewImage, setUploadNewImage] = useState(false);
  const { lastModifiedCollection } = useAppSelector(
    (state) => state?.collections,
  );

  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  // filter recipe
  const filterRecipe = (arr: CompareRecipeType[], id: string): any[] => {
    if (!arr?.length) return arr;
    return arr?.filter((item) => item?.recipeId._id !== id);
  };
  // mapped recipe
  const mapped = (
    arr: any[],
    id: string,
    updateObj: { [key: string]: any },
  ): any[] => {
    if (!arr?.length) return arr;
    return arr?.map((item: CompareRecipeType) =>
      item?.recipeId?._id === id
        ? { ...item, ...updateObj, isTemp: false }
        : item,
    );
  };

  // update compare List
  const updateCompareList = useCallback(
    (id: string, updateObj: { [key: string]: any }) => {
      let isCompareObj = "addedToCompare";
      isCompareObj = updateObj[isCompareObj];

      if (isCompareObj === undefined) {
        dispatch(setCompareList(mapped(compareList, id, updateObj)));
        setCompareRecipeList((state) => mapped(state, id, updateObj));
      } else {
        dispatch(setCompareList(filterRecipe(compareList, id)));
        setCompareRecipeList((state) => filterRecipe(state, id));
      }
    },
    [compareList, dispatch, setCompareRecipeList],
  );

  // open recipe collection panel after added a recipe to a collection
  const handleOpenCollectionTray = () => {
    dispatch(setSingleRecipeWithinCollecions([lastModifiedCollection?.id]));
    dispatch(setOpenCollectionsTary(true));
    dispatch(setChangeRecipeWithinCollection(true));
    setOpenCollectionModal(false);
  };

  const updateData = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | any
    >,
  ) => {
    const target = e?.target;
    const { name, value } = target;
    if (target?.files) {
      setNewRecipe((state) => ({ ...state, image: e?.target?.files }));
      setUploadNewImage(true);
    } else {
      setNewRecipe((state) => ({ ...state, [name]: value }));
    }
  };

  const findCompareRecipe = (id: string) => {
    return compareRecipeList?.find((item) => item?.recipeId?._id === id);
  };

  const handleRemoveFromCompareList = async (
    id: string,
    e: React.SyntheticEvent,
    versionId: string,
  ) => {
    await handleChangeCompare(e, id, versionId, false, updateCompareList);
  };

  const handleCompare = (recipe) => {
    if (compareRecipeList?.length >= 8) {
      notification("warning", "Can't add more than 8 formulate recipe");
    } else {
      const findRecipe = findCompareRecipe(recipe?._id);
      if (!findRecipe) {
        setCompareRecipeList((state) => [...state, recipe]);
      } else {
        notification("warning", "alredy exist");
      }
    }
  };

  const removeCompareRecipe = (id, e) => {
    e?.stopPropagation();
    setCompareRecipeList((state) => [
      ...state.filter((item) => item?.recipeId?._id !== id),
    ]);
  };

  const responsiveColumn = () => {
    let obj = {};
    const length = compareRecipeList?.length;
    obj["width"] = responsiveColumnScreen(length);

    if (windowSize?.width <= 1280) {
      obj["width"] = responsiveColumnDesktop(length);
    }
    if (windowSize?.width <= 1024) {
      obj["width"] = responsiveColumnLaptop(length);
    }
    if (windowSize?.width <= 768) {
      obj["width"] = "100%";
    }

    return obj;
  };

  const findItemIngredientId = (id) => {
    return newRecipe?.ingredients?.find(
      (item) => item?.ingredientId === id || item?.qaId === id,
    );
  };
  const findItemQaId = (id) => {
    return newRecipe?.ingredients?.find((item) => item?.qaId === id);
  };

  const addIngredient = (id: string, index: number) => {
    const findRecipe = findCompareRecipe(id);
    const findIngredient = findRecipe?.defaultVersion.ingredients[index];
    const isIngredientStatusOk = findIngredient?.ingredientStatus === "ok";

    let ingredientId = "";
    let newIngredient = {};
    if (isIngredientStatusOk) {
      ingredientId = findIngredient?.ingredientId?._id;
      const selectedPortionName = findIngredient?.selectedPortion?.name;
      const selectedPortionGram = findIngredient?.selectedPortion?.gram;
      const ingredientName = findIngredient?.ingredientId?.ingredientName;
      const selectedPortionQuantity = findIngredient?.selectedPortion?.quantity;
      const comment = findIngredient?.comment;
      let label = `${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`;
      newIngredient = {
        ingredientId,
        selectedPortionName,
        weightInGram: selectedPortionGram,
        ingredientStatus: "ok",
        label,
        comment,
      };
    } else {
      //@ts-ignore
      ingredientId = findIngredient?.qaId;
      newIngredient = {
        ...findIngredient,
        label: findIngredient?.errorString,
      };
    }
    // is already exist
    const item = isIngredientStatusOk
      ? findItemIngredientId(ingredientId)
      : findItemQaId(ingredientId);

    if (!item) {
      setNewRecipe((state) => ({
        ...state,
        ingredients: [...state?.ingredients, newIngredient],
      }));
    } else {
      return;
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId !== "droppable") {
      if (destination.droppableId === "droppable") {
        addIngredient(source?.droppableId, source?.index);
      } else {
        return;
      }
    } else {
      if (source.droppableId === destination.droppableId) {
        setNewRecipe((state) => ({
          ...state,
          ingredients: [
            ...reorder(state?.ingredients, source.index, destination.index),
          ],
        }));
      } else {
        return;
      }
    }
  };

  const prepareForNewFormulateRecipe = () => {
    setNewlyCreatedRecipe({} as RecipeDetailsType);
    setNewRecipe((state) => ({ ...state, ingredients: [] }));
  };

  const handleCompareButtonClick = () => {
    if (newlyCreatedRecipe?.recipeId?._id) {
      prepareForNewFormulateRecipe();
      setIsFormulatePage((pre) => !pre);
    } else {
      setIsFormulatePage((pre) => !pre);
    }
  };

  const handleEmptyCompareList = async () => {
    dispatch(setLoading(true));
    try {
      await emptyCompareList({ variables: { userId: dbUser?._id } });
      dispatch(
        setDbUser({
          ...dbUser,
          compareLength: 0,
        }),
      );
      setCompareRecipeList([]);
      dispatch(setCompareList([]));
      dispatch(
        setRecommended(
          recommended?.map((recipe) =>
            recipe?.addedToCompare
              ? { ...recipe, addedToCompare: false }
              : recipe,
          ),
        ),
      );
      dispatch(
        setLatest(
          latest?.map((recipe) =>
            recipe?.addedToCompare
              ? { ...recipe, addedToCompare: false }
              : recipe,
          ),
        ),
      );
      dispatch(
        setPopular(
          popular?.map((recipe) =>
            recipe?.addedToCompare
              ? { ...recipe, addedToCompare: false }
              : recipe,
          ),
        ),
      );
      router?.push("/");
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      notification("error", "Failed to empty compare list");
    }
  };

  const updateFormulateList = (compareList: CompareRecipeType[]) => {
    setCompareRecipeList([...compareList?.slice(0, 3)]);
  };

  // handle create or update recipe
  const handleCreateNewRecipeByUser = async (e: React.SyntheticEvent) => {
    e.stopPropagation();

    let ingArr = [];
    let errorIngredients = [];
    newRecipe?.ingredients?.forEach((item) => {
      const { ingredientId, selectedPortionName, weightInGram } = item;
      if (item?.ingredientStatus === "ok") {
        let value = item?.portions?.find((item) => item.default);
        ingArr?.push({
          ingredientId,
          selectedPortionName,
          weightInGram,
          //  comment: item?.comment || null,
        });
      }
      if (item?.ingredientStatus === "partial_ok") {
        const {
          errorString = "",
          ingredientId = "",
          errorIngredientId = "",
          qaId = "",
        } = item;
        errorIngredients.push({
          errorString,
          ingredientId,
          qaId,
        });
      }
    });

    if (newlyCreatedRecipe?.recipeId?._id) {
      if (newRecipe?.name && newRecipe?.ingredients?.length) {
        try {
          let imgArr = [];
          if (uploadNewImage && newRecipe?.image?.length) {
            const url = await imageUploadS3(newRecipe?.image);
            imgArr?.push({
              image: `${url}`,
              default: true,
            });
          } else {
            if (newlyCreatedRecipe.recipeId?.image?.length) {
              imgArr?.push({
                image: `${newlyCreatedRecipe?.recipeId?.image[0]?.image}`,
                default: newlyCreatedRecipe?.recipeId?.image[0]?.default,
              });
            }
          }

          await editRecipe({
            variables: {
              userId: dbUser?._id,
              data: {
                editId: newlyCreatedRecipe?.recipeId?._id,
                editableObject: {
                  image: imgArr,
                  recipeBlendCategory: newRecipe?.recipeBlendCategory,
                },
              },
            },
          });
          await editARecipeVersion({
            variables: {
              data: {
                editId: newlyCreatedRecipe?.defaultVersion?._id,
                editableObject: {
                  postfixTitle: newRecipe?.name,
                  description: newRecipe?.description,
                  ingredients: ingArr,
                  errorIngredients,
                },
                recipeId: newlyCreatedRecipe?.recipeId?._id,
                userId: dbUser?._id,
              },
            },
          });
          notification("success", "Recipe updated successfully");
        } catch (error) {
          notification("error", "Failed to updated recipe");
        }
      } else {
        notification(
          "warning",
          "You can't save recipe without name and ingredients",
        );
      }
    } else {
      if (newRecipe?.name && newRecipe?.ingredients?.length) {
        try {
          let imgArr = [];
          if (newRecipe?.image?.length) {
            const url =
              typeof newRecipe?.image[0] === "string"
                ? newRecipe?.image[0]
                : await imageUploadS3(newRecipe?.image);
            imgArr?.push({
              image: `${url}`,
              default: true,
            });
          }

          const obj = {
            userId: dbUser?._id,
            name: newRecipe?.name,
            image: imgArr,
            description: newRecipe?.description,
            recipeBlendCategory: newRecipe?.recipeBlendCategory,
            ingredients: ingArr,
            errorIngredients,
          };
          const { data } = await createNewRecipeByUser({
            variables: {
              isAddToTemporaryCompareList: false,
              data: obj,
            },
          });

          setNewlyCreatedRecipe(data?.addRecipeFromUser);
          setUploadNewImage(false);
          notification("success", "Recipe saved successfully");
          // router?.push(`/recipe_details/${data?.addRecipeFromUser?._id}`);
        } catch (error) {
          notification("error", "Failed to saved new recipe");
        }
      } else {
        notification(
          "warning",
          "You can't save recipe without name and ingredients",
        );
      }
    }
  };

  // handle to open version tray
  const handleToOpenVersionTray = useCallback(async (recipeId: string) => {
    if (detailsARecipe?.recipeId?._id !== recipeId) {
      await handleToGetARecipe(recipeId, dbUser?._id);
    }

    dispatch(setOpenVersionTray(true));
    dispatch(setOpenVersionTrayFormWhichPage("details"));
    dispatch(setShouldCloseVersionTrayWhenClickAVersion(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // change compare recipe data based on version data

  useEffect(() => {
    if (isMounted?.current && detailsARecipe?.defaultVersion) {
      const { _id, ...rest } = detailsARecipe.defaultVersion;
      setCompareRecipeList((state) =>
        state.map((item) =>
          item?.recipeId?._id === detailsARecipe?.recipeId?._id
            ? { ...item, defaultVersion: { ...item?.defaultVersion, ...rest } }
            : item,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailsARecipe.defaultVersion]);

  useEffect(() => {
    if (!loading && data?.getCompareList2) {
      const compareData = data?.getCompareList2.map((recipe) => ({
        ...recipe,
        defaultVersion: {
          ...recipe?.defaultVersion,
          ingredients: [
            ...recipe?.defaultVersion?.ingredients?.map((ing) => ({
              ...ing,
              ingredientStatus: "ok",
            })),
            ...recipe?.defaultVersion?.errorIngredients?.map((ing) => ({
              ...ing,
              ingredientStatus: "partial_ok",
            })),
          ],
        },
      }));

      if (!compareRecipeList?.length) {
        updateFormulateList(compareData);
      } else {
        let getCompareListId = compareData?.map(
          (recipe) => recipe?.recipeId?._id,
        );

        let checkCompareRecipeList = compareRecipeList.filter((recipe) =>
          getCompareListId.includes(recipe?.recipeId?._id),
        );

        if (!checkCompareRecipeList?.length) {
          updateFormulateList(compareData);
        } else {
          setCompareRecipeList(checkCompareRecipeList);
        }
      }
      dispatch(setCompareList([...compareData]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // useEffect(() => {
  //   if (!compareRecipeList?.length && compareList?.length) {
  //     updateFormulateList(compareList);
  //   }

  // }, []);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <>
      <AContainer
        headerIcon="/icons/juicer.svg"
        logo={false}
        headerTitle="Compare Recipe"
        showCollectionTray={{
          show: true,
          showPanle: "left",
          showTagByDeafult: false,
        }}
        showCommentsTray={{
          show: true,
          showPanle: "right",
          showTagByDeafult: false,
        }}
        showVersionTray={{
          show: true,
          showPanle: "right",
          showTagByDeafult: false,
        }}
        headTagInfo={{
          title: "Recipe compare",
          description: "recipe compare",
        }}
      >
        <div className={styles.mainContentDiv}>
          {loading ? (
            <SkeletonComparePage />
          ) : (
            <>
              <SubNav
                backAddress="/recipe_discovery"
                backIconText="Recipe Discovery"
                buttonText={isFormulatePage ? "Compare" : "Formulate"}
                showButton={true}
                buttonClick={handleCompareButtonClick}
                compareAmout={
                  data?.getCompareList2?.length || dbUser?.compareLength
                }
                closeCompare={handleEmptyCompareList}
              />
              <Carousel moreSetting={responsiveSetting}>
                {compareList?.map((recipe, index) => {
                  return (
                    <SmallcardComponent
                      key={index}
                      text={recipe?.recipeId?.name}
                      img={recipe?.recipeId?.image[0]?.image}
                      fnc={handleCompare}
                      recipe={recipe}
                      findCompareRecipe={findCompareRecipe}
                      fucUnCheck={removeCompareRecipe}
                      compareLength={compareRecipeList.length}
                      handleRemoveFromCompare={handleRemoveFromCompareList}
                      id={recipe?.recipeId?._id}
                      defaultVersionId={recipe?.defaultVersion?._id}
                    />
                  );
                })}
              </Carousel>

              <div className={styles.compareRecipeContainer}>
                {isFormulatePage ? (
                  <DragDropContext onDragEnd={onDragEnd}>
                    <div className={styles.comparePageContainer}>
                      <div className={styles.firstColumn}>
                        <CreateNewRecipe
                          newRecipe={newRecipe}
                          setNewRecipe={setNewRecipe}
                          setNewlyCreatedRecipe={setNewlyCreatedRecipe}
                          newlyCreatedRecipe={newlyCreatedRecipe}
                          updateData={updateData}
                          handleCreateNewRecipe={handleCreateNewRecipeByUser}
                          closeCreateNewRecipeInterface={() =>
                            setIsFormulatePage(false)
                          }
                          recipeSaveLoading={
                            createRecipeState?.loading ||
                            EditRecipeState?.loading ||
                            EditARecipeVersionState?.loading
                          }
                        />
                      </div>

                      <div
                        className={styles.secondColumn}
                        style={{
                          ...responsiveColumn(),
                        }}
                      >
                        <Slider
                          {...formulateRecipeResponsiveSetting(
                            compareRecipeList?.length,
                          )}
                          ref={sliderRef}
                        >
                          {compareRecipeList?.map((recipe, index) => {
                            return (
                              <RecipeDetails
                                key={index}
                                recipe={recipe}
                                removeCompareRecipe={removeCompareRecipe}
                                dragAndDrop={true}
                                id={recipe?.recipeId?._id}
                                addItem={addIngredient}
                                compareRecipeList={compareRecipeList}
                                setcompareRecipeList={setCompareRecipeList}
                                setOpenCollectionModal={setOpenCollectionModal}
                                setCopyImage={(image) =>
                                  setNewRecipe((state) => ({
                                    ...state,
                                    image: [image],
                                  }))
                                }
                                updateCompareList={updateCompareList}
                                handleToOpenVersionTray={
                                  handleToOpenVersionTray
                                }
                              />
                            );
                          })}
                        </Slider>
                      </div>
                    </div>
                  </DragDropContext>
                ) : (
                  <Slider {...compareRecipeResponsiveSettings} ref={sliderRef}>
                    {compareRecipeList?.map((recipe, index) => {
                      return (
                        <RecipeDetails
                          key={index}
                          recipe={recipe}
                          removeCompareRecipe={removeCompareRecipe}
                          compareRecipeList={compareRecipeList}
                          setcompareRecipeList={setCompareRecipeList}
                          setOpenCollectionModal={setOpenCollectionModal}
                          updateCompareList={updateCompareList}
                          handleToOpenVersionTray={handleToOpenVersionTray}
                        />
                      );
                    })}
                  </Slider>
                )}
              </div>
            </>
          )}
        </div>
      </AContainer>
      <ShowCollectionModal
        open={openCollectionModal}
        setOpen={setOpenCollectionModal}
        shouldCloseOnOverlayClick={true}
        lastModifiedCollectionName={lastModifiedCollection?.name}
        openCollectionPanel={handleOpenCollectionTray}
      />
    </>
  );
};

export default CompareRecipe;
