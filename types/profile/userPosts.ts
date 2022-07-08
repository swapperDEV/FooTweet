export type UserPostProps = {
  userData: {
    username: string;
    name: string;
  };
  id: string;
};
export type PostList = Array<PostTypes>;
export type PostTypes = {
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
    comments: Array<string>;
    likes: Array<string>;
  };
  retweets: Array<string>;
};
