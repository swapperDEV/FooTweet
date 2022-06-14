import React, {useContext, useEffect, useState} from 'react'
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import postStyles from './post.module.scss'
import { FirebaseContext } from '../../../../../store/firebase-context';
import { getFirestore, deleteDoc, doc } from 'firebase/firestore';
import Router from 'next/router';
import Options from './Post/Options';
import Avatar from '../../../../Avatar/Avatar';
import Hashtags from './Post/Hashtags'
import ImagePreview from './Post/ImagePreview';
import PostDescription from './Post/PostDescription';

const Post = (props:any) => {
    const fbCtx = useContext(FirebaseContext)
    const post = props.data
    const [widgetClass, changeWidgetClass] = useState(postStyles.settingsWidget)
    let [time, changeTime]:any = useState(0)
    const storage = getStorage();
    const [image, setImage] = useState('')
    const link = `images/${post.data.metaData.postId}.jpg`
    if(post.data.content.haveImg !== false) { 
        getDownloadURL(ref(storage, link))
        .then((url) => {
            setImage(url)
        })
        .catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        let actDate:any = new Date()
        actDate = actDate.getTime()
        let agoDate = post.data.metaData.createDate
        let diff = new Date(actDate - agoDate)
        changeTime(diff.getUTCDate() - 2)
        if(diff.getUTCDate() - 2 === 0) {
            changeTime('today')
        }
    },[])
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
        Router.push(`/post/${post.data.metaData.postId}`)
    }
    return (
        <div className={postStyles.post} onClick={() => redirectToPost()}>
            <div className={postStyles.top}>
                <div className={postStyles.left}>
                    <Avatar/>
                </div>
                <div className={postStyles.right}>
                    <PostDescription post={post} openSettings={() => openSettings()} deletePost={() => deletePost()} closeSettings={() => closeSettings()} widgetClass={widgetClass} time={time} fbCtx={fbCtx}/>
                    <Hashtags post={post}/>
                    <ImagePreview image={image}/>
                    <Options heartActive={postStyles.heartActive} wrapperClass={postStyles.options} post={post} fbCtx={fbCtx}/>
                </div>
            </div>
        </div>
    )
}
export default Post;
