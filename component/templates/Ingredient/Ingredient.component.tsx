import { useQuery } from "@apollo/client";
import { faCircleInfo, faChartSimple, faPen, faTrash, faSave, faTimes } from "@fortawesome/pro-regular-svg-icons";
import { useState, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import fuzzySearch from "../../../components/utility/fuzzySearch";
import { GET_INGREDIENTS } from "../../../modules/app/graphql/Ingredients";
import ButtonComponent from "../../../theme/button/button.component";
import IconButton from "../../atoms/Button/IconButton.component";
import Icon from "../../atoms/Icon/Icon.component";
import Combobox from "../../organisms/Forms/Combobox.component";
import Textfield from "../../organisms/Forms/Textfield.component";
import styles from "./Ingredient.module.scss";
import { NextImageWithFallback } from "../../../theme/imageWithFallback";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShoppingSimple } from "@fortawesome/pro-light-svg-icons";
import { decimalToMixedNumber } from "helpers/Number";
import { IngredientPortion, IngredientWithPortion, Portions } from "@/app/types/ingredient.types";
import Tooltip from "theme/toolTip/CustomToolTip";

interface IngredientPanelProps {
  ingredients: IngredientWithPortion[];
  onNutrition?: any;
  onDelete?: any;
  onDeleteErrorIngredient?: (qaIa: string) => void;
  onSave?: any;
  hasComment?: boolean;
  singleIngredient?: { [key: string]: any };
}

