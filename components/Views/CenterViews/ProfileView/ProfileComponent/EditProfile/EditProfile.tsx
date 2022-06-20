import React, {useContext, useState} from 'react'
import editProfileStyles from './editprofile.module.scss'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { FirebaseContext } from '../../../../../../store/firebase-context'
const EditProfile = () => {
    const fbCtx = useContext(FirebaseContext)
    const [imgRef, changeImgRef] = useState('')
    const [photo, changePhoto]:any = useState('')
    const storage = getStorage(fbCtx.app, "gs://ktweetapp.appspot.com")
    const changeImg = (e: any) => {
        changeImgRef(e.target.value)
        const file = e.target.files[0]
        changePhoto(file)
    }
    const uploadFile = (id:string) => {
        const postImageRef = ref(storage, `avatars/${id}.jpg`);
        uploadBytes(postImageRef, photo).then((snapshot) => {
            console.log(snapshot);
        });
    }
    return (
        <div className={editProfileStyles.wrapper}>
        Change Avatar
        <input accept="image/*" type="file" value={imgRef} onChange={e => changeImg(e)}/>
        <button onClick={() => uploadFile('1231237')}>Add</button>
        Change Name 
        Change Location
        Change Bio
        </div>
    )
}
export default EditProfile;