import React from 'react'
import postStyles from '../post.module.scss'
import Comment from './Comment'
import { getFirestore, doc, updateDoc} from 'firebase/firestore';
import { getDate } from '../../../functions/getDate';
import { useRef } from 'react';
type CommentsProps = {
    type: String, 
    post: {
        data: {
            interaction: {
                comments: Array<any>,
                likes: Array<string>
            }
            metaData: {
                postId: string,
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
            username: string,
        }
    }
}
const Comments = ({type, post, fbCtx, userCtx}:CommentsProps) => {
    const commentRef:any = useRef()
    const pushComment = () => {
        if(commentRef.current.value.length > 3) {
            const db = getFirestore()
            const dbRef = doc(db, "posts", post.data.metaData.postId)
            const table = post.data.interaction.comments
            table.push({
                comment: commentRef.current.value, 
                commentId: fbCtx.currentUser.uid + getDate(),
                likes: [],
                commentReply: [],
                creatorId: fbCtx.currentUser.uid,
                creatorName: userCtx.data.username,
                createDate: getDate()
            })
            console.log(fbCtx.currentUser.uid);
            updateDoc(dbRef, {
                interaction: {
                    comments: table,
                    likes: post.data.interaction.likes
                }
            })
            commentRef.current.value = ''
        } else {
            console.log('error');
        }
    }
    return (
        <>
        {type === 'long' &&
            <>
            <div className={postStyles.commentCreate}>
                <div>
                    <input placeholder="comment post" ref={commentRef}/><button onClick={() => pushComment()}>Push</button>
                </div>
            </div>
            <div className={postStyles.comments}>
                {post.data.interaction.comments.map((comment:any) => {
                    return (
                    <Comment key={Math.random() * (1000000 - 1 + 1) + 1} comment={comment} post={post} userCtx={userCtx} fbCtx={fbCtx}/>
                    )
                })}
            </div>
            </>
        }
        </>
    )
}
export default Comments;