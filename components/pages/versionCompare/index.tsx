import { useMutation, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { FC, useRef, useState, useEffect } from "react";
import AContainer from "../../../containers/A.container";
import GET_ALL_RECIPE_VERSION from "../../../gqlLib/versionCompare/query/getAllRecipeVersions";
import SkeletonComparePage from "../../../theme/skeletons/skeletonComparePage/SkeletonComparePage";
import styles from "./index.module.scss";
import Slider from "react-slick";
import { compareRecipeResponsiveSetting } from "./utility";
import { useAppSelector } from "../../../redux/hooks";
import ErrorPage from "../404Page";
import ArrowBackIcon from "../../../public/icons/arrow_back_black_36dp.svg";
import VersionDetailsIndex from "./versionDetails";
import { DragDropContext } from "react-beautiful-dnd";
import { reorder } from "../../recipe/compareRecipe/utility";
import EDIT_A_VERSION_OF_RECIPE from "../../../gqlLib/versions/mutation/editAVersionOfRecipe";
import notification from "../../utility/reactToastifyNotification";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import { faPen } from "@fortawesome/pro-light-svg-icons";
import { useDispatch } from "react-redux";
import { updateHeadTagInfo } from "../../../redux/slices/headDataSlice";

const compareRecipeResponsiveSettings = {
  ...compareRecipeResponsiveSetting,
  dotsClass: styles.button__bar,
};

const VersionCompare = () => {
  const [singleVersionsEditMode, setSingleVersionsEditMode] = useState(null);
  const [allVersionsEditMode, setAllVersionsEditMode] = useState(false);
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [uploadNewImage, setUploadNewImage] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    versionId: "",
    name: "",
    image: [],
    description: "",
    recipeBlendCategory: "",
    ingredients: [],
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const recipeId = router.query?.recipeId;
  const { dbUser } = useAppSelector((state) => state.user);
  const { data, loading, error } = useQuery(GET_ALL_RECIPE_VERSION, {
    variables: { recipeId, userId: dbUser._id },
  });
  const [
    editAVersionOfRecipe,
    { loading: versionUpdateLoading, error: versionUpdateError },
  ] = useMutation(EDIT_A_VERSION_OF_RECIPE);
  const sliderRef = useRef(null);

  // arrange array for working
  const handleNormalizeData = (data: any): any[] => {
    const normalizeData = data?.recipeVersion?.map(
      ({ _id, postfixTitle, description, ...rest }) => ({
        ...data,
        name: postfixTitle ? postfixTitle : data?.name,
        description: description ? description : data?.description,
        versionId: _id,
        ...rest,
      }),
    );

    return normalizeData;
  };

  // handle go edit mode
  const handleEditMode = (editMode: boolean, index: number | null = null) => {
    setAllVersionsEditMode(editMode);
    setSingleVersionsEditMode(index);
  };

  // update create new recipe data
  const handleUpdateData = (
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

  // find version by id
  const findVersion = (id: string) => {
    const findOne = data?.getAllVersions?.recipeVersion?.find(
      (version) => version?._id === id,
    );
    return findOne;
  };

  // find existing ingredient
  const findItem = (id) => {
    return newRecipe?.ingredients?.find((item) => item?.ingredientId === id);
  };

  // click to add ingredient form others versions
  const addIngredient = (id: string, index: number) => {
    const findRecipe = findVersion(id);

    if (findRecipe) {
      const findIngredient = findRecipe?.ingredients[index];
      const ingredientId = findIngredient?.ingredientId?._id;
      const selectedPortionName = findIngredient?.selectedPortion?.name;
      const selectedPortionGram = findIngredient?.selectedPortion?.gram;
      const ingredientName = findIngredient?.ingredientId?.ingredientName;
      const selectedPortionQuantity = findIngredient?.selectedPortion?.quantity;
      const item = findItem(ingredientId);

      if (!item) {
        const newIngredient = {
          ingredientId: ingredientId,
          selectedPortionName: selectedPortionName,
          weightInGram: selectedPortionGram,
          label: `${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`,
        };

        setNewRecipe((state) => ({
          ...state,
          ingredients: [...state?.ingredients, newIngredient],
        }));
      } else {
        return;
      }
    }
  };

  // click to version edit
  const editVersionClick = (recipe: any, editMode: boolean, index: number) => {
    const {
      name = "",
      description = "",
      ingredients = [],
      image = [],
      recipeBlendCategory = {},
      versionId = "",
    } = recipe;
    let ingredientsArr = [];

    ingredients?.forEach((ing) => {
      const ingredientId = ing?.ingredientId?._id;
      const selectedPortionName = ing?.selectedPortion?.name;
      const selectedPortionGram = ing?.selectedPortion?.gram;
      const ingredientName = ing?.ingredientId?.ingredientName;
      const selectedPortionQuantity = ing?.selectedPortion?.quantity;
      ingredientsArr.push({
        ingredientId: ingredientId,
        selectedPortionName: selectedPortionName,
        weightInGram: selectedPortionGram,
        label: `${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`,
      });
    });

    const defaultImage =
      image?.find((img) => img?.default)?.image || image[0]?.image || "";
    setNewRecipe((state) => ({
      ...state,
      versionId,
      name,
      description,
      image: [defaultImage],
      recipeBlendCategory: recipeBlendCategory?._id,
      ingredients: [...ingredientsArr],
    }));
    handleEditMode(editMode, index);
  };

  // darg and drop data handle
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

  const handleSubmitEditedVersion = async () => {
    //  dispatch(setLoading(true));
    let ingArr = [];
    newRecipe.ingredients?.forEach((item) => {
      ingArr?.push({
        ingredientId: item?.ingredientId,
        selectedPortionName: item?.selectedPortionName,
        weightInGram: parseFloat(item?.weightInGram),
      });
    });

    try {
      let obj = {
        editId: newRecipe?.versionId,
        editableObject: {
          postfixTitle: newRecipe?.name,
          description: newRecipe?.description,
          ingredients: ingArr,
        },
      };

      await editAVersionOfRecipe({
        variables: { data: obj },
        refetchQueries: [
          {
            query: GET_ALL_RECIPE_VERSION,
            variables: { recipeId, userId: dbUser._id },
          }, // DocumentNode object parsed with gql
          "GetAllVersions", // Query name
        ],
      });

      handleEditMode(false, null);
      notification("info", "Version updated successfully");
    } catch (error) {
      notification("error", "Version updated failed");
    }
  };

  useEffect(() => {
    dispatch(
      updateHeadTagInfo({
        title: "Recipe version compare",
        description: "recipe version compare",
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customEditIcon = (recipe: any, isEditMode: boolean, index: number) => (
    <IconWarper
      hover="bgSlightGray"
      handleClick={() => editVersionClick(recipe, true, index)}
      style={{ width: "24px", height: "24px" }}
    >
      <FontAwesomeIcon icon={faPen} fontSize={12} />
    </IconWarper>
  );

  if (loading) {
    return (
      <LayoutComponent>
        <SkeletonComparePage />
      </LayoutComponent>
    );
  }

  if (error) {
    return (
      <LayoutComponent>
        <ErrorPage />
      </LayoutComponent>
    );
  }

  return (
    <>
      <LayoutComponent>
        <div className={styles.versionCompareNav} onClick={() => router.back()}>
          <ArrowBackIcon className={styles.versionCompareNav__icon} />
          <p>Back</p>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Slider {...compareRecipeResponsiveSettings} ref={sliderRef}>
            {handleNormalizeData(data?.getAllVersions)?.map((recipe, index) => {
              return (
                <VersionDetailsIndex
                  key={index}
                  recipe={recipe}
                  id={recipe?.versionId}
                  setOpenCollectionModal={setOpenCollectionModal}
                  dragAndDrop={allVersionsEditMode}
                  newRecipe={newRecipe}
                  setNewRecipe={setNewRecipe}
                  addItem={addIngredient}
                  handleUpdateData={handleUpdateData}
                  index={index}
                  singleVersionsEditMode={singleVersionsEditMode}
                  handleSubmitEditedVersion={handleSubmitEditedVersion}
                  handleEditMode={handleEditMode}
                  customMenu={customEditIcon(recipe, true, index)}
                  versionUpdateLoading={versionUpdateLoading}
                  showMoreMenuAtHover={true}
                />
              );
            })}
          </Slider>
        </DragDropContext>
      </LayoutComponent>
    </>
  );
};

const LayoutComponent: FC = ({ children }) => {
  return (
    <AContainer
      logo={false}
      headerTitle="Compare versions"
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
      <div className={styles.versionCompareContainer}>{children}</div>
    </AContainer>
  );
};

export default VersionCompare;
