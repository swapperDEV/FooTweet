import React, {useContext, useEffect, useState} from 'react'
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import postStyles from './post.module.scss'
import Image from 'next/image';
import testAvatar from '../../../../../assets/meta.png'
import { FirebaseContext } from '../../../../../store/firebase-context';
import { getFirestore, deleteDoc, doc } from 'firebase/firestore';
import Router from 'next/router';
import { FaClock } from "@react-icons/all-files/fa/FaClock";
import { FaComment } from "@react-icons/all-files/fa/FaComment";
import { FaShare } from "@react-icons/all-files/fa/FaShare";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { FaRetweet } from "@react-icons/all-files/fa/FaRetweet";
import { FaEllipsisH } from "@react-icons/all-files/fa/FaEllipsisH";
import { FaTrash} from "@react-icons/all-files/fa/FaTrash";
import { FaTimes} from "@react-icons/all-files/fa/FaTimes";

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
    return (
        <div className={postStyles.post}>
            <div className={postStyles.top}>
                <div className={postStyles.left}>
                    <Image
                        src={testAvatar}
                        alt="photo logo"
                        width="50px"
                        height="50px"
                    />
                </div>
                <div className={postStyles.right}>
                    <div className={postStyles.info}>
                        <div className={postStyles.user}>{`${post.data.creator.name} `}  <p className={postStyles.username}>{`@${post.data.creator.username}`}</p></div>  
                        <p className={postStyles.infoR}>
                        <FaClock/>{time !== "today" ? `${time} days ago` : ' Today'}
                        </p>
                        {fbCtx.currentUser.uid === post.data.creator.uId && <p onClick={() => openSettings()} className={postStyles.settings}><FaEllipsisH/></p>}
                        <div className={widgetClass}>
                            <p onClick={() => deletePost()}><FaTrash/></p>
                            <p onClick={() => closeSettings()}><FaTimes/></p>
                        </div>
                    </div>
                    <div className={postStyles.description}>
                        {post.data.content.description}
                        <div className={postStyles.hashtags}>
                            {post.data.content.hashtag.map((hash:String, index:number) => (
                                <p key={index}>{`#${hash}`}</p>
                            ))}
                        </div>
                    </div>
                    <div className={postStyles.image}>
                        {image !== '' && <img src={image} className={postStyles.img}/>}
                    </div>
                    <div className={postStyles.options}>
                        <div>
                            <FaComment/> 45
                        </div>
                        <div>
                            <FaRetweet/> 17
                        </div>
                        <div>
                            <FaHeart/> 55
                        </div>
                        <div>
                            <FaShare/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Post;
