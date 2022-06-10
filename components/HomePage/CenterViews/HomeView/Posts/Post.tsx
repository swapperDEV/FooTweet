import React, {useEffect, useState} from 'react'
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import postStyles from './post.module.scss'
import Image from 'next/image';
import testAvatar from '../../../../../assets/meta.png'

const Post = (props:any) => {
    const post = props.data
    let [time, changeTime]:any = useState(0)
    const storage = getStorage();
    const [image, setImage] = useState('')
    const link = `images/${post.data.metaData.postId}.jpg`
    getDownloadURL(ref(storage, link))
    .then((url) => {
        setImage(url)
    })
    .catch((error) => {
        console.log(error);
    });
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