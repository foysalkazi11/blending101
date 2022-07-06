import React, { Dispatch, SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setChangeRecipeWithinCollection,
  setSingleRecipeWithinCollecions,
} from "../../redux/slices/collectionSlice";
import { setOpenCollectionsTary } from "../../redux/slices/sideTraySlice";
import CustomModal from "../../theme/modal/customModal/CustomModal";
import SaveRecipe from "../../theme/saveRecipeModal/SaveRecipeModal";

interface Props {
  overlayStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  shouldCloseOnOverlayClick?: boolean;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const ShowCollectionModal = ({
  open,
  setOpen,
  contentStyle,
  overlayStyle,
  shouldCloseOnOverlayClick,
}: Props) => {
  const { lastModifiedCollection } = useAppSelector(
    (state) => state?.collections,
  );
  const dispatch = useAppDispatch();
  const handleCompareRecipe = () => {
    dispatch(setSingleRecipeWithinCollecions([lastModifiedCollection?.id]));
    dispatch(setOpenCollectionsTary(true));
    dispatch(setChangeRecipeWithinCollection(true));
    setOpen(false);
  };
  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      contentStyle={contentStyle}
      overlayStyle={overlayStyle}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      <SaveRecipe
        title={lastModifiedCollection?.name}
        handleChange={handleCompareRecipe}
      />
    </CustomModal>
  );
};

export default ShowCollectionModal;
