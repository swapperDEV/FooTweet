import React, {useContext, useEffect, useState} from 'react'
import { getDatabase, ref, set, get, child} from "firebase/database";
import { getDate } from '../../functions/getDate';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc, getDoc, onSnapshot, collection, updateDoc} from "firebase/firestore"; 
import { FirebaseContext } from '../../store/firebase-context';
import { UserDataContext } from '../../store/userData-context';

const UserProvider = (props) => {
    const FirebaseCtx = useContext(FirebaseContext)
    const UserCtx = useContext(UserDataContext)
    const [userData, setUserData] = useState({
        email: 'Error',
    })
    const { currentUser, auth} = FirebaseCtx
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
    return (
        <>
        <UserDataContext.Provider value={{data: userData}}>
            {props.children}
        </UserDataContext.Provider>
        </>
    )
}
export default UserProvider;