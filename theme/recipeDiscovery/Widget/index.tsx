import router from 'next/router';
import React, { useState } from 'react';
import DatacardComponent from '../../cards/dataCard/dataCard.component';
import ContentTray from '../ContentTray/ContentTray.component';

import styles from '../recipeDiscovery.module.scss';

interface WidgetCollectionProps {
  collection: any;
  compareRecipeList: any;
  setcompareRecipeList: any;
}

const WidgetCollection = (props: WidgetCollectionProps) => {
  const { collection, compareRecipeList, setcompareRecipeList } = props;

  const [tab, setTab] = useState('All');
  const { data, filter, icon, banner, displayName, showTabMenu } = collection;
  const { filterType, values } = filter;
  const results = data[data?.collectionType] || [];

  const items =
    tab === 'All'
      ? results
      : results.filter((recipe) => {
          console.log(recipe);
          const filterProps = recipe[filterType];
          if (Array.isArray(filterProps)) {
            return filterProps.includes(tab);
          } else {
            return filterProps === tab;
          }
        });

  return (
    <ContentTray
      heading={collection.displayName}
      hasFilter
      filters={[...values].sort()}
      tabState={[tab, setTab]}
      image={'/images/fire-alt-light.svg'}
      customHTML={items.length === 0}
    >
      {items?.length > 0 &&
        items?.map((item, index) => {
          let ingredients = [];
          item?.ingredients?.forEach((ing) => {
            const ingredient = ing?.ingredientId?.ingredientName;
            ingredients.push(ingredient);
          });
          const ing = ingredients.join(', ');
          {
            return (
              <div
                className={styles.slider__card}
                key={'popular' + index}
                onClick={() => router.push(`/recipe_details/${item?._id}`)}
              >
                <DatacardComponent
                  title={item.name}
                  ingredients={ing}
                  category={item.recipeBlendCategory?.name}
                  ratings={item?.averageRating}
                  noOfRatings={item?.numberOfRating}
                  carbs={item.carbs}
                  score={item.score}
                  calorie={item.calorie}
                  noOfComments={item?.numberOfRating}
                  image={item.image[0]?.image}
                  recipeId={item?._id}
                  notes={item?.notes}
                  addedToCompare={item?.addedToCompare}
                  compareRecipeList={compareRecipeList}
                  setcompareRecipeList={setcompareRecipeList}
                />
              </div>
            );
          }
        })}
      {}
    </ContentTray>
  );
};

export default WidgetCollection;
