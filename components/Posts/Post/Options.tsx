import React from 'react'
import { FaComment } from "@react-icons/all-files/fa/FaComment";
import { FaShare } from "@react-icons/all-files/fa/FaShare";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { FaRetweet } from "@react-icons/all-files/fa/FaRetweet";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

type OptionProps = {
    post: {
        data: {
            interaction: {
                comments: Array<String> 
                likes: Array<string>
            }
            metaData: {
                postId: string, 
            }
            creator: {
                uId: string,
            }
        }
    }
    fbCtx: {
        currentUser: {
            uid: string
        }
    }
    heartActive: any, 
    wrapperClass: string, 
}
const Options = ({post, fbCtx, heartActive, wrapperClass}: OptionProps) => {
    const commentNumber = post.data.interaction.comments
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
                console.log('nie zawiera');
                likePost()
            } else {
                console.log('zawiera');
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
    return (
        <>
        <div className={wrapperClass}>
            <div>
                <FaComment/> {commentNumber.length}
            </div>
            <div>
                <FaRetweet/> 0
            </div>
            <div className={likesNumber.includes(fbCtx.currentUser.uid) && heartActive}>
                <FaHeart onClick={() => handleLikePost()}/> {likesNumber.length}
            </div>
            <div>
                <FaShare/>
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