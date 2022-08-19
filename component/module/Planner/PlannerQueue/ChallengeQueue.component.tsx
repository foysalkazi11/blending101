import React, { Fragment } from "react";
import IconHeading from "../../../../theme/iconHeading/iconHeading.component";
import SplitImageCard from "../../../../theme/card/splitImageCard/splitImageCard.component";

import styles from "./ChallengeQueue.module.scss";
import { useAppSelector } from "../../../../redux/hooks";
import { format } from "date-fns";
import { faChartBar, faTrophy } from "@fortawesome/pro-light-svg-icons";
import IconButton from "../../../atoms/Button/IconButton.component";
import Icon from "../../../atoms/Icon/Icon.component";
import { faCircle } from "@fortawesome/pro-solid-svg-icons";
import { IChallengePosts } from "../../../../redux/slices/Planner.slice";

interface IChallenge {
  date: string;
  images: string[];
  posts: {
    id: string;
    title: string;
    category: string;
    ingredients: any[];
    rxScore: number;
    calories: number;
    gl: number;
    note: string;
  }[];
}
const ChallengePanel = () => {
  const challenges = useAppSelector((state) => state.planner.challenges);

  return (
    <Fragment>
      <IconHeading
        icon={faTrophy}
        title={"Challenge Post"}
        iconStyle={{ fontSize: "18px" }}
      />
      <div className={styles.card__wrapper}>
        {challenges &&
          challenges.length > 0 &&
          challenges?.map((challenge: IChallengePosts) => (
            <BlendCard key={challenge?._id} {...challenge} />
          ))}
      </div>
    </Fragment>
  );
};

const BlendCard = (props: IChallengePosts) => {
  const { date, images, posts } = props;
  return (
    <div className={styles.card}>
      <div className={styles.card__headline}>
        <Icon fontName={faCircle} size="2rem" style={{ color: "#7cbc39" }} />
        <h5>{format(date ? new Date(date) : new Date(), "EEEE, MMMM d")}</h5>
      </div>
      <div className={styles.card__content}>
        {images.length > 0 && (
          <div className={styles.space}>
            <SplitImageCard
              images={images}
              date={date ? new Date(date) : new Date()}
            />
          </div>
        )}
        {posts.length > 0 &&
          posts?.map((post) => {
            let ingredients = "";
            post.ingredients.forEach((ingredient, index) => {
              ingredients +=
                ingredient?.ingredientId?.ingredientName +
                `${index + 1 !== post.ingredients.length ? ", " : ""}`;
            });
            return (
              <div key={post._id} className="mb-10">
                <div className={styles.recipe}>
                  <div className={styles.space}>
                    <h3 className={styles.recipe__title}>{post.name}</h3>
                    <div className="flex jc-between ai-center">
                      <span className={styles.recipe__category}>
                        {post?.recipeBlendCategory?.name}
                      </span>
                      <IconButton
                        fontName={faChartBar}
                        variant="fade"
                        size="small"
                        // onClick={editHandler}
                      />
                    </div>
                    <p className={styles.recipe__ingredients}>{ingredients}</p>
                  </div>
                  <div className={styles.recipe__summary}>
                    <span>
                      RX Score <b>240</b>
                    </span>
                    <span>
                      Calories <b>275</b>
                    </span>
                    <span>
                      GL <b>240</b>
                    </span>
                  </div>
                </div>
                {post.note && (
                  <div className={styles.note}>
                    <h5 className={styles.note__headline}>Blend Notes</h5>
                    <p className={styles.note__content}>{post.note}</p>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default ChallengePanel;
