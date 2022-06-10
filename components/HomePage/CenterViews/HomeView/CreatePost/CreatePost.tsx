import React, {useContext, useRef, useState} from 'react'
import { FirebaseContext } from '../../../../../store/firebase-context'
import createPostStyles from './createpost.module.scss'
import Image from 'next/image'
import testAvatar from '../../../../../assets/meta.png'
import {getStorage,ref,uploadBytes} from 'firebase/storage'
import { setDoc, doc, getFirestore } from 'firebase/firestore'
import { generateCode } from '../../../../../functions/generateCode'
import { UserDataContext } from '../../../../../store/userData-context'
import { getDate } from '../../../../../functions/getDate'
import { FaGlobeEurope as FaGlobe } from "@react-icons/all-files/fa/FaGlobeEurope";
import { FaImage } from "@react-icons/all-files/fa/FaImage";
import { FaWindowClose } from "@react-icons/all-files/fa/FaWindowClose";

const CreatePost = () => {
    const fbCtx = useContext(FirebaseContext)
    const userCtx = useContext(UserDataContext)
    const postContentRef:any= useRef('')
    const storage = getStorage(fbCtx.app, "gs://ktweetapp.appspot.com")
    const [pImg, changePostImg]:any = useState('')
    const [pImgPhoto, changePostImgPhoto]:any = useState('')
    const [imgToUpload, changeImgToUpload]:any = useState('')

    const createPost = async () => {
        const db = getFirestore()
        const postId = `${fbCtx.currentUser.uid}.${generateCode()}`
        console.log('PostID', postId);
        let haveImg = false;
        if(pImg !== '') {
            haveImg = true;
        }
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
                hashtag: ['poland', 'euro'],
                haveImg: haveImg
            }
        }
        await setDoc(doc(db, "posts", postId), dataToUpload);
        if(pImg !== '') {
            uploadFile(postId)
        }
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
    const delImage = () => {
        changePostImg('')
        changeImgToUpload('')
        changePostImgPhoto('')
    }
    return (
        <>
        <div className={createPostStyles.createPost}>
            <div className={createPostStyles.createPostLeft}>
                <Image
                    src={testAvatar}
                    alt="photo logo"
                    width="60px"
                    height="60px"
                />
            </div>
            <div className={createPostStyles.createPostRight}>
                <textarea ref={postContentRef} placeholder='What is happening?' className={createPostStyles.inputText}/>
                <img src={pImgPhoto} className={createPostStyles.previewImage}/>
                {pImgPhoto && <FaWindowClose onClick={() => delImage()} className={createPostStyles.close}/>}
                <div className={createPostStyles.postSettings}>
                    <div>
                        <FaGlobe/>
                    </div>
                    <div>
                        <label className={createPostStyles.filebutton}>
                        <FaImage/>
                        <span><input type="file" value={pImg} onChange={e => changeImg(e)}/></span>
                        </label>
                    </div>
                    <div className={createPostStyles.button}>
                        <button onClick={() => createPost()}>Tweet it!</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CreatePost;