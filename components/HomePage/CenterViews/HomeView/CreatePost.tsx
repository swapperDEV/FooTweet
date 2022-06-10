import React, {useContext, useRef, useState} from 'react'
import { FirebaseContext } from '../../../../store/firebase-context'
import homeStyles from './home.module.scss'
import Image from 'next/image'
import testAvatar from '../../../../assets/meta.png'
import {getStorage,ref,uploadBytes} from 'firebase/storage'
import { setDoc, doc, getFirestore } from 'firebase/firestore'
import { generateCode } from '../../../../functions/generateCode'
import { UserDataContext } from '../../../../store/userData-context'
import { getDate } from '../../../../functions/getDate'

const CreatePost = () => {
    const fbCtx = useContext(FirebaseContext)
    const userCtx = useContext(UserDataContext)
    const postContentRef:any= useRef('')
    const storage = getStorage(fbCtx.app, "gs://ktweetapp.appspot.com")
    const [pImg, changePostImg]:any = useState()
    const [pImgPhoto, changePostImgPhoto]:any = useState()
    const [imgToUpload, changeImgToUpload]:any = useState()

    const createPost = async () => {
        const db = getFirestore()
        const postId = `${fbCtx.currentUser.uid}.${generateCode()}`
        console.log('PostID', postId);
        const dataToUpload = {
            creator: {
                uId: fbCtx.currentUser.uid,
                email: userCtx.data.email,
                username: userCtx.data.username
            },
            metaData: {
                createDate: getDate(),
                postId: postId,
            },
            content: {
                description: postContentRef.current.value,
                hashtag: ['poland', 'euro']
            }
        }
        await setDoc(doc(db, "posts", postId), dataToUpload);
        uploadFile(postId)
    }

    const uploadFile = (postId:string) => {
        console.log(fbCtx.currentUser.uid);
        const postImageRef = ref(storage, `images/${postId}.jpg`);
        uploadBytes(postImageRef, imgToUpload).then((snapshot) => {
            alert('dodano zdj')
            console.log(snapshot);
        });
    }
    const changeImg = (e: any) => {
        changePostImg(e.target.value)
        const file = e.target.files[0]
        changeImgToUpload(file)
        if(file) {
            changePostImgPhoto(URL.createObjectURL(file))
        }
    }
    return (
        <>
        <div className={homeStyles.createPost}>
            <div className={homeStyles.createPostLeft}>
                <Image
                    src={testAvatar}
                    alt="photo logo"
                    width="80px"
                    height="80px"
                />
            </div>
            <div className={homeStyles.createPostRight}>
                <input ref={postContentRef}/>
                <p>Public</p>
                <input type="file" value={pImg} onChange={e => changeImg(e)}/>
                <img src={pImgPhoto} width="64" height={64}/>
                <button onClick={() => createPost()}>Tweet it!</button>
            </div>
        </div>
        </>
    )
}

export default CreatePost;