export type DataOptions = {
  metaData: {
    createDate: number;
    postId: string;
  };
  content: {
    description: string;
    hashtag: Array<string>;
    haveImg: boolean;
  };
  creator: {
    email: string;
    name: string;
    uId: string;
    username: string;
  };
  interaction: {
    comments: Array<{
      likes: Array<string>;
      commentId: string;
      comment: string;
      creatorName: string;
      commentReply: Array<ReplyTypes>;
      creatorId: string;
      createDate: number;
    }>;
    likes: Array<string>;
  };
  retweets: Array<string>;
};
export type PostDataType = {
  data: DataOptions;
};
export type PostProps = {
  data: PostDataType;
  type: string;
  avatar: boolean;
};

type ReplyTypes = {
  creatorName: string;
  comment: string;
  replyId: string;
  createDate: number;
  creatorId: string;
};
