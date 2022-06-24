import React from 'react'
import postStyles from '../post.module.scss'
import Comment from './Comment'
import { getFirestore, doc, updateDoc} from 'firebase/firestore';
import { getDate } from '../../../functions/getDate';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { sendNotify } from '../../../functions/sendNotify';
import { CommentsProps } from '../../../types/post/comments';

const Comments = ({type, post, fbCtx, userCtx, commentCreateView}:CommentsProps) => {
    const commentRef = useRef<HTMLInputElement>(null)
    const pushComment = () => {
        if(commentRef.current!.value.length > 3) {
            const db = getFirestore()
            const dbRef = doc(db, "posts", post.data.metaData.postId)
            const table = post.data.interaction.comments
            table.push({
                comment: commentRef.current!.value, 
                commentId: fbCtx.currentUser.uid + getDate(),
                likes: [],
                commentReply: [],
                creatorId: fbCtx.currentUser.uid,
                creatorName: userCtx.data.username,
                createDate: getDate()
            })
            updateDoc(dbRef, {
                interaction: {
                    comments: table,
                    likes: post.data.interaction.likes
                }
            })
            sendNotify(post.data.creator.uId, userCtx.data.username, `${userCtx.data.username} comment your post`, 'comment')
            commentRef.current!.value = ''
        } else {
            toast.error('Your comment is too short!', {
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
    const deleteComment = (id:String) => {
        const table = post.data.interaction.comments
        table.map((comment, index) => {
            if(comment.commentId === id) {
                table.splice(index, 1)
            }
        })
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
        {type === 'long' &&
            <>
            { commentCreateView && 
            <div className={postStyles.commentCreate}>
                <div>
                    <input placeholder="comment post" ref={commentRef}/><button onClick={() => pushComment()}>Push</button>
                </div>
            </div>
            }
            <div className={postStyles.comments}>
                {post.data.interaction.comments.map((comment:any) => {
                    return (
                    <Comment key={Math.random() * (1000000 - 1 + 1) + 1} comment={comment} post={post} userCtx={userCtx} fbCtx={fbCtx}  deleteComment={deleteComment}/>
                    )
                })}
            </div>
            </>
        }
        </>
    )
}
export default Comments;