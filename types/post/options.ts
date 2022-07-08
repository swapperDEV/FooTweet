export type OptionProps = {
  openCommentCreate: Function;
  post: {
    data: {
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
        comments: Array<{}>;
        likes: Array<string>;
      };
      retweets: Array<string>;
    };
  };
  fbCtx: {
    currentUser: {
      uid: string;
    };
  };
  commentCreateView: boolean;
  commentActive: string;
  redirectToPost: Function;
  pType: string;
};
