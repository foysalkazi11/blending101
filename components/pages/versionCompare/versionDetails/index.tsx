import { faPen } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useRef, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useAppSelector } from "../../../../redux/hooks";
import IconWarper from "../../../../theme/iconWarper/IconWarper";
import CreateNewRecipe from "../../../recipe/share/createNewRecipe/CreateNewRecipe";
import RecipeDetails from "../../../recipe/share/recipeDetails/RecipeDetails";
import VersionDetails from "./VersionDetails";
import Slider from "react-slick";
import styles from "../index.module.scss";
import { compareRecipeResponsiveSetting } from "../utility";
import { reorder } from "../../../recipe/compareRecipe/utility";
const compareRecipeResponsiveSettings = {
  ...compareRecipeResponsiveSetting,
  dotsClass: styles.button__bar,
};

const VersionDetailsIndex = (props) => {
  const {
    versionId,
    setAllVersionsEditMode,
    setOpenCollectionModal,
    recipe,
    mainRecipe,
    ...rest
  } = props;
  const [singleVersionsEditMode, setSingleVersionsEditMode] = useState(false);
  const [uploadNewImage, setUploadNewImage] = useState(false);

  const { dbUser } = useAppSelector((state) => state?.user);
  const [newRecipe, setNewRecipe] = useState({
    userId: dbUser?._id || "",
    name: "",
    image: [],
    description: "",
    recipeBlendCategory: "61cafc34e1f3e015e7936587",
    ingredients: [],
  });
  const sliderRef = useRef(null);

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

  // handle go edit mode
  const handleEditMode = (editMode: boolean) => {
    setAllVersionsEditMode(editMode);
    setSingleVersionsEditMode(editMode);
  };

  // click to version edit
  const editVersionClick = (recipe: any, editMode: boolean) => {
    const {
      name = "",
      description = "",
      ingredients = [],
      image = [],
      recipeBlendCategory = {},
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
      name,
      description,
      image: [defaultImage],
      recipeBlendCategory: recipeBlendCategory?._id,
      ingredients: [...state?.ingredients, ...ingredientsArr],
    }));
    handleEditMode(editMode);
  };

  // find version by id

  const findVersion = (id: string) => {
    const findOne = mainRecipe?.recipeVersion?.find(
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
    console.log(findRecipe);

    if (findRecipe) {
      const findIngredient = findRecipe?.ingredients[index];
      console.log(findIngredient);

      const ingredientId = findIngredient?.ingredientId?._id;
      const selectedPortionName = findIngredient?.selectedPortion?.name;
      const selectedPortionGram = findIngredient?.selectedPortion?.gram;
      const ingredientName = findIngredient?.ingredientId?.ingredientName;
      const selectedPortionQuantity = findIngredient?.selectedPortion?.quantity;

      const item = findItem(ingredientId);
      console.log(item);

      if (!item) {
        const newIngredient = {
          ingredientId: ingredientId,
          selectedPortionName: selectedPortionName,
          weightInGram: selectedPortionGram,
          label: `${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`,
        };
        console.log(newIngredient);

        setNewRecipe((state) => ({
          ...state,
          ingredients: [...state?.ingredients, newIngredient],
        }));
      } else {
        return;
      }
    }
  };

  useEffect(() => {
    console.log(newRecipe);
  }, [newRecipe]);

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

  return (
    <>
      {singleVersionsEditMode ? (
        <CreateNewRecipe
          newRecipe={newRecipe}
          setNewRecipe={setNewRecipe}
          updateData={handleUpdateData}
          closeCreateNewRecipeInterface={() => handleEditMode(false)}
          disableCategory={true}
          disableImageUpload={true}
        />
      ) : (
        <RecipeDetails
          {...rest}
          recipe={recipe}
          id={versionId}
          addItem={addIngredient}
          customMenu={
            <IconWarper
              hover="bgSlightGray"
              handleClick={() => editVersionClick(recipe, true)}
              style={{ width: "30px", height: "30px" }}
            >
              <FontAwesomeIcon icon={faPen} fontSize={14} />
            </IconWarper>
          }
        />
      )}
    </>
  );
};

const SingleVersionRecipe = (versions: any[]) => {};

export default VersionDetailsIndex;
