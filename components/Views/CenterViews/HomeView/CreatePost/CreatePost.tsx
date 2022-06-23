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
import Avatar from '../../../../Avatar/Avatar'
import { sendNotify } from '../../../../../functions/sendNotify'
import { getUserData } from '../../../../../functions/getUserData'

const CreatePost = () => {
    const fbCtx = useContext(FirebaseContext)
    const userCtx = useContext(UserDataContext)
    const postContentRef= useRef<HTMLTextAreaElement>(null)
    const hashtagRef = useRef<HTMLInputElement>(null)
    const storage = getStorage(fbCtx.app, "gs://ktweetapp.appspot.com")
    const [imgRef, changeImgRef] = useState('')
    const [photoPreview, changePhotoPreview] = useState('')
    const [imgToUpload, changeImgToUpload]:Array<any> = useState('')
    const [hashtag, setHashtag]:Array<any> = useState([])
    const [hashtagStyles, setHashtagStyles] = useState(createPostStyles.hashtagsList)
    const [postTools, openPostTools] = useState(false)
    const [startedCreatingPost, changeStartedCreatingPost] = useState(false)


    const sendNotifyToFollowers = () => {
        userCtx.data.followers.forEach((follower:any) => {
            getUserData(follower).then((data:any) => {
                const id = data[0].uid 
                sendNotify(id, userCtx.data.username, `${userCtx.data.username} push a new post!`, 'newpost')
            })
        })
    }
    const createPost = async () => {
        if(hashtag.length >= 2) {
            if(postContentRef.current!.value.length >= 7) {
                const db = getFirestore()
                const postId = `${fbCtx.currentUser.uid}.${generateCode()}`
                let haveImg = false;
                if(imgRef !== '') {
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
                        description: postContentRef.current!.value,
                        hashtag: hashtag,
                        haveImg: haveImg
                    },
                    interaction: {
                        comments: [],
                        likes: [],
                    },
                    retweets: []
                }
                await setDoc(doc(db, "posts", postId), dataToUpload);
                if(imgRef !== '') {
                    uploadFile(postId)
                }
                postContentRef.current!.value = ''
                setHashtag([])
                delImage()
                sendNotifyToFollowers()
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
        const postImageRef = ref(storage, `images/${postId}.jpg`);
        uploadBytes(postImageRef, imgToUpload).then((snapshot) => {
            console.log(snapshot);
        });
    }
    const changeImg = (e: any) => {
        changeStartedCreatingPost(true)
        changeImgRef(e.target.value)
        const file = e.target.files[0]
        changeImgToUpload(file)
        if(file) {
            changePhotoPreview(URL.createObjectURL(file))
        }
    }
    const delImage = () => {
        changeImgRef('')
        changeImgToUpload('')
        changePhotoPreview('')
    }
    const addHashtag = () => {
        changeStartedCreatingPost(true)
        let hashtags = hashtag
        if(!hashtags.includes(hashtagRef.current!.value)) {
            if(hashtagRef.current!.value !== '') {
                hashtags.push(hashtagRef.current!.value)
            }
        }
        hashtagRef.current!.value = ''
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
    const handleOpenPostTools = () => {
        openPostTools(true)
    }
    const handleClosePostTools = () => {
        if(!startedCreatingPost) {
            openPostTools(false)
        }
    }
    const handleWrite = () => {
        changeStartedCreatingPost(true)
    }
    return (
        <>
        {}
        <div className={createPostStyles.createPost}>
            <div className={createPostStyles.createPostLeft}>
                <Avatar userID={fbCtx.currentUser.uid}/>
            </div>
            <div className={createPostStyles.createPostRight} onMouseEnter={handleOpenPostTools} onMouseLeave={handleClosePostTools}>
                <textarea ref={postContentRef} onChange={handleWrite} placeholder='What is happening?' className={createPostStyles.inputText}/>
                {postTools && 
                <div className={createPostStyles.animate}>
                <img src={photoPreview} className={createPostStyles.previewImage}/>
                {photoPreview && <FaWindowClose onClick={() => delImage()} className={createPostStyles.close}/>}
                <div className={createPostStyles.postSettings}>
                    <div>
                        <FaGlobe/>
                    </div>
                    <div>
                        <label className={createPostStyles.filebutton}>
                        <FaImage/>
                        <span><input onClick={handleWrite} className={createPostStyles.file} accept="image/*" type="file" value={imgRef} onChange={e => changeImg(e)}/></span>
                        </label>
                    </div>
                    <div className={createPostStyles.hashtags}>
                        <FaHashtag onClick={() => openHashTagList()}/>
                        <div className={hashtagStyles}>Hasztag list <br/> 
                            <ul>{hashtag.map((h:String, index:number) => (
                                <li key={index}>{`#${h}`}</li>    
                            ))}
                            </ul>
                            <button onClick={() => closeHashtagList()}>close</button>                            <button onClick={() => resetHashtagList()}>reset</button>
                        </div>
                        <input placeholder="Hashtags" onChange={handleWrite} ref={hashtagRef}/>
                        <button onClick={() => addHashtag()}>Add</button>
                    </div>
                    <div className={createPostStyles.button}>
                        <button onClick={() => createPost()}>Tweet it!</button>
                    </div>
                </div> 
                </div>
                }
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