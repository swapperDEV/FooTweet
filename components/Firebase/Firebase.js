import React, {useEffect, useState} from 'react'
import { firebaseConfig } from '../../store/firebase-config';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { FirebaseContext } from '../../store/firebase-context';
import { signOut } from "firebase/auth"
import "firebase/firestore"
import { getDate } from '../../functions/getDate'
import { getFirestore } from 'firebase/firestore';
import Image from 'next/image';
import ImageStyle from './firebase.module.scss'
import logo from '../../assets/logo.png'

const Firebase = (props) => {
    const [currentUser, setCurrentUser] = useState()
    const [registerDataState, setDataState] = useState()
    const [canLogged, setCanLogged] = useState(false)
    const app = initializeApp(firebaseConfig);
    const auth = getAuth()
    const signOutUser = () => {
        return signOut(auth)
    }
    useEffect(() => {
        auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setCanLogged(true)
    })})
    const setData = (data1, data2) => {
        console.log(data1, data2)
        setDataState({
            data1, data2
        })
    }

    return (
        <>
            <FirebaseContext.Provider value={{registerData: registerDataState, setRegisterData: (x,y) => setData(x,y), canLogged: canLogged, auth: auth, app: app, currentUser: currentUser, setCurrentUser: (x) => setCurrentUser(x), signOutUser: () => signOutUser()}}>
                {canLogged ? props.children : 
                <div className={ImageStyle.wrapper}>
                </div>}    
            </FirebaseContext.Provider>        
        </>
    )
}

export default Firebase;