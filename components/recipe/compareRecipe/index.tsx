import React, { useState, useRef, useEffect } from "react";
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
import FooterRecipeFilter from "../../footer/footerRecipeFilter.component";
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
  const [createAndEditRecipeLoading, setCreateAndEditRecipeLoading] =
    useState(false);
  const [isFormulatePage, setIsFormulatePage] = useState(false);
  const [copyImage, setCopyImage] = useState("");
  const router = useRouter();
  const { compareList } = useAppSelector((state) => state.recipe);
  const [compareRecipeList, setCompareRecipeList] = useLocalStorage<any>(
    "compareList",
    [],
  );
  const [newlyCreatedRecipe, setNewlyCreatedRecipe] = useLocalStorage<any>(
    "newlyCreatedRecipe",
    {},
  );
  const [createNewRecipeByUser] = useMutation(CREATE_A_RECIPE_BY_USER);
  const [editRecipe] = useMutation(EDIT_A_RECIPE);
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

  const [emptyCompareList] = useMutation(EMPTY_COMPARE_LIST);
  const { latest, popular, recommended } = useAppSelector(
    (state) => state?.recipe,
  );
  const changeCompare = useChangeCompare();

  const [uploadNewImage, setUploadNewImage] = useState(false);
  const { lastModifiedCollection } = useAppSelector(
    (state) => state?.collections,
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
    return compareRecipeList?.find((item) => item?._id === id);
  };

  const handleRemoveFromCompareList = (id: string, e: React.SyntheticEvent) => {
    changeCompare(e, id, false, compareRecipeList, setCompareRecipeList);
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
      ...state.filter((item) => item?._id !== id),
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

  const findItem = (id) => {
    return newRecipe?.ingredients?.find((item) => item?.ingredientId === id);
  };

  const addIngredient = (id: string, index: number) => {
    const findRecipe = findCompareRecipe(id);
    const findIngredient = findRecipe?.ingredients[index];
    const ingredientId = findIngredient?.ingredientId?._id;
    const selectedPortionName = findIngredient?.selectedPortion?.name;
    const selectedPortionGram = findIngredient?.selectedPortion?.gram;
    const ingredientName = findIngredient?.ingredientId?.ingredientName;
    const selectedPortionQuantity = findIngredient?.selectedPortion?.quantity;

    const item = findItem(ingredientId);

    if (!item) {
      setNewRecipe((state) => ({
        ...state,
        ingredients: [
          ...state?.ingredients,
          {
            ingredientId: ingredientId,
            selectedPortionName: selectedPortionName,
            weightInGram: selectedPortionGram,
            label: `${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`,
          },
        ],
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
    setNewlyCreatedRecipe({});
    setNewRecipe((state) => ({ ...state, ingredients: [] }));
  };

  const handleCompareButtonClick = () => {
    //@ts-ignore
    if (newlyCreatedRecipe?._id) {
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

  const updateFormulateList = (compareList: any[]) => {
    if (compareList?.length === 1) {
      setCompareRecipeList([{ ...compareList[0] }]);
    }
    if (compareList?.length === 2) {
      setCompareRecipeList([...compareList?.slice(0, 2)]);
    }
    if (compareList?.length >= 3) {
      setCompareRecipeList([...compareList?.slice(0, 3)]);
    }
  };

  const handleCreateNewRecipeByUser = async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (newlyCreatedRecipe?._id) {
      if (newRecipe?.name && newRecipe?.ingredients?.length) {
        setCreateAndEditRecipeLoading(true);
        try {
          let imgArr = [];
          if (uploadNewImage && newRecipe?.image?.length) {
            const url = await imageUploadS3(newRecipe?.image);
            imgArr?.push({
              image: `${url}`,
              default: true,
            });
          } else {
            if (newlyCreatedRecipe?.image?.length) {
              imgArr?.push({
                image: `${newlyCreatedRecipe?.image[0]?.image}`,
                default: newlyCreatedRecipe?.image[0]?.default,
              });
            }
          }
          await editRecipe({
            variables: {
              data: {
                editId: newlyCreatedRecipe?._id,
                editableObject: {
                  name: newRecipe?.name,
                  image: imgArr,
                  description: newRecipe?.description,
                  ingredients: newRecipe?.ingredients?.map(
                    ({ ingredientId, selectedPortionName, weightInGram }) => ({
                      ingredientId,
                      selectedPortionName,
                      weightInGram,
                    }),
                  ),
                  recipeBlendCategory: newRecipe?.recipeBlendCategory,
                },
              },
            },
          });

          setCreateAndEditRecipeLoading(false);
          notification("success", "Recipe updated successfully");
        } catch (error) {
          setCreateAndEditRecipeLoading(false);
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
        setCreateAndEditRecipeLoading(true);
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
            ingredients: newRecipe?.ingredients?.map(
              ({ ingredientId, selectedPortionName, weightInGram }) => ({
                ingredientId,
                selectedPortionName,
                weightInGram,
              }),
            ),
          };
          const { data } = await createNewRecipeByUser({
            variables: {
              data: obj,
            },
          });
          setCreateAndEditRecipeLoading(false);
          notification("success", "Recive saved successfully");
          if (data?.addRecipeFromUser?._id) {
            setNewlyCreatedRecipe(data?.addRecipeFromUser);
            setUploadNewImage(false);
            // router?.push(`/recipe_details/${data?.addRecipeFromUser?._id}`);
          }
        } catch (error) {
          setCreateAndEditRecipeLoading(false);
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

  useEffect(() => {
    if (!loading) {
      if (!compareRecipeList?.length) {
        updateFormulateList(data?.getCompareList);
      }
      dispatch(setCompareList([...data?.getCompareList]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (!compareRecipeList?.length && compareList?.length) {
      updateFormulateList(compareList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AContainer
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
                compareAmout={dbUser?.compareLength}
                closeCompare={handleEmptyCompareList}
              />
              <Carousel moreSetting={responsiveSetting}>
                {compareList?.map((recipe, index) => {
                  return (
                    <SmallcardComponent
                      key={index}
                      text={recipe?.name}
                      img={recipe?.image[0]?.image}
                      fnc={handleCompare}
                      recipe={recipe}
                      findCompareRecipe={findCompareRecipe}
                      fucUnCheck={removeCompareRecipe}
                      compareLength={compareRecipeList.length}
                      handleRemoveFromCompare={handleRemoveFromCompareList}
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
                          copyImage={copyImage}
                          updateData={updateData}
                          handleCreateNewRecipe={handleCreateNewRecipeByUser}
                          closeCreateNewRecipeInterface={() =>
                            setIsFormulatePage(false)
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
                                id={recipe?._id}
                                addItem={addIngredient}
                                compareRecipeList={compareRecipeList}
                                setcompareRecipeList={setCompareRecipeList}
                                setOpenCollectionModal={setOpenCollectionModal}
                                setCopyImage={setCopyImage}
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
                        />
                      );
                    })}
                  </Slider>
                )}
              </div>
            </>
          )}
        </div>
        <FooterRecipeFilter />
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
