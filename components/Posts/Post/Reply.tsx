import React, { useContext } from "react";
import { Avatar } from "../../Avatar/Avatar";
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import postStyles from "../post.module.scss";
import { FirebaseContext } from "../../../store/firebase-context";
import { ReplyProps } from "../../../types/post/reply";

export const Reply = ({ reply, deleteReply }: ReplyProps) => {
  const fbCtx = useContext(FirebaseContext);
  return (
    <div className={postStyles.reply}>
      <div className={postStyles.replyLeft}>
        <Avatar userID={reply.creatorId} />
      </div>
      <div className={postStyles.replyRight}>
        <p className={postStyles.creatorName}>@{reply.creatorName}</p>
        <p>{reply.comment}</p>
        {reply.creatorId === fbCtx.currentUser.uid && (
          <FaTrash
            className={postStyles.replyTrash}
            onClick={() => deleteReply(reply.replyId)}
          />
        )}
      </div>
    </div>
  );
};
