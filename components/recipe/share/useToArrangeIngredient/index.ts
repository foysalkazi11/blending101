export const useToArrangeIngredient = () => {
  const arrangeIngredient = (ingredient: any) => {
    let selectedPortionObj: { [key: string]: any } = {};
    let hasSelectedPortion = ingredient?.selectedPortion;
    if (hasSelectedPortion) {
      selectedPortionObj = {
        selectedPortion: {
          gram: hasSelectedPortion?.gram,
          name: hasSelectedPortion?.name,
          quantity: hasSelectedPortion?.quantity || 1,
        },
        weightInGram: hasSelectedPortion?.gram,
      };
    } else {
      const defaultPortion = ingredient?.portions?.find((ing) => ing?.default) || ingredient?.portions?.[0];
      selectedPortionObj = {
        selectedPortion: {
          gram: parseFloat(defaultPortion?.meausermentWeight),
          name: defaultPortion?.measurement,
          quantity: ingredient?.selectedPortion?.quantity || 1,
        },
        weightInGram: parseFloat(defaultPortion?.meausermentWeight),
      };
    }

    const newIngredient = {
      ...ingredient,
      ingredientId: {
        _id: ingredient?._id,
        ingredientName: ingredient?.ingredientName,
        featuredImage: ingredient?.featuredImage,
        images: ingredient?.images,
      },
      ...selectedPortionObj,
      ingredientStatus: "ok",
      originalIngredientName: ingredient?.originalIngredientName || ingredient?.ingredientName,
      quantityString: ingredient?.quantityString || "1",
    };

    return newIngredient;
  };

  return arrangeIngredient;
};

export const useToArrangeIngredientBeforeSave = () => {
  const arrangeIngredientBeforeSave = (selectedIngredientsList: any[]) => {
    let ingArr = [];
    selectedIngredientsList?.forEach((item) => {
      let selectedPortion = item?.selectedPortion;
      if (selectedPortion) {
        ingArr.push({
          ingredientId: item?._id,
          selectedPortionName: selectedPortion?.name,
          weightInGram: selectedPortion?.gram,
          originalIngredientName: item?.originalIngredientName,
          quantityString: item?.quantityString,
          comment: item?.comment || null,
        });
      }
    });

    return ingArr;
  };

  return arrangeIngredientBeforeSave;
};
