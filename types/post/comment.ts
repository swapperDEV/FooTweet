import { PostDataType } from "./post";

export type CommentProps = {
  comment: {
    likes: Array<string>;
    commentId: string;
    comment: string;
    creatorName: string;
    commentReply: Array<ReplyTypes>;
    creatorId: string;
  };
  post: PostDataType;
  fbCtx: {
    currentUser: {
      uid: string;
    };
  };
  userCtx: {
    data: {
      username: string;
    };
  };
  deleteComment: Function;
};

export type tableParent = {
  commentId: string;
  creatorId: string;
  commentReply: Array<string>;
  replyId: string;
};
export type tableChildren = {
  replyId: string;
};

export type ReplyTypes = {
  creatorName: string;
  comment: string;
  replyId: string;
  creatorId: string;
  createDate: number;
};

export type CommentTableType = {
  commentId: string;
};
