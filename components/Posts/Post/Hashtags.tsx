import React from "react";
import postStyles from "../post.module.scss";
import { HashtagsProps } from "../../../types/post/hashtags";

export const Hashtags = ({ post }: HashtagsProps) => {
  return (
    <>
      <div className={postStyles.description}>
        {post.data.content.description}
        <div className={postStyles.hashtags}>
          {post.data.content.hashtag.map((hash: string, index: number) => (
            <p key={index}>{`#${hash}`}</p>
          ))}
        </div>
      </div>
    </>
  );
};
