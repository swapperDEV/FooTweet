import React from 'react'
import postStyles from '../post.module.scss'
type ImageProps = {
    image: string,
}
const ImagePreview = ({image}:ImageProps) => {
    return (
        <>
        <div className={postStyles.image}>
            {image !== '' && <img src={image} className={postStyles.img} alt="image error"/>}
        </div>
        </>
    )
}
export default ImagePreview;