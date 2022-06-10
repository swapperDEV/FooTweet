import React, {useState} from 'react'
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
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
        // Handle any errors
    });
    return (
        <div>
            <p>POST</p>
            <img src={image} width="64"  height="64"/>
            {post.data.content.description}
            {post.data.creator.email}
            {`@${post.data.creator.username}`}
            {post.data.metaData.createDate}

        </div>
    )
}
export default Post;