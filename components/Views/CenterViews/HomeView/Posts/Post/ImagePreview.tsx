import React from 'react'
import postStyles from '../post.module.scss'
const ImagePreview = (props:any) => {
    const {image} = props
    return (
        <>
        <div className={postStyles.image}>
            {image !== '' && <img src={image} className={postStyles.img}/>}
        </div>
        </>
    )
}
export default ImagePreview;