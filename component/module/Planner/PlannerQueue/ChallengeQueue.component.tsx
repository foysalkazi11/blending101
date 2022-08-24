import React, {
  forwardRef,
  Fragment,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import IconHeading from "../../../../theme/iconHeading/iconHeading.component";
import SplitImageCard from "../../../../theme/card/splitImageCard/splitImageCard.component";

import styles from "./ChallengeQueue.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { format } from "date-fns";
import { faChartBar, faTrophy } from "@fortawesome/pro-light-svg-icons";
import IconButton from "../../../atoms/Button/IconButton.component";
import Icon from "../../../atoms/Icon/Icon.component";
import { faCircle } from "@fortawesome/pro-solid-svg-icons";
import {
  IPostIngredient,
  setChallengePost,
  setShowPostForm,
} from "../../../../redux/slices/Challenge.slice";
import { RECIPE_CATEGORY_COLOR } from "../../../../data/Recipe";

interface IPost {
  _id: string;
  name: string;
  recipeBlendCategory: {
    _id: string;
    name: string;
  };
  ingredients: IPostIngredient[];
  images: string[];
  rxScore: number;
  calories: number;
  gl: number;
  note: string;
}

interface IChallengePosts {
  _id: string;
  date: string;
  posts: IPost[];
}
interface ChallengePanelProps {
  challenges: any[];
}
const ChallengePanel: React.FC<ChallengePanelProps> = (props) => {
  const { challenges } = props;

  const dispatch = useAppDispatch();
  const activeDate = useAppSelector((state) => state.challenge.activeDate);

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
      }
    });
    return;
  }, [activeDate]);

  const editHandler = useCallback(
    (challengeId, date, post: IPost) => {
      dispatch(setShowPostForm(true));
      dispatch(
        setChallengePost({
          isEditMode: true,
          id: post._id,
          docId: challengeId,
          startDate: date,
          title: post.name,
          category: post?.recipeBlendCategory?._id,
          images: post.images,
          ingredients: post.ingredients,
          notes: post.note,
          serving: 0,
        }),
      );
    },
    [dispatch],
  );

  const challengePosts = useMemo(() => {
    const challengPosts = [];
    const challengeImages = [];
    //Handling Each Challenge
    challenges?.forEach((challenge: IChallengePosts) => {
      if (challenge.posts.length === 0) return;
      let images = [];
      const postsEl = [];
      //Handling Each Post
      challenge.posts.forEach((post) => {
        images = [...images, ...post?.images];
        challengeImages.push({ assignDate: challenge?.date, images });
        postsEl.push(
          <Post
            key={post._id}
            id={challenge?._id}
            date={challenge?.date}
            post={post}
            onEdit={editHandler}
          />,
        );
      });
      challengPosts.push(
        <BlendCard
          ref={addToBlendsRef}
          key={challenge?._id}
          date={challenge?.date}
          images={images}
          postsEl={postsEl}
          challengeImages={challengeImages}
        />,
      );
    });
    return challengPosts;
  }, [challenges, editHandler]);

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

interface BlendCardProps {
  date: string;
  images: string[];
  postsEl: React.ReactNode[];
  challengeImages: any[];
}
const BlendCard = forwardRef((props: BlendCardProps, ref: any) => {
  const { date, postsEl, images, challengeImages } = props;

  return (
    <div className={styles.card} data-date={date} ref={ref}>
      <div className={styles.card__headline}>
        <h5>{format(date ? new Date(date) : new Date(), "EEEE, MMMM d")}</h5>
      </div>
      <div className={styles.card__content}>
        {images.length > 0 && (
          <div className={styles.space}>
            <SplitImageCard
              challengeImages={challengeImages}
              images={images}
              date={date ? new Date(date) : new Date()}
            />
          </div>
        )}
        {postsEl}
      </div>
    </div>
  );
});
BlendCard.displayName = "BlendCard";

interface PostProps {
  id: string;
  date: string;
  post: IPost;
  onEdit: any;
}
const Post = (props: PostProps) => {
  const { id, date, post, onEdit } = props;

  let ingredients = "";
  post.ingredients.forEach((ingredient, index) => {
    ingredients +=
      ingredient?.ingredientId?.ingredientName +
      `${index + 1 !== post.ingredients.length ? ", " : ""}`;
  });

  return (
    <div className="mb-10">
      <div className={styles.recipe}>
        <div className={styles.space}>
          <h3
            className={styles.recipe__title}
            onClick={() => onEdit(id, date, post)}
          >
            <Icon
              fontName={faCircle}
              size="2rem"
              style={{
                color: RECIPE_CATEGORY_COLOR[post?.recipeBlendCategory?.name],
              }}
            />
            {post.name}
          </h3>
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
};

export default ChallengePanel;
