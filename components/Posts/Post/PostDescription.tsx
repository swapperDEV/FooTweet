import React from 'react'
import postStyles from '../post.module.scss'
import { FaClock } from "@react-icons/all-files/fa/FaClock";
import { FaEllipsisH } from "@react-icons/all-files/fa/FaEllipsisH";
import { FaTrash} from "@react-icons/all-files/fa/FaTrash";
import { FaTimes} from "@react-icons/all-files/fa/FaTimes";
import { DescriptionProps } from '../../../types/post/postdescription';

const PostDescription = ({post, deletePost, closeSettings, time, fbCtx, widgetClass, openSettings}: DescriptionProps) => {
    return (
        <>
            <div className={postStyles.info}>
                <div className={postStyles.user}>{`${post.data.creator.name} `}  <p className={postStyles.username}>{`@${post.data.creator.username}`}</p></div>  
                <p className={postStyles.infoR}>
                <FaClock/>{time}
                </p>
                {fbCtx.currentUser.uid === post.data.creator.uId && <p onClick={() => openSettings()} className={postStyles.settings}><FaEllipsisH/></p>}
                <div className={widgetClass}>
                    <p onClick={() => deletePost()}><FaTrash/></p>
                    <p onClick={() => closeSettings()}><FaTimes/></p>
                </div>
            </div>
        </>
    )
}
export default PostDescription;