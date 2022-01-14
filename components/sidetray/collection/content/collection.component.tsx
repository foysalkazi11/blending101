import React, { useState } from "react";
import styles from "./content.module.scss";
import { MdMoreVert, MdDeleteOutline } from "react-icons/md";
import { HiOutlineShare } from "react-icons/hi";
import { BiEditAlt } from "react-icons/bi";
import { setToggleModal } from "../../../../redux/slices/sideTraySlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setLoading } from "../../../../redux/slices/utilitySlice";
import { useMutation } from "@apollo/client";
import DELETE_COLLECTION from "../../../../gqlLib/collection/mutation/deleteCollection";
import { setDbUser } from "../../../../redux/slices/userSlice";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";

type CollectionComponentProps = {
  collections: {}[];
  setInput: any;
  setIsEditCollection: any;
  setCollectionId: any;
};

export default function CollectionComponent({
  collections,
  setInput,
  setIsEditCollection,
  setCollectionId,
}: CollectionComponentProps) {
  const [showMenu, setShowMenu] = useState<null | number>(null);
  const dispatch = useAppDispatch();
  const [deleteCollection] = useMutation(DELETE_COLLECTION);
  const { dbUser } = useAppSelector((state) => state?.user);

  const handleDeleteCollection = async (collectionId: string) => {
    dispatch(setLoading(true));
    try {
      await deleteCollection({
        variables: {
          data: {
            collectionId: collectionId,
            userEmail: dbUser?.email,
          },
        },
      });
      dispatch(
        setDbUser({
          ...dbUser,
          collections: [
            ...dbUser?.collections?.filter((col) => col?._id !== collectionId),
          ],
        })
      );
      dispatch(setLoading(false));
      reactToastifyNotification("info", "Collection delete successfully");
    } catch (error) {
      dispatch(setLoading(false));
      reactToastifyNotification("eror", error?.message);
    }
  };

  return (
    <div className={styles.collection}>
      <div className={styles.collection__add}></div>
      <div className={styles.collection__collections}>
        {collections?.length &&
          collections?.map((item, i) => (
            <div
              className={styles.collection__child}
              key={"collections__child" + i}
              onClick={() => setShowMenu(null)}
            >
              <div className={styles.leftSide}>
                <div className={styles.img}>
                  <div
                    className={styles.abs}
                    style={{
                      backgroundImage: `url(${
                        //@ts-ignore
                        item?.image || "/cards/food.png"
                      })`,
                    }}
                  ></div>
                </div>

                {/* @ts-ignore */}
                <p>{item?.name}</p>
              </div>
              <div className={styles.rightSide}>
                <MdMoreVert
                  className={styles.moreIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(i);
                  }}
                />
                <div
                  className={`${styles.actionMenu} ${
                    showMenu === i ? styles.showMenu : ""
                  }`}
                >
                  <div className={`${styles.menu}`}>
                    <BiEditAlt
                      className={styles.icon}
                      onClick={() => {
                        /* @ts-ignore */
                        setInput((pre) => ({ ...pre, name: item?.name }));
                        setIsEditCollection(true);
                        /* @ts-ignore */
                        setCollectionId(item?._id);
                        dispatch(setToggleModal(true));
                      }}
                    />
                    <MdDeleteOutline
                      className={styles.icon}
                      /* @ts-ignore  */
                      onClick={() => handleDeleteCollection(item?._id)}
                    />
                    <HiOutlineShare className={styles.icon} />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
