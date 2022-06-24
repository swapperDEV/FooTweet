import React from 'react'
import postStyles from '../post.module.scss'
import {HashtagsProps} from '../../../types/post/hashtags'

const Hashtags = ({post}: HashtagsProps) => {
    return (
        <>
        <div className={postStyles.description}>
            {post.data.content.description}
            <div className={postStyles.hashtags}>
                {post.data.content.hashtag.map((hash:String, index:number) => (
                    <p key={index}>{`#${hash}`}</p>
                ))}
            </div>
        </div>
        </>
    )
}
export default Hashtags;