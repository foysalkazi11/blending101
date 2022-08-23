import React, { forwardRef, Fragment, useRef, useEffect, useMemo } from "react";
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

interface ChallengePanelProps {
  challenges: any[];
}
const ChallengePanel: React.FC<ChallengePanelProps> = (props) => {
  const { challenges } = props;
  const activeDate = useAppSelector((state) => state.challenge.activeDate);

  // const challenges = useAppSelector((state) => state.planner.challenges);

  const blendContainer = useRef<HTMLDivElement>(null);
  const blends = useRef<HTMLDivElement[]>([]);

  const addToBlendsRef = (element: HTMLDivElement) => {
    if (element && !blends.current.includes(element)) {
      blends.current.push(element);
    }
  };

  useEffect(() => {
    if (!activeDate) return;
    blends.current.forEach((element) => {
      if (element && activeDate === element?.dataset?.date) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        // const headerOffset = 55;
        // const elementPosition = element.getBoundingClientRect().top;
        // console.log(elementPosition);
        // const offsetPosition =
        //   elementPosition + window.pageYOffset - headerOffset;
        // blendContainer.current.scrollTo({
        //   top: offsetPosition,
        //   behavior: "smooth",
        // });
      }
    });
    return;
  }, [activeDate]);

  const challengePosts = useMemo(() => {
    const challengPosts = [];
    challenges?.forEach((challenge: IChallengePosts) => {
      if (challenge.posts.length === 0) return;
      challengPosts.push(
        <BlendCard key={challenge?._id} ref={addToBlendsRef} {...challenge} />,
      );
    });
    return challengPosts;
  }, [challenges]);

  return (
    <Fragment>
      <IconHeading
        icon={faTrophy}
        title={"Challenge Post"}
        iconStyle={{ fontSize: "18px" }}
      />
      <div className={styles.card__wrapper} ref={blendContainer}>
        {challengePosts.reverse()}
      </div>
    </Fragment>
  );
};

ChallengePanel.defaultProps = {
  challenges: [],
};

const BlendCard = forwardRef((props: IChallengePosts, ref: any) => {
  const { date, images, posts } = props;
  return (
    <div className={styles.card} data-date={date} ref={ref}>
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
});

BlendCard.displayName = "BlendCard";

export default ChallengePanel;
