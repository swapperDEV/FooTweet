import React from "react";
import postStyles from "../post.module.scss";
import { ImageProps } from "../../../types/post/imagepreview";

export const ImagePreview = ({ image }: ImageProps) => {
  return (
    <>
      <div className={postStyles.image}>
        {image !== "" && (
          <img src={image} className={postStyles.img} alt="image error" />
        )}
      </div>
    </>
  );
};
