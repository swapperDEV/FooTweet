import React, {useContext, useRef} from 'react'
import { FirebaseContext } from '../../../store/firebase-context'
import homeStyles from './home.module.scss'
import Image from 'next/image'
import testAvatar from '../../../assets/meta.png'
import {getStorage,ref,uploadBytes} from 'firebase/storage'

const Home = (props:any) => {
    const fbCtx = useContext(FirebaseContext)
    const fileRef:any = useRef('')
    const storage = getStorage(fbCtx.app, "gs://ktweetapp.appspot.com")
    const uploadFile = () => {
        console.log(fbCtx.currentUser.uid);
        const avatarRef = ref(storage, `images/${fbCtx.currentUser.uid}`);
        uploadBytes(avatarRef, fileRef).then((snapshot) => {
            alert('dodano zdj')
            console.log(snapshot);
        });
    }

    const {actView} = props
    return (
        <div className={homeStyles.wrapper}>
            <p className={homeStyles.actView}>{actView}</p>
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
                    <input/>
                    <p>Public</p>
                    <input type="file" ref={fileRef}/>
                    <button onClick={() => uploadFile()}>Tweet it!</button>
                </div>
            </div>
            <div className={homeStyles.posts}>

            </div>
        </div>
    )
}

export default Home;