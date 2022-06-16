/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useRef, useState} from 'react'
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import postStyles from './post.module.scss'
import { FirebaseContext } from '../../store/firebase-context';
import { getFirestore, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import Router from 'next/router';
import Options from './Post/Options';
import Avatar from '../Avatar/Avatar';
import Hashtags from './Post/Hashtags'
import ImagePreview from './Post/ImagePreview';
import PostDescription from './Post/PostDescription';
import Comments from './Post/Comments';
import { useRouter } from 'next/router';
import { UserDataContext } from '../../store/userData-context';
import { getTime } from '../../functions/getTime'

type DataType = {
 data: {
        metaData: {
            createDate: number,
            postId: string,
        }
        content: {
            description: String,
            hashtag: Array<String>,
            haveImg: boolean,
        }
        creator: {
            email: string,
            name: string,
            uId: string,
            username: string,
        }
        interaction: {
            comments: Array<any>
            likes: Array<string>
        }
    },
}
type PostProps = {
    data: DataType,
    type: String,
}

const Post = ({data, type}: PostProps) => {
    const [widgetClass, changeWidgetClass] = useState(postStyles.settingsWidget)
    let [time, changeTime] = useState(0)
    const [pType, changeType] = useState(type)
    const [image, setImage] = useState('')
    const fbCtx = useContext(FirebaseContext)
    const userCtx = useContext(UserDataContext)
    const path = useRouter()
    const storage = getStorage();
    const post = data 
    const link = `images/${post.data.metaData.postId}.jpg`

    if(post.data.content.haveImg !== false) { 
        getDownloadURL(ref(storage, link))
        .then((url) => {
            setImage(url)
        })
    }
    const openSettings = () => {
        changeWidgetClass(postStyles.settingsWidgetOpen)
    }
    const closeSettings = () => {
        changeWidgetClass(postStyles.settingsWidget)
    }
    const deletePost = () => {
        const db = getFirestore()
        setImage('')
        deleteDoc(doc(db, "posts", post.data.metaData.postId));
        closeSettings()
        Router.push('/')
    }
    const redirectToPost = () => {
        if(path.pathname !== "/post/[postId]") {
            Router.push(`/post/${post.data.metaData.postId}`)
        }
    }
    useEffect(() => {
        changeTime(getTime(post.data.metaData.createDate))        
    },[])
    return (
        <div className={postStyles.post}>
            <div className={postStyles.top}>
                <div className={postStyles.left}>
                    <Avatar/>
                </div>
                <div className={postStyles.right} onClick={() => redirectToPost()}>
                    <PostDescription post={post} openSettings={() => openSettings()} deletePost={() => deletePost()} closeSettings={() => closeSettings()} widgetClass={widgetClass} time={time === 0 ? 'Today' : `${time} d. ago`} fbCtx={fbCtx}/>
                    <Hashtags post={post}/>
                    <ImagePreview image={image}/>
                    <Options heartActive={postStyles.heartActive} wrapperClass={postStyles.options} post={post} fbCtx={fbCtx}/>
                </div>
            </div>
            {pType === 'long' && <div className={postStyles.bottom}>
                <Comments type={pType} post={post} fbCtx={fbCtx} userCtx={userCtx}/>
            </div>}
        </div>
    )
}
export default Post;
