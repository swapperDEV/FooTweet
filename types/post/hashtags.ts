export type HashtagsProps = {
  post: {
    data: {
      content: {
        description: string;
        hashtag: Array<string>;
      };
    };
  };
};
