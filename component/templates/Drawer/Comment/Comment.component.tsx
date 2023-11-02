import React, { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { faMessageDots } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../../../redux/hooks";
import { format } from "date-fns";
import { FiEdit2 } from "react-icons/fi";
import { MdPersonOutline, MdDeleteOutline } from "react-icons/md";

import Drawer from "../Drawer.component";
import Publish from "../../../../helpers/Publish";
import StarRating from "../../../../theme/starRating/StarRating";
import TextArea from "../../../../theme/textArea/TextArea";
import TrayTag from "../../../../components/sidetray/TrayTag";

import { ADD_PLAN_COMMENT, EDIT_PLAN_COMMENT, REMOVE_PLAN_COMMENT } from "../../../../modules/plan/plan.graphql";

import styles from "./Comment.module.scss";
import { useUser } from "../../../../context/AuthProvider";

interface CommentsTrayProps {
  id: string;
  show: boolean;
  title?: string;
  cover?: string;
  comments?: any[];
  icon?: string;
  onClose?: () => void;
}

function CommentDrawer(props: CommentsTrayProps) {
  const { show, id, title, cover, icon, onClose, comments } = props;

  const ref = useRef<any>();
  const [toggle, setToggle] = useState(1);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [updateComment, setUpdateComment] = useState(false);
  const [updateCommentId, setUpdateCommentId] = useState("");

  const user = useUser();
  const userId = user.id;

  const [addComment, addState] = useMutation(ADD_PLAN_COMMENT, {
    refetchQueries: ["GetPlanComments"],
  });
  const [editComment, editState] = useMutation(EDIT_PLAN_COMMENT, {
    refetchQueries: ["GetPlanComments"],
  });
  const [deleteComment, deleteState] = useMutation(REMOVE_PLAN_COMMENT, {
    refetchQueries: ["GetPlanComments"],
  });

  const handleToggle = (no: number) => {
    if (no === 1) {
      ref.current.style.left = "0";
    } else {
      ref.current.style.left = "50%";
    }
    setToggle(no);
  };

  const modifyComment = async () => {
    if (updateComment) {
      await Publish({
        mutate: editComment,
        state: editState,
        variables: {
          memberId: userId,
          commentId: updateCommentId,
          comment,
        },
        success: "Edited Comment",
        onSuccess: () => {
          setComment("");
          setShowCommentBox(false);
        },
      });
    } else {
      await Publish({
        mutate: addComment,
        state: addState,
        variables: {
          planId: id,
          memberId: userId,
          comment,
        },
        success: "Added Comment",
        onSuccess: () => {
          setComment("");
          setShowCommentBox(false);
        },
      });
    }
  };

  const removeComment = async (id: string) => {
    await Publish({
      mutate: deleteComment,
      state: deleteState,
      variables: {
        memberId: userId,
        commentId: id,
      },
      success: "Removed Comment",
      onSuccess: () => {
        setComment("");
        setShowCommentBox(false);
      },
    });
  };

  const updateComments = (id: string, comment: string, rating: number) => {
    setUpdateComment(true);
    setShowCommentBox(true);
    setUpdateCommentId(id);
    setComment(comment);
    setRating(rating);
  };

  const toggleCommentBox = () => {
    setShowCommentBox((pre) => !pre);
  };

  return <div></div>;
}

export default CommentDrawer;
