import { DataOptions } from "./post";

export type CommentType = {
  commentId: string;
  comment: string;
  likes: Array<string>;
  commentReply: Array<ReplyTypes>;
  creatorId: string;
  creatorName: string;
  createDate: number;
};
export type CommentsProps = {
  type: String;
  post: {
    data: DataOptions;
  };
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
  commentCreateView: boolean;
};
export type ReplyTypes = {
  creatorName: string;
  comment: string;
  replyId: string;
  creatorId: string;
  createDate: number
};
