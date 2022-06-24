import React, { useContext, useState } from 'react'
import { FaComment } from "@react-icons/all-files/fa/FaComment";
import { FaShare } from "@react-icons/all-files/fa/FaShare";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { FaRetweet } from "@react-icons/all-files/fa/FaRetweet";
import { FaOpenid } from "@react-icons/all-files/fa/FaOpenid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFirestore, doc, updateDoc, setDoc } from 'firebase/firestore';
import { UserDataContext } from '../../../store/userData-context';
import { sendNotify } from '../../../functions/sendNotify';
import { OptionProps } from '../../../types/post/options';

const Options = ({post, retweetActive, fbCtx, heartActive, wrapperClass, openCommentCreate, commentCreateView, commentActive, pType, redirectToPost}: OptionProps) => {
    const commentNumber = post.data.interaction.comments
    const [isUserRetweet, updateIsUserRetweet] = useState(post.data.retweets.includes(fbCtx.currentUser.uid))
    const UserCtx = useContext(UserDataContext)
    let likesNumber:Array<string> = post.data.interaction.likes
    const updateDB = (table:Array<any>) => {
        const db = getFirestore()
        const dbRef = doc(db, "posts", post.data.metaData.postId)
        updateDoc(dbRef, {
            interaction: {
                comments: commentNumber,
                likes: likesNumber
            }
        })
    }
    const likePost = () => {
        likesNumber.push(fbCtx.currentUser.uid)
        let table = likesNumber
        updateDB(table)
        sendNotify(post.data.creator.uId , UserCtx.data.username, `${UserCtx.data.username} like your post.`, 'like')
    }
    const dislikePost = () => {
        let index = likesNumber.indexOf(fbCtx.currentUser.uid)
        likesNumber.splice(index, 1)
        let table = likesNumber
        updateDB(table)
    }
    const handleLikePost = () => {
        if(post.data.creator.uId !== fbCtx.currentUser.uid) {
            if(!likesNumber.includes(fbCtx.currentUser.uid)) {
                likePost()
            } else {
                dislikePost()
            }
        } else {
        toast.error('You cant like your post!', {
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
    const sharePost = () => {
        navigator.clipboard.writeText(window.location.origin + `/post/${post.data.metaData.postId}`)
        toast('Link was copied to your clipboard!', {
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
    if(pType !== 'long') {
        commentActive = ''
    }
    const postRetweet = (id:String) => {
        const db = getFirestore()
        const uid = fbCtx.currentUser.uid
        const postRetweets = post.data.retweets 
        const retweetsTable = UserCtx.data.retweets
        if(isUserRetweet) {
            let indexP = retweetsTable.indexOf(id)
            retweetsTable.splice(indexP, 1)
            updateDoc(doc(db, "users", uid), {
                retweets: retweetsTable
            })
            let indexU = postRetweets.indexOf(uid)
            postRetweets.splice(indexU, 1)
            updateDoc(doc(db, "posts", post.data.metaData.postId), {
                retweets: postRetweets,
            })
            updateIsUserRetweet(false)
        } else {
            retweetsTable.push(id)
            updateDoc(doc(db, "users", uid), {
                retweets: retweetsTable
            })
            postRetweets.push(uid)
            updateDoc(doc(db, "posts", post.data.metaData.postId), {
                retweets: postRetweets,
            })
            updateIsUserRetweet(true)
            toast('You retweeted post!', {
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
    return (
        <>
        <div className={wrapperClass}>
            <div>
                <FaComment onClick={() => openCommentCreate()} className={commentCreateView && commentActive}/> {commentNumber.length}
            </div>
            <div className={likesNumber.includes(fbCtx.currentUser.uid) && heartActive}>
                <FaHeart onClick={() => handleLikePost()}/> {likesNumber.length}
            </div>
            <div>
                <FaOpenid onClick={() => redirectToPost()}/>
            </div>
            <div>
                <FaRetweet onClick={() => postRetweet(post.data.metaData.postId)} className={isUserRetweet && retweetActive}/>
            </div>
            <div>
                <FaShare onClick={sharePost}/>
            </div>
        </div>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        </>
    )
}
export default Options;