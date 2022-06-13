import React, {useContext, useEffect, useRef, useState} from 'react'
import { FirebaseContext } from '../../../../../store/firebase-context'
import createPostStyles from './createpost.module.scss'
import Image from 'next/image'
import testAvatar from '../../../../../assets/meta.png'
import {getStorage,ref,uploadBytes} from 'firebase/storage'
import { setDoc, doc, getFirestore, getDoc } from 'firebase/firestore'
import { generateCode } from '../../../../../functions/generateCode'
import { UserDataContext } from '../../../../../store/userData-context'
import { getDate } from '../../../../../functions/getDate'
import { FaGlobeEurope as FaGlobe } from "@react-icons/all-files/fa/FaGlobeEurope";
import { FaImage } from "@react-icons/all-files/fa/FaImage";
import { FaWindowClose } from "@react-icons/all-files/fa/FaWindowClose";
import { FaHashtag } from "@react-icons/all-files/fa/FaHashtag";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreatePost = () => {
    const fbCtx = useContext(FirebaseContext)
    const userCtx = useContext(UserDataContext)
    const postContentRef:any= useRef('')
    const hashtagRef:any = useRef('')
    const storage = getStorage(fbCtx.app, "gs://ktweetapp.appspot.com")
    const [pImg, changePostImg]:any = useState('')
    const [pImgPhoto, changePostImgPhoto]:any = useState('')
    const [imgToUpload, changeImgToUpload]:any = useState('')
    const [hashtag, setHashtag]:any = useState([])
    const [allHashtag, setAllHashtag]:any = useState([{name: 'barca', count: 500}])
    const [hashtagStyles, setHashtagStyles]:any = useState(createPostStyles.hashtagsList)

    const createPost = async () => {
        if(hashtag.length >= 2) {
            if(postContentRef.current.value.length >= 7) {
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
                        username: userCtx.data.username,
                        name: userCtx.data.name
                    },
                    metaData: {
                        createDate: getDate(),
                        postId: postId,
                    },
                    content: {
                        description: postContentRef.current.value,
                        hashtag: hashtag,
                        haveImg: haveImg
                    }
                }
                await setDoc(doc(db, "posts", postId), dataToUpload);
                if(pImg !== '') {
                    uploadFile(postId)
                }
                postContentRef.current.value = ''
                setHashtag([])
                delImage()
            } else {
                toast.error('Write a post description!', {
                    theme: 'dark',
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
        } else {
            toast.error('Add min.2 hashtags!', {
                theme: 'dark',
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }

    const uploadFile = (postId:string) => {
        console.log(fbCtx.currentUser.uid);
        const postImageRef = ref(storage, `images/${postId}.jpg`);
        uploadBytes(postImageRef, imgToUpload).then((snapshot) => {
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
    const addHashtag = () => {
        let hashtags = hashtag
        if(!hashtags.includes(hashtagRef.current.value)) {
            if(hashtagRef.current.value !== '') {
                hashtags.push(hashtagRef.current.value)
            }
        }
        hashtagRef.current.value = ''
        setHashtag(hashtags)
    }
    const closeHashtagList = () => {
        setHashtagStyles(createPostStyles.hashtagsList)
    }
    const resetHashtagList = () => {
        setHashtag([])
    }
    const openHashTagList = () => {
        setHashtagStyles(createPostStyles.hashtagsListOpen)
    }
    useEffect(() => {
        const db = getFirestore()
    },[])
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
                        <span><input className={createPostStyles.file} type="file" value={pImg} onChange={e => changeImg(e)}/></span>
                        </label>
                    </div>
                    <div className={createPostStyles.hashtags}>
                        <FaHashtag onClick={() => openHashTagList()}/>
                        <div className={hashtagStyles}>Hasztag list <br/> 
                            <ul>{hashtag.map((h:any, index:number) => (
                                <li key={index}>{`#${h}`}</li>    
                            ))}
                            </ul>
                            <button onClick={() => closeHashtagList()}>close</button>                            <button onClick={() => resetHashtagList()}>reset</button>
                        </div>
                        <input placeholder="Hashtags" ref={hashtagRef}/>
                        <button onClick={() => addHashtag()}>Add</button>
                    </div>
                    <div className={createPostStyles.button}>
                        <button onClick={() => createPost()}>Tweet it!</button>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        </>
    )
}

export default CreatePost;