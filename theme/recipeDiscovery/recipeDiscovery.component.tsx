import React from "react";
import AContainer from "../../containers/A.container";
import styles from "./recipeDiscovery.module.scss";
import Image from "next/image";
import Link from "next/link";
import AppdownLoadCard from "./AppdownLoadCard/AppdownLoadCard.component";
import ContentTray from "./ContentTray/ContentTray.component";

import { recommendedList,recentList,popularList } from "./data";

import DatacardComponent from "../cards/dataCard/dataCard.component";
const RecipeDetails = () => {

  return (
    <AContainer>
      <div className={styles.main__div}>
        <AppdownLoadCard />
        <div className={styles.main__tray}>
          {/* pass list of card to create carousel slider */}

          {/* its for recommended */}
          <ContentTray heading={"Recommended"} image={"/images/thumbs-up.svg"}>
            {recommendedList.map((cardData, index) => {
              {
                return (
                  <div className={styles.slider__card} key={index}>
                    <DatacardComponent
                      title={cardData.title}
                      ingredients={cardData.ingredients}
                      category={cardData.category}
                      ratings={cardData.ratings}
                      noOfRatings={cardData.noOfRatings}
                      carbs={cardData.carbs}
                      score={cardData.score}
                      calorie={cardData.calorie}
                      noOfComments={cardData.noOfComments}
                      image={cardData.image}
                    />
                  </div>
                );
              }
            })}
          </ContentTray>

          {/* its for Recent*/}

          <ContentTray heading={"Recent"} image={"/images/clock-light.svg"}>
            {recentList.map((cardData, index) => {
              {
                return (
                  <div className={styles.slider__card} key={index}>
                    <DatacardComponent
                      title={cardData.title}
                      ingredients={cardData.ingredients}
                      category={cardData.category}
                      ratings={cardData.ratings}
                      noOfRatings={cardData.noOfRatings}
                      carbs={cardData.carbs}
                      score={cardData.score}
                      calorie={cardData.calorie}
                      noOfComments={cardData.noOfComments}
                      image={cardData.image}
                    />
                  </div>
                );
              }
            })}
          </ContentTray>

          {/* its for Popular */}

          <ContentTray heading={"Popular"} image={"/images/fire-alt-light.svg"}>
            {popularList.map((cardData, index) => {
              {
                return (
                  <div className={styles.slider__card} key={index}>
                    <DatacardComponent
                      title={cardData.title}
                      ingredients={cardData.ingredients}
                      category={cardData.category}
                      ratings={cardData.ratings}
                      noOfRatings={cardData.noOfRatings}
                      carbs={cardData.carbs}
                      score={cardData.score}
                      calorie={cardData.calorie}
                      noOfComments={cardData.noOfComments}
                      image={cardData.image}
                    />
                  </div>
                );
              }
            })}
          </ContentTray>
        </div>
      </div>
    </AContainer>
  );
};

export default RecipeDetails;
