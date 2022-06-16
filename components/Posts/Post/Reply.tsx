import { FaHeart } from '@react-icons/all-files/fa/FaHeart'
import React from 'react'
import Avatar from '../../Avatar/Avatar'
import postStyles from '../post.module.scss'
type ReplyProps = {
    reply: {
        creatorName: string,
        comment: string,
    }
}
const Reply = ({reply}: ReplyProps) => {
    return (
        <div className={postStyles.reply}>
            <div className={postStyles.replyLeft}>
                <Avatar/>
            </div>
            <div className={postStyles.replyRight}>
                <p className={postStyles.creatorName}>@{reply.creatorName}</p>
                <p>{reply.comment}</p>
            </div>
        </div>
    )
}
export default Reply;