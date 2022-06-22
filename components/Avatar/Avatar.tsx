import React, {useEffect, useState} from 'react'
import testAvatar from '../../assets/meta.png'
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import avatarStyles from './avatar.module.scss'
import Router from 'next/router'
import errorAvatar from '../../assets/meta.png'
type avatarProps = {
    userID: string
}
const Avatar = ({userID}:avatarProps) => {
    const storage = getStorage()
    const db = getFirestore()
    const [image, setImage] = useState('')
    const getAvatar = async () => {
        let data;
        const userRef = doc(db, "users", userID);
        const userSnap = await getDoc(userRef)
        if(userSnap.exists()) {
            data = userSnap.data()
            getDownloadURL(ref(storage, `avatars/${data.avatarID}.jpg`))
            .then((url) => {
                setImage(url)
            })
        }
    }
    const redirectToProfile = () => {
        Router.push(`/profile/${userID}`)
    }
    useEffect(() => {
        getAvatar()
    },[userID])
    return (
        <>
        <img
            src={image}
            alt=""
            width="50px"
            height="50px"
            className={avatarStyles.img}
            onClick={() => redirectToProfile()}
        />
        </>
    )
}
export default Avatar;