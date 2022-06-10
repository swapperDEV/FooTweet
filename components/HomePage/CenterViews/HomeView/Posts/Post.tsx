import React, {useContext, useEffect, useState} from 'react'
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import postStyles from './post.module.scss'
import Image from 'next/image';
import testAvatar from '../../../../../assets/meta.png'
import { FirebaseContext } from '../../../../../store/firebase-context';
import { getFirestore, deleteDoc, doc } from 'firebase/firestore';
import Router from 'next/router';

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
        console.log('1', actDate, '2', agoDate);
        let diff = new Date(actDate - agoDate)
        console.log(diff);
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
    return (
        <div className={postStyles.post}>
            <div className={postStyles.top}>
                <div className={postStyles.left}>
                    <Image
                        src={testAvatar}
                        alt="photo logo"
                        width="60px"
                        height="60px"
                    />
                </div>
                <div className={postStyles.right}>
                    <div className={postStyles.info}>
                        <p>{`@${post.data.creator.username}`}</p>  
                        <p className={postStyles.infoR}>
                        {time !== "today" ? `${time} days ago` : ' Today'}
                        </p>
                        {fbCtx.currentUser.uid === post.data.creator.uId && <p onClick={() => openSettings()} className={postStyles.settings}>*</p>}
                        <div className={widgetClass}>
                            <p onClick={() => deletePost()}>delete</p>
                            <p onClick={() => closeSettings()}>close</p>
                        </div>
                    </div>
                    <div className={postStyles.description}>
                        {post.data.content.description}
                    </div>
                </div>
            </div>
            {image !== '' && <img src={image} className={postStyles.img}/>}
        </div>
    )
}
export default Post;