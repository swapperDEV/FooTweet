import React, {useContext, useState, useRef} from 'react'
import editProfileStyles from './editprofile.module.scss'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { FaImage } from "@react-icons/all-files/fa/FaImage";
import { FirebaseContext } from '../../../../../../store/firebase-context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, getFirestore, updateDoc } from "firebase/firestore";

const toastOptions:any = {
    theme: 'dark',
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

const EditProfile = () => {
    const fbCtx = useContext(FirebaseContext)
    const [imgRef, changeImgRef] = useState('')
    const [photo, changePhoto]:any = useState('')
    const nameRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLInputElement>(null);
    const bioRef = useRef<HTMLInputElement>(null);
    const storage = getStorage(fbCtx.app, "gs://ktweetapp.appspot.com")
    const changeImg = (e: any) => {
        changeImgRef(e.target.value)
        const file = e.target.files[0]
        changePhoto(file)
    }
    const uploadFile = () => {
        let id = fbCtx.currentUser.uid
        const postImageRef = ref(storage, `avatars/${id}.jpg`);
        if(photo) {
            uploadBytes(postImageRef, photo).then((snapshot) => {
                console.log(snapshot);
                changeImgRef('')
                changePhoto('')
                toast.info('You change avatar, refresh page!', toastOptions);
                const db = getFirestore()
                const userRef = doc(db, "users", fbCtx.currentUser.uid);
                updateDoc(userRef, {
                    avatarID: id
                })
            });
        } else {
            toast.error('Add a file to upload new avatar!', toastOptions);
        }
    }
    const updateProfile = () => {
        const db = getFirestore()
        const userRef = doc(db, "users", fbCtx.currentUser.uid);
        if(bioRef.current!.value.length > 0) {
            updateDoc(userRef, {
                bio: bioRef.current!.value
            })
            toast('Bio was updated', toastOptions)
            bioRef.current!.value = ''
        }
        if(locationRef.current!.value.length > 0) {
            updateDoc(userRef, {
                location: locationRef.current!.value
            })
            toast('Location was updated', toastOptions)
            locationRef.current!.value = ''
        }
        if(nameRef.current!.value.length > 0) {
            updateDoc(userRef, {
                name: nameRef.current!.value
            })
            toast('Name was updated', toastOptions)
            nameRef.current!.value = ''
        }
    }
    return (
        <div className={editProfileStyles.wrapper}>
            <div className={editProfileStyles.avatar}>
                <p>Change Avatar</p>
                <div>
                    <label className={editProfileStyles.filebutton}>
                        <FaImage className={imgRef && editProfileStyles.file}/>
                        <span><input accept="image/*" type="file" value={imgRef} onChange={e => changeImg(e)}/></span>
                    </label>
                    <button className={editProfileStyles.btn} onClick={() => uploadFile()}>Add</button>
                </div>

            </div>
            <div className={editProfileStyles.info}>
                <div>
                    <input maxLength={32} ref={nameRef}/>Change Name 
                </div>
                <div>
                    <input maxLength={32} ref={locationRef}/>Change Location
                </div>
                <div>
                    <input maxLength={64} ref={bioRef}/>Change Bio
                </div>
            </div> 
            <div>
                <button onClick={() => updateProfile()} className={editProfileStyles.btn}>Update profile</button>
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
        </div>
    )
}
export default EditProfile;