const IngredientPanel = (props: IngredientPanelProps) => {
  const {
    ingredients,
    onNutrition = () => {},
    onDelete,
    onDeleteErrorIngredient = () => {},
    onSave,
    hasComment,
    singleIngredient = {},
  } = props;

  const [editingId, setEditingId] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const handleSetSingleIngredient = (ingredient: IngredientWithPortion = {}) => {
    window.scrollBy(0, 0);
    onNutrition(ingredient?.ingredientId?._id === singleIngredient?.ingredientId?._id ? {} : ingredient);
  };

  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12">
          <div className={styles.ingredient__card}>
            {ingredients?.map((ingredient, index) => {
              const isIngredientStatusOk = ingredient?.errorString;

              if (!isIngredientStatusOk) {
                const ingredientId = ingredient.ingredientId?._id || "";
                const [fullNumber, fractionNumber] = ingredient?.quantityString?.split(" ") || ["", ""];
                // const [fullNumber, fractionNumber] = decimalToMixedNumber(ingredient?.selectedPortion?.quantity);
                const portions: IngredientPortion[] = ingredient?.ingredientId?.portions || ingredient?.portions;
                if (ingredientId !== editingId) {
                  return (
                    <div className={styles.ingredient__content} key={ingredientId}>
                      <div className={styles.ingredient__item}>
                        <div className={styles.description}>
                          {ingredient?.ingredientId?.featuredImage ? (
                            <NextImageWithFallback
                              src={ingredient?.ingredientId?.featuredImage}
                              alt={ingredient.ingredientId.ingredientName}
                              fallbackSrc="/food/chard.png"
                              width={28}
                              height={28}
                              style={{ objectFit: "contain" }}
                            />
                          ) : (
                            <FontAwesomeIcon icon={faBasketShoppingSimple} size="lg" />
                          )}
                        </div>
                        <span>
                          {fullNumber}
                          <sup>{fractionNumber}</sup> {ingredient?.selectedPortion?.name}
                          {/* {fullNumber === 0 ? fractionNumber : fullNumber}
                          {fullNumber !== 0 && <sup>{fractionNumber}</sup>} {ingredient?.selectedPortion?.name} */}
                        </span>
                        <Tooltip
                          direction="top"
                          content={
                            ingredient.ingredientId.ingredientName ||
                            ingredient?.originalIngredientName ||
                            "Ingredient Name"
                          }
                          style={{ display: "inline-block" }}
                        >
                          <span
                            // onClick={() => onNutrition(ingredient)}
                            className={`${styles.highlighted} ${
                              ingredient?.ingredientId?._id === singleIngredient?.ingredientId?._id &&
                              "activeColorPrimary"
                            }`}
                            onClick={() => handleSetSingleIngredient(ingredient)}
                          >
                            {ingredient?.originalIngredientName || ingredient.ingredientId.ingredientName}
                          </span>
                        </Tooltip>
                      </div>
                      <div className={styles.ingredient__actions}>
                        <a
                          href={`/wiki/Ingredient/${ingredient.ingredientId._id}/${ingredient?.selectedPortion?.gram}/`}
                        >
                          <Icon
                            size="small"
                            color="primary"
                            fontName={faCircleInfo}
                            className={styles.ingredient__button}
                          />
                        </a>
                        <Icon
                          size="small"
                          color="primary"
                          fontName={faChartSimple}
                          className={styles.ingredient__button}
                          onClick={() => handleSetSingleIngredient(ingredient)}
                        />
                        <Icon
                          size="small"
                          color="primary"
                          fontName={faPen}
                          className={styles.ingredient__button}
                          onClick={() => {
                            setEditingId(ingredientId);
                            setShowAddForm(false);
                          }}
                        />
                        <Icon
                          size="small"
                          color="primary"
                          fontName={faTrash}
                          className={styles.ingredient__button}
                          onClick={() => onDelete(ingredient.ingredientId._id, ingredient)}
                        />
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="mt-20 mb-10" key={ingredientId}>
                      <IngredientForm
                        isEditing
                        ingredients={ingredients}
                        defaultQuery={ingredient?.ingredientId?.ingredientName}
                        defaultIngredient={ingredient?.ingredientId?.portions ? ingredient?.ingredientId : ingredient}
                        defaultPortion={portions?.find(
                          (portion: Portions) => portion?.measurement === ingredient?.selectedPortion?.name,
                        )}
                        defaultQuantity={ingredient?.quantityString || ingredient?.selectedPortion?.quantity}
                        defaultComment={ingredient?.comment}
                        onSave={onSave}
                        onClose={() => setEditingId("")}
                        hasComment={hasComment}
                        setShowAddForm={setShowAddForm}
                      />
                    </div>
                  );
                }
              } else {
                return (
                  <div key={index} className={styles.errorIngredient}>
                    <div className={styles.leftSide}>
                      <FontAwesomeIcon icon={faBasketShoppingSimple} size="lg" />
                      <p className={styles.text}>{ingredient?.errorString}</p>
                    </div>

                    <Icon
                      size="small"
                      color="primary"
                      fontName={faTrash}
                      className={styles.button}
                      //@ts-ignore
                      onClick={() => onDeleteErrorIngredient(ingredient?.qaId)}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div className="mt-10 mb-10">
        {showAddForm ? (
          <IngredientForm
            ingredients={ingredients}
            onSave={onSave}
            hasComment={hasComment}
            setShowAddForm={setShowAddForm}
            onClose={() => setShowAddForm(false)}
          />
        ) : (
          <ButtonComponent
            value="Add Ingredient"
            variant="transparentHover"
            style={{ padding: "10px 10px", margin: "auto", width: 200 }}
            onClick={() => setShowAddForm(true)}
          />
        )}
      </div>
    </div>
  );
};

interface IngredientFormProps {
  hasComment: boolean;
  defaultQuery?: string;
  ingredients: any[];
  defaultIngredient?: any;
  defaultPortion?: any;
  defaultQuantity?: number | string;
  defaultComment?: string;
  onSave?: any;
  onClose?: any;
  isEditing?: boolean;
  setShowAddForm?: any;
}
const IngredientForm: React.FC<IngredientFormProps> = (props) => {
  const {
    isEditing,
    ingredients,
    defaultQuery,
    defaultIngredient,
    defaultPortion,
    defaultQuantity,
    defaultComment,
    onClose,
    onSave,
    hasComment,
    setShowAddForm,
  } = props;

  const method = useForm();

  const [query, setQuery] = useState(defaultQuery);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const [ingredient, setIngredient] = useState(defaultIngredient);
  const [portion, setPortion] = useState(defaultPortion);
  const [quantity, setQuantity] = useState<number | string>(defaultQuantity);
  const [comment, setComment] = useState(defaultComment);

  const { data } = useQuery(GET_INGREDIENTS, {
    variables: { classType: "All" },
  });

  const addIngredintHandler = (id: string) => {
    const ingredientItem = ingredientList.find((ing) => ing._id === id);
    if (!ingredientItem) return;
    setIngredient(ingredientItem);
    setQuery(ingredientItem.ingredientName);
    setShowSuggestion(false);
  };

  const ingredientList = useMemo(() => {
    let results = [];
    data?.filterIngredientByCategoryAndClass.forEach((ing) => {
      const isAlreadySelected = ingredients.some((item) => item?.ingredientId?._id === ing?.value);
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
    setShowAddForm(true);
  };

  const saveIngredientHandler = () => {
    if (!portion || !quantity || !ingredient) return;
    onSave({ ingredient, portion, quantity, comment, isEditing });

    //Resetting Form
    setQuery("");

    setIngredient(null);
    setPortion(null);
    setQuantity(0);
    setComment("");

    onClose();
  };

  const ActionButton = () => (
    <>
      <IconButton
        color="white"
        className="ml-10 mr-10"
        variant={quantity === 0 ? "disabled" : "secondary"}
        fontName={faSave}
        size="small"
        onClick={saveIngredientHandler}
      />
      <IconButton fontName={faTimes} size="small" onClick={onClose} />
    </>
  );

  return (
    <FormProvider {...method}>
      <div className="row">
        <div className={`col-${hasComment ? 4 : 5} ${styles.ingredient__field}`}>
          <Textfield
            placeholder="Type your ingredients..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setShowSuggestion(true);
            }}
            onKeyDown={saveOnEnterPress}
          />
          {showSuggestion && (
            <ul>
              {ingredientList?.map((ing) => (
                <li
                  key={ing.value}
                  onClick={() => addIngredintHandler(ing._id)}
                  dangerouslySetInnerHTML={{
                    __html: ing?.ingredientName.replace(query, `<b>${query}</b>`),
                  }}
                />
              ))}
            </ul>
          )}
        </div>
        <div className={`col-${hasComment ? 2 : 4}`}>
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

        <div className={hasComment ? "col-2" : "col-3 flex ai-center"}>
          <Textfield
            disabled={portion === null}
            placeholder="Quantity"
            name="recipeTitle"
            autoComplete="off"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            onKeyDown={saveOnEnterPress}
          />
          {!hasComment && <ActionButton />}
        </div>
        {hasComment && (
          <div className="col-4 flex ai-center">
            <Textfield
              name="comment"
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <ActionButton />
          </div>
        )}
      </div>
    </FormProvider>
  );
};

IngredientForm.defaultProps = {
  defaultQuery: "",
  defaultIngredient: null,
  defaultPortion: null,
  //@ts-ignore
  defaultQuantity: "",
  defaultComment: "",
  onClose: () => {},
  isEditing: false,
};
export default IngredientPanel;
