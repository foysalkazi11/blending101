/* eslint-disable @next/next/no-img-element */
import CheckCircle from '../../../public/icons/check_circle_black_24dp.svg';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setIngredients } from '../../../redux/slices/sideTraySlice';
import CalciumSearchElem from '../../../theme/calcium/calcium.component';
import DropdownTwoComponent from '../../../theme/dropDown/dropdownTwo.component';
import Linearcomponent from '../../../theme/linearProgress/LinearProgress.component';
import SwitchTwoComponent from '../../../theme/switch/switchTwo.component';
import styles from './filter.module.scss';
import { useLazyQuery, useQuery } from '@apollo/client';
import FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS from '../../../gqlLib/ingredient/query/filterIngredientByCategroyAndClass';
import { GET_ALL_INGREDIENTS_DATA_BASED_ON_NUTRITION } from '../../../gqlLib/recipeDiscovery/query/recipeDiscovery';
import { setAllIngredients } from '../../../redux/slices/ingredientsSlice';
import SkeletonIngredients from '../../../theme/skeletons/skeletonIngredients/SkeletonIngredients';
import CircularRotatingLoader from '../../../theme/loader/circularRotatingLoader.component';
import useGetAllIngredientsDataBasedOnNutrition from '../../../customHooks/useGetAllIngredientsDataBasedOnNutrition';
import IngredientPanelSkeleton from '../../../theme/skeletons/ingredientPanelSleketon/IngredientPanelSkeleton';

type FilterbottomComponentProps = {
  categories?: { title: string; val: string }[];
  handleIngredientClick?: (item: any, exist: boolean) => void;
  checkActiveIngredient?: (arg: any) => boolean;
  scrollAreaMaxHeight?: React.CSSProperties;
};

interface ingredientState {
  name: string;
  value: number;
  units: string;
  ingredientId: string;
}

