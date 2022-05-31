/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction } from 'react';
import styles from './left_tray_recipe_edit.module.scss';
import FilterbottomComponent from '../../../sidetray/filter/filterBottom.component';
import { categories } from '../../../utility/staticData';
interface RecipeData {
  handleIngredientClick?: (ingredient: any, present: boolean) => void;
  checkActive?: (id: string) => boolean;
}
const Left_tray_recipe_edit = ({
  checkActive = (id: string) => false,
  handleIngredientClick = (ingredient: any, present: boolean) => {},
}: RecipeData) => {
  return (
    <div className={styles.left_main_container}>
      <div className={styles.filter}>
        <div className={styles.filter__top} style={{ marginTop: '15px' }}>
          <h3>Ingredients</h3>
          <FilterbottomComponent
            categories={categories}
            checkActiveIngredient={checkActive}
            handleIngredientClick={handleIngredientClick}
            scrollAreaMaxHeight={{ maxHeight: '520px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Left_tray_recipe_edit;
