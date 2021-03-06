export type PostsProps = {
  requirements?: string;
  requirementsType?: string;
};

export type PostData = {
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
    comments: Array<any>;
    likes: Array<string>;
  };
  retweets: Array<string>;
};
export type PostListType = {
  data: PostData;
  id: string;
};

export type PostType = {
  data: PostData;
};
