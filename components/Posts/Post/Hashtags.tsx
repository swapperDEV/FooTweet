import React from 'react'
import postStyles from '../post.module.scss'
type HashtagsProps = {
    post: {
        data: {
            content: {
                description: String,
                hashtag: Array<String>
            }
        }
    }
}
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