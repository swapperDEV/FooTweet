import React, { useRef, useState } from 'react'
import postStyles from '../post.module.scss'
import Avatar from '../../Avatar/Avatar';
import { FaHeart } from '@react-icons/all-files/fa/FaHeart';
import { FaComment } from '@react-icons/all-files/fa/FaComment';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';
import { getFirestore, doc, updateDoc} from 'firebase/firestore';
import { getDate } from '../../../functions/getDate';
import Reply from './Reply';
import { Id, toast } from 'react-toastify';
import { sendNotify } from '../../../functions/sendNotify';

type CommentProps = {
    comment: {
        likes: Array<string>
        commentId: string,
        comment: String,
        creatorName: string,
        commentReply: Array<Object>
        creatorId: string,
    }
    post: {
        data: {
            interaction: {
                likes: Array<string>
                comments: Array<any>
            }
            metaData: {
                postId: string
            }
        }
    }
    fbCtx: {
        currentUser: {
            uid: string,
        }
    }
    userCtx: {
        data: {
            username: String
        }
    },
    deleteComment: Function
}
const Comment = ({comment, post, fbCtx, userCtx, deleteComment}:CommentProps) => {
    const replyRef:any = useRef()
    const [showReply, changeReplyShow] = useState(false)
    let [likesNumber, setLikesNumber]:any = useState(comment.likes)
    const pushReply = () => {
        const reply = replyRef.current.value
        if(reply.length > 0) {
            const db = getFirestore()
            const dbRef = doc(db, "posts", post.data.metaData.postId)
            const table = post.data.interaction.comments
            table.forEach((tb:any, index: any) => {
                if(tb.commentId === comment.commentId) {
                    table[index].commentReply.push ({
                        comment: replyRef.current.value, 
                        creatorId: fbCtx.currentUser.uid,
                        creatorName: userCtx.data.username,
                        createDate: getDate(),
                        replyId: fbCtx.currentUser.uid + getDate()
                    })
                }
            })

            updateDoc(dbRef, {
                interaction: {
                    comments: table,
                    likes: post.data.interaction.likes
                }
            })
            sendNotify(comment.creatorId, userCtx.data.username, `${userCtx.data.username} reply you`, 'reply')
        } else {
            toast.error('Your reply is too short!', {
                theme: 'dark',
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            }
    }
    const handleShowReply = () => {
        changeReplyShow(!showReply)
    }
    const updateLikeDB = (likeTable:Array<any>) => {
        const db = getFirestore()
        const dbRef = doc(db, "posts", post.data.metaData.postId)
        const table = post.data.interaction.comments
        table.forEach((tb:any, index: any) => {
            if(tb.commentId === comment.commentId) {
                table[index].likes = likesNumber
            }
        })
        updateDoc(dbRef, {
            interaction: {
                comments: table,
                likes: post.data.interaction.likes,
            }
        })
    }
    const likeComment = (index:any) => {
        let table = likesNumber
        table.push(fbCtx.currentUser.uid)
        updateLikeDB(table)
    }
    const dislikeComment = (index:any) => {
        let indexX = likesNumber.indexOf(fbCtx.currentUser.uid)
        let table = likesNumber
        table.splice(indexX, 1)
        updateLikeDB(table)
    }
    const handleLikeComment = () => {
        const table = post.data.interaction.comments
        table.forEach((tb:any, index: any) => {
            if(tb.commentId === comment.commentId) {
                if(tb.creatorId !== fbCtx.currentUser.uid) {
                    if(!likesNumber.includes(fbCtx.currentUser.uid)) {
                        likeComment(index)
                    } else {
                        dislikeComment(index)
                    }
                } else {
                toast.error('You cant like your reply!', {
                    theme: 'dark',
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                }
            }
        })
    }
    const deleteReply = (replyId:string) => {
        const table = post.data.interaction.comments
        let postIndexV:any
        let replyIndexV
        table.forEach((tb:any, postIndex: any) => {
            tb.commentReply.forEach((rb:any, replyIndex:any) => {
                if(rb.replyId === replyId) {
                    postIndexV = postIndex
                    replyIndexV = replyIndex
                }
            })
        })
        table[postIndexV].commentReply.splice(replyIndexV, 1)
        const db = getFirestore()
        const dbRef = doc(db, "posts", post.data.metaData.postId)
        updateDoc(dbRef, {
            interaction: {
                comments: table,
                likes: post.data.interaction.likes
            }
        })
    }
    return (
        <>
         <div className={postStyles.comment}>
            <div className={postStyles.topComment}>
                <div className={postStyles.commentLeft}>
                    <Avatar userID={comment.creatorId}/>
                </div>
                <div className={postStyles.commentRight}>
                    <div className={postStyles.line}></div>
                    <p className={postStyles.creator}>@{comment.creatorName}</p>
                    <p className={postStyles.commentDescription}>{comment.comment}</p>
                    <div className={postStyles.options}>
                        <FaHeart className={likesNumber.includes(fbCtx.currentUser.uid) && postStyles.heartActive} onClick={() => handleLikeComment()}/>{comment.likes.length} 
                        <FaComment className={showReply ? postStyles.replySettings : postStyles.replySettingsOff} onClick={() => handleShowReply()}/> {comment.commentReply.length}
                        {comment.creatorId === fbCtx.currentUser.uid && <FaTrash className={postStyles.trash} onClick={() => deleteComment(comment.commentId)}/>}
                    </div>
                </div>
            </div>
            <div className={postStyles.bottomComment}>
            {showReply &&  
            <div className={postStyles.replyCreate}>
                <div>
                    <input placeholder="reply a comment" ref={replyRef}/><button onClick={() => pushReply()}>Push</button>
                </div>
            </div>
            }
            {showReply && comment.commentReply.map((reply:any) => {
                return <Reply key={Math.random() * (1000000 - 1 + 1) + 1} reply={reply} deleteReply={deleteReply}/>
            })}
            </div>
        </div>
        </>
    )
}

export default Comment;