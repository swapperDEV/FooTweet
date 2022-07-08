export type PostTypes = {
  data: {
    content?: {
      hashtag: Array<string>;
    };
  };
  id: string;
};

export type HashtagOptions = {
  name?: string;
  count?: number;
};
