import { useQuery } from "@apollo/client";
import {
  faCircleInfo,
  faChartSimple,
  faPen,
  faTrash,
  faBasketShopping,
  faSave,
  faTimes,
} from "@fortawesome/pro-regular-svg-icons";
import { useState, useMemo, Fragment } from "react";
import { GET_INGREDIENTS } from "../../../../graphql/Ingredients";
import { useAppDispatch } from "../../../../redux/hooks";
import {
  addIngredient,
  deleteIngredient,
} from "../../../../redux/slices/Challenge.slice";
import { setShowPanel } from "../../../../redux/slices/Ui.slice";
import Icon from "../../../atoms/Icon/Icon.component";
import Combobox from "../../../organisms/Forms/Combobox.component";
import Textfield from "../../../organisms/Forms/Textfield.component";

import styles from "./Ingredients.module.scss";
import IconButton from "../../../atoms/Button/IconButton.component";
import { FormProvider, useForm } from "react-hook-form";
import ButtonComponent from "../../../../theme/button/button.component";
import fuzzySearch from "../../../../components/utility/fuzzySearch";

const PostIngredient = ({ ingredients, categories }) => {
  const dispatch = useAppDispatch();
  const [editingId, setEditingId] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const showNutrientInfo = (ingredient) => {
    dispatch(
      setShowPanel({
        name: "RXPanel",
        show: true,
        payload: [
          {
            ingredientId: ingredient.ingredientId._id,
            value: ingredient?.selectedPortion?.gram,
          },
        ],
      }),
    );
  };

  const deleteIngredientHandler = (id) => {
    dispatch(deleteIngredient({ id }));
  };

  console.log(ingredients);

  return (
    <div className="row mt-30">
      <div className="col-12">
        <h5 className={styles.headingText}>
          <Icon size="2.5rem" fontName={faBasketShopping} /> Ingredients
        </h5>
        <div className={styles.ingredient__summary}>
          <div>
            Volume: <span>16 oz</span>
          </div>
          <div>
            Consumed: <span>All</span>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="row">
          <div className="col-12">
            <div className={styles.ingredient__card}>
              {ingredients.map((ingredient) => {
                const ingredientId = ingredient.ingredientId._id;
                if (ingredientId !== editingId) {
                  return (
                    <div
                      className={styles.ingredient__content}
                      key={ingredientId}
                    >
                      <div className={styles.ingredient__item}>
                        <div>
                          {ingredient?.ingredientId?.featuredImage ? (
                            <img
                              src={ingredient?.ingredientId?.featuredImage}
                              alt={ingredient.ingredientId.ingredientName}
                            />
                          ) : (
                            <span />
                          )}
                        </div>
                        <span>
                          {ingredient?.selectedPortion?.quantity || 1}{" "}
                          {ingredient?.selectedPortion?.name}
                        </span>
                        <span>{ingredient.ingredientId.ingredientName}</span>
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
                          onClick={() => showNutrientInfo(ingredient)}
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
                          onClick={() =>
                            deleteIngredientHandler(ingredient.ingredientId._id)
                          }
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
                        defaultIngredient={ingredient?.ingredientId}
                        defaultPortion={ingredient?.ingredientId?.portions?.find(
                          (portion) =>
                            portion.measurement ===
                            ingredient?.selectedPortion?.name,
                        )}
                        defaultQuantity={ingredient?.selectedPortion?.quantity}
                        onClose={() => setEditingId("")}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className="mt-10 mb-10">
          {!showAddForm && (
            <ButtonComponent
              value="Add Ingredient"
              variant="transparentHover"
              style={{ padding: "10px 10px", margin: "auto", width: 200 }}
              onClick={() => setShowAddForm(true)}
            />
          )}
          {showAddForm && (
            <IngredientForm
              ingredients={ingredients}
              onClose={() => setShowAddForm(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

interface IngredientFormProps {
  defaultQuery?: string;
  ingredients: any[];
  defaultIngredient?: any;
  defaultPortion?: any;
  defaultQuantity?: number;
  onClose?: any;
  isEditing?: boolean;
}
const IngredientForm: React.FC<IngredientFormProps> = (props) => {
  const {
    isEditing,
    ingredients,
    defaultQuery,
    defaultIngredient,
    defaultPortion,
    defaultQuantity,
    onClose,
  } = props;

  const method = useForm();

  const dispatch = useAppDispatch();

  const [query, setQuery] = useState(defaultQuery);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const [ingredient, setIngredient] = useState(defaultIngredient);
  const [portion, setPortion] = useState(defaultPortion);
  const [quantity, setQuantity] = useState<number | string>(defaultQuantity);

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
      const isAlreadySelected = ingredients.some(
        (item) => item?.ingredientId._id === ing?.value,
      );
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
    const portion = ingredient.portions.find(
      (portion) => portion.measurement === e.target.value,
    );
    setPortion(portion);
  };

  const saveIngredientHandler = () => {
    dispatch(addIngredient({ ingredient, portion, quantity, isEditing }));

    //Resetting Form
    setQuery("");

    setIngredient(null);
    setPortion(null);
    setQuantity(0);

    onClose();
  };

  return (
    <FormProvider {...method}>
      <div className="row">
        <div className={`col-5 ${styles.ingredient__field}`}>
          <Textfield
            placeholder="Type your ingredients..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setShowSuggestion(true);
            }}
          />
          {showSuggestion && (
            <ul>
              {ingredientList?.map((ing) => (
                <li
                  key={ing.value}
                  onClick={() => addIngredintHandler(ing._id)}
                  dangerouslySetInnerHTML={{
                    __html: ing?.ingredientName.replace(
                      query,
                      `<b>${query}</b>`,
                    ),
                  }}
                ></li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-4">
          <Combobox
            placeholder="Unit"
            options={
              ingredient?.portions?.map((portion) => portion.measurement) || []
            }
            name="Unit"
            value={portion?.measurement}
            required
            disabled={ingredient === null}
            onChange={onPortionChange}
          />
        </div>
        <div className="col-3 flex ai-center">
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
          />
          <IconButton
            className="ml-10 mr-10"
            variant={quantity === 0 ? "disabled" : "secondary"}
            fontName={faSave}
            size="small"
            onClick={saveIngredientHandler}
          />
          <IconButton fontName={faTimes} size="small" onClick={onClose} />
        </div>
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
  onClose: () => {},
  isEditing: false,
};
export default PostIngredient;
