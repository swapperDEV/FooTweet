import React, {useState} from 'react'
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import postStyles from './post.module.scss'

const Post = (props:any) => {
    const post = props.data
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
    return (
        <div className={postStyles.post}>
            <div>
                {post.data.content.description}
                {post.data.creator.email}
                {`@${post.data.creator.username}`}
                {post.data.metaData.createDate}
            </div>
            {image !== '' && <img src={image} className={postStyles.img}/>}
        </div>
    )
}
export default Post;