export default function FilterbottomComponent({
  categories,
  handleIngredientClick = () => {},
  checkActiveIngredient = () => false,
  scrollAreaMaxHeight = { maxHeight: '350px' },
}: FilterbottomComponentProps) {
  const [toggle, setToggle] = useState(1);
  const [dpd, setDpd] = useState({ title: 'All', val: 'All' });

  const dispatch = useAppDispatch();
  const { ingredients: ingredientsList, openFilterTray } = useAppSelector(
    (state) => state.sideTray,
  );
  const { allIngredients } = useAppSelector((state) => state?.ingredients);
  const [searchIngredientData, setSearchIngredientData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(false);
  const [arrayOrderState, setArrayOrderState] = useState([]);
  const [ascendingDescending, setascendingDescending] = useState(true);
  const [list, setList] = useState([]);
  const [rankingDropDownState, setRankingDropDownState] = useState(null);

  const [filterIngredientByCategroyAndClass] = useLazyQuery(
    FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS,
  );

  const { data: IngredientData, loading: nutritionLoading } =
    useGetAllIngredientsDataBasedOnNutrition(
      rankingDropDownState?.id,
      dpd?.val,
      toggle === 2 ? true : false,
    );

  const fetchFilterIngredientByCategroyAndClass = async () => {
    setLoading(true);
    try {
      const { data } = await filterIngredientByCategroyAndClass({
        variables: {
          data: {
            ingredientCategory: dpd?.val,
            IngredientClass: 1,
          },
        },
      });

      dispatch(setAllIngredients(data?.filterIngredientByCategoryAndClass));

      setSearchIngredientData(data?.filterIngredientByCategoryAndClass);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error?.message);
    }
  };

  useEffect(() => {
    if (!allIngredients?.length) {
      fetchFilterIngredientByCategroyAndClass();
    } else {
      setSearchIngredientData(allIngredients);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      if (dpd?.val !== 'All') {
        setSearchIngredientData(
          allIngredients?.filter((item) => item?.category === dpd?.val),
        );
      } else {
        if (allIngredients?.length) {
          setSearchIngredientData(allIngredients);
        } else {
          fetchFilterIngredientByCategroyAndClass();
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dpd]);

  useEffect(() => {
    if (isMounted.current) {
      if (searchInput === '') {
        setSearchIngredientData(allIngredients);
      } else {
        const filter = allIngredients?.filter((item) =>
          //@ts-ignore
          item?.ingredientName
            ?.toLowerCase()
            ?.includes(searchInput?.toLowerCase()),
        );
        setSearchIngredientData(filter);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!IngredientData?.getAllIngredientsDataBasedOnNutrition) return;
    let tempArray = ascendingDescending
      ? [...IngredientData?.getAllIngredientsDataBasedOnNutrition]
      : [...IngredientData?.getAllIngredientsDataBasedOnNutrition]?.reverse();
    setArrayOrderState(tempArray);
  }, [ascendingDescending, IngredientData]);

  return (
    <div className={styles.filter__bottom}>
      <SwitchTwoComponent
        value={toggle}
        setValue={setToggle}
        titleOne="Pictures"
        titleTwo="Rankings"
      />
      <div className={styles.dropdown}>
        <DropdownTwoComponent value={dpd} list={categories} setValue={setDpd} />
      </div>
      {toggle === 1 && (
        <div className={styles.filter__menu}>
          {dpd?.val === 'All' ? (
            <input
              placeholder="Search ingredient"
              value={searchInput}
              onChange={(e) => setSearchInput(e?.target?.value)}
            />
          ) : null}

          {loading ? (
            <SkeletonIngredients />
          ) : searchIngredientData?.length ? (
            <div
              className={`${styles.ingredientContainer} y-scroll`}
              style={scrollAreaMaxHeight}
            >
              {searchIngredientData.map((item, i) => (
                <div
                  key={i}
                  className={styles.item}
                  onClick={() =>
                    handleIngredientClick(
                      item,
                      checkActiveIngredient(item?._id),
                    )
                  }
                >
                  <div className={styles.image}>
                    <img
                      src={item?.featuredImage || '/food/chard.png'}
                      alt={item?.ingredientName}
                    />
                    {checkActiveIngredient(item?._id) && (
                      <div className={styles.tick}>
                        <CheckCircle className={styles.ticked} />
                      </div>
                    )}
                  </div>
                  <p>{item?.ingredientName}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noResult}>
              <p>No Ingredients</p>
            </div>
          )}
        </div>
      )}
      {toggle === 2 && (
        <div className={styles.rankings}>
          <CalciumSearchElem
            ascendingDescending={ascendingDescending}
            setascendingDescending={setascendingDescending}
            list={list}
            setList={setList}
            dropDownState={rankingDropDownState}
            setDropDownState={setRankingDropDownState}
          />
          <div
            className={`${styles.rankgingItemContainer} y-scroll`}
            style={scrollAreaMaxHeight}
          >
            {nutritionLoading ? (
              <IngredientPanelSkeleton />
            ) : arrayOrderState?.length ? (
              arrayOrderState?.map(
                (
                  { name, value, units, ingredientId }: ingredientState,
                  index,
                ) => {
                  return (
                    <Linearcomponent
                      name={name}
                      percent={Number(value?.toFixed(2))}
                      key={index}
                      units={units}
                      //@ts-ignore
                      highestValue={
                        ascendingDescending
                          ? arrayOrderState[0]?.value
                          : arrayOrderState[arrayOrderState?.length - 1]?.value
                      }
                      checkbox={true}
                      checkedState={checkActiveIngredient(ingredientId)}
                      handleOnChange={() =>
                        handleIngredientClick(
                          allIngredients?.find(
                            (item) => item?._id === ingredientId,
                          ) || {},
                          checkActiveIngredient(ingredientId),
                        )
                      }
                    />
                  );
                },
              )
            ) : (
              <div className={styles.noResult}>
                <p>No Ingredients</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
