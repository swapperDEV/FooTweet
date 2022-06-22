import React, {useContext, useEffect, useState} from 'react'
import { getDate } from '../../functions/getDate';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore"; 
import { FirebaseContext } from '../../store/firebase-context';
import { UserDataContext } from '../../store/userData-context';
import { getStorage, ref as sRef, getDownloadURL} from 'firebase/storage';

const UserProvider = (props) => {
    const FirebaseCtx = useContext(FirebaseContext)
    const UserCtx = useContext(UserDataContext)
    const [userData, setUserData] = useState({
        email: 'Error',
    })
    const [userAvatar, setUserAvatar] = useState(null)
    const { currentUser, auth} = FirebaseCtx
    const getAvatar = async () => {
        let data;
        const storage = getStorage()
        const db = getFirestore()
        const userRef = doc(db, "users", userData.uid);
        const userSnap = await getDoc(userRef)
        if(userSnap.exists()) {
            data = userSnap.data()
            getDownloadURL(sRef(storage, `avatars/${data.avatarID}.jpg`))
            .then((url) => {
                setUserAvatar(url)
            })
        }
    }
    useEffect(() => {
        if(FirebaseCtx.currentUser) {
        const db = getFirestore();
            onSnapshot(doc(db, `users/${FirebaseCtx.currentUser.uid}`), (snapshot) => {
            if (snapshot.exists()) {
                setUserData(snapshot.data())
            }
        })}
    },[currentUser])
    useEffect(() => {
        if(FirebaseCtx.currentUser) {
            const db = getFirestore();
            if(FirebaseCtx.registerData) {
                setDoc(doc(db, "users", `${FirebaseCtx.currentUser.uid}`), {
                    username: FirebaseCtx.registerData.data2,
                    email: FirebaseCtx.registerData.data1,
                    name: FirebaseCtx.registerData.data3,
                    createDate: getDate(),
                    avatarID: 'standard',
                    location: 'Football pitch',
                    followers: [],
                    following: [],
                    retweets: [],
                    bio: '',
                    uid: FirebaseCtx.currentUser.uid,
                });
                FirebaseCtx.resetRegisterData()
            }
        }
    },[FirebaseCtx.currentUser])
    useEffect(() => {
        console.log('test', userData.uid)
        if(userData.uid) {
            getAvatar()
        }
    }, [userData.uid])
    return (
        <>
        <UserDataContext.Provider value={{data: userData, avatar: userAvatar, getAvatar: () => getAvatar()}}>
            {props.children}
        </UserDataContext.Provider>
        </>
    )
}
export default UserProvider;