import React from "react";
import { useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { GET_INGREDIENTS } from "../../../../../graphql/Ingredients";
import fuzzySearch from "../../../../utility/fuzzySearch";
import Textfield from "../../../../../component/organisms/Forms/Textfield.component";
import Combobox from "../../../../../component/organisms/Forms/Combobox.component";
import IconButton from "../../../../../component/atoms/Button/IconButton.component";
import { faSave, faTimes } from "@fortawesome/pro-regular-svg-icons";
import styles from "./IngredientAddingFormForCompare.module.scss";
import useHideOnClickOutside from "../../../../../modules/app/hooks/interface/useHideOnClickOutside";

interface IngredientEditProps {
  comment?: string;
  ingredientId?: string;
  ingredientName?: string;
  selectedPortionName?: string;
  selectedPortionQuantity?: string;
}
interface IngredientFormProps {
  defaultQuery?: string;
  ingredients: any[];
  defaultIngredient?: any;
  defaultPortion?: any;
  defaultQuantity?: number;
  defaultComment?: string;
  onSave?: any;
  onClose?: any;
  isEditing?: boolean;
}
const IngredientAddingFormForCompare = (
  {
    defaultQuery = "",
    defaultIngredient = null,
    defaultPortion = null,
    //@ts-ignore
    defaultQuantity = "",
    onClose = () => {},
    isEditing = false,
    defaultComment = "",
    onSave = () => {},
    ingredients = [],
  }: IngredientFormProps,
  ref: any = {},
) => {
  const method = useForm();

  const [query, setQuery] = useState(defaultQuery);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [comment, setComment] = useState(defaultComment);
  const [ingredient, setIngredient] = useState(defaultIngredient);
  const [portion, setPortion] = useState(defaultPortion);
  const [quantity, setQuantity] = useState<number | string>(defaultQuantity);
  const [showInputSuggestions, setShowInputSuggestions] = useState(false);
  const hideOnClickOutsideRef = useHideOnClickOutside(() => setShowSuggestion(false));

  const { data } = useQuery(GET_INGREDIENTS, {
    variables: { classType: "All" },
  });

  const editIngredientValue = React.useCallback(
    (info: IngredientEditProps) => {
      const ingredientItem = data?.filterIngredientByCategoryAndClass.find((ing) => ing._id === info.ingredientId);

      if (!ingredientItem) return;
      setIngredient(ingredientItem);
      setQuery(info.ingredientName || ingredientItem.ingredientName);
      setQuantity(info?.selectedPortionQuantity || 1);
      setPortion({ measurement: info?.selectedPortionName });
      setComment(info?.comment);
      setShowSuggestion(false);
      setShowInputSuggestions(true);
    },
    [data?.filterIngredientByCategoryAndClass],
  );

  const addIngredintHandler = (id: string) => {
    const ingredientItem = ingredientList.find((ing) => ing._id === id);
    if (!ingredientItem) return;
    setIngredient(ingredientItem);
    setQuery(ingredientItem.ingredientName);
    setShowSuggestion(false);
    setShowInputSuggestions(true);
  };

  const handleIngredientInputFocus = () => {
    setShowSuggestion(true);
    setShowInputSuggestions(false);
  };

  const ingredientList = useMemo(() => {
    let results = [];
    data?.filterIngredientByCategoryAndClass.forEach((ing) => {
      const isAlreadySelected = ingredients.some((item) => item?.ingredientId === ing?._id);
      if (isAlreadySelected) return;
      const ingredient = fuzzySearch(ing?.ingredientName, query);
      if (ingredient !== "") results.push({ ...ing, name: ingredient });
      // if (query) {
      //   return !isAlreadySelected && fuzzySearch(ing?.ingredientName, query);
      // } else return !isAlreadySelected;
    });
    return results;
  }, [data?.filterIngredientByCategoryAndClass, query, ingredients]);

  const onPortionChange = (e) => {
    const portion = ingredient.portions.find((portion) => portion.measurement === e.target.value);
    setPortion(portion);
  };

  const saveOnEnterPress = (e) => {
    if (e.key !== "Enter") return;
    saveIngredientHandler();
  };

  const handleClose = () => {
    setQuery("");
    setIngredient(null);
    setPortion(null);
    setQuantity(0);
    setComment("");
    setShowSuggestion(false);
    setShowInputSuggestions(false);
  };

  const saveIngredientHandler = () => {
    if (!portion || !quantity || !ingredient) return;
    const newIngredient = { ingredient, portion, quantity, comment, isEditing };
    onSave(newIngredient);

    //Resetting Form
    handleClose();
  };

  // Expose the function through the ref
  React.useImperativeHandle(ref, () => ({
    editIngredientValue,
  }));

  const inputSuggestionsBox = () => {
    return (
      <div className={styles.inputSuggestionsBox}>
        <ul>
          <li className="d-flex ai-center">
            <div style={{ width: "100%", marginRight: "1rem" }}>
              <Combobox
                placeholder="Unit"
                options={ingredient?.portions?.map((portion) => portion.measurement || portion.name) || []}
                name="Unit"
                value={portion?.measurement}
                required
                disabled={ingredient === null}
                onChange={onPortionChange}
                onKeyDown={saveOnEnterPress}
              />
            </div>
            <Textfield
              disabled={portion === null}
              placeholder="Quantity"
              name="recipeTitle"
              accept="number"
              autoComplete="off"
              value={quantity}
              onChange={(e) => {
                if (!isNaN(+e.target.value)) setQuantity(+e.target.value);
              }}
              onKeyDown={saveOnEnterPress}
              style={{ padding: "0 1rem" }}
            />
          </li>
          <li>
            <Textfield
              disabled={quantity === 0}
              placeholder="Type your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ padding: "0 1rem" }}
            />
          </li>
          <li className="d-flex ai-center jc-center">
            <IconButton
              className="ml-10 mr-10"
              variant={quantity === 0 ? "disabled" : "secondary"}
              fontName={faSave}
              size="small"
              onClick={saveIngredientHandler}
            />
            <IconButton fontName={faTimes} size="small" onClick={handleClose} />
          </li>
        </ul>
      </div>
    );
  };

  return (
    <FormProvider {...method}>
      <div ref={hideOnClickOutsideRef}>
        <div className={` ${styles.suggestionsBox}`}>
          <Textfield
            placeholder="Type your ingredients..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleIngredientInputFocus}
            onKeyDown={saveOnEnterPress}
            style={{ padding: "0 1rem" }}
          />
          {showSuggestion ? (
            <IngredientSuggestionsBox
              ingredientList={ingredientList}
              addIngredintHandler={addIngredintHandler}
              query={query}
            />
          ) : (
            showInputSuggestions && inputSuggestionsBox()
          )}
        </div>
      </div>
    </FormProvider>
  );
};

// IngredientAddingFormForCompare.defaultProps = {
//   defaultQuery: "",
//   defaultIngredient: null,
//   defaultPortion: null,
//   //@ts-ignore
//   defaultQuantity: "",
//   onClose: () => {},
//   isEditing: false,
//   defaultComment: "",
//   onSave: () => {},
// };
export default React.forwardRef(IngredientAddingFormForCompare);

const IngredientSuggestionsBox = ({ ingredientList, addIngredintHandler, query }) => {
  return (
    <div className={styles.ingredientSuggestionsBox}>
      <ul>
        {ingredientList?.map((ing) => (
          <li
            key={ing.value}
            onClick={() => addIngredintHandler(ing._id)}
            dangerouslySetInnerHTML={{
              __html: ing?.ingredientName.replace(query, `<b>${query}</b>`),
            }}
          ></li>
        ))}
      </ul>
    </div>
  );
};
