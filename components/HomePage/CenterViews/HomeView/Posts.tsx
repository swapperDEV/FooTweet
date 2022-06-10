import React, { useState } from 'react'
import homeStyles from './home.module.scss'
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const Posts = () => {
    const storage = getStorage();
    return (
        <div className={homeStyles.posts}>
        </div>
    )
}
export default Posts;


    // const [image, setImage] = useState('')
    // getDownloadURL(ref(storage, 'images/npB9Ud48K4gjrssloli9Pm8tikd2.1654855493911.jpg'))
    // .then((url) => {
    //   setImage(url)
    // })
    // .catch((error) => {
    //   // Handle any errors
    // });