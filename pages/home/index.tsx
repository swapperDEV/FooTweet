import React, {useContext, useEffect, useState} from 'react'
import { FirebaseContext } from '../../store/firebase-context'
import { getDatabase, ref, set, get, child} from "firebase/database";
import { getDate } from '../../functions/getDate';
import HomePage from '../../components/HomePage/HomePage';
import PrivateRoute from '../../routes/PrivateRoute';
import Head from 'next/head';

export default function Home() {
    const FirebaseCtx = useContext(FirebaseContext)
    const [userData, setUserData] = useState('')
    if(FirebaseCtx.currentUser) {
        const db = getDatabase();
        const dbRef = ref(db, 'users/' + FirebaseCtx.currentUser.uid);
        if(FirebaseCtx.registerData) {
            console.log('creating')
            set(dbRef, {
                username: FirebaseCtx.registerData.data2,
                email: FirebaseCtx.registerData.data1,
                createDate: getDate()
            });
        }
    }
    const { currentUser, auth} = FirebaseCtx
    useEffect(() => {
        if(FirebaseCtx.currentUser) {
        const readDbRef = ref(getDatabase());
        get(child(readDbRef, `users/${FirebaseCtx.currentUser.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
              setUserData(snapshot.val())
            } else {
            }
          }).catch((error) => {
            console.error(error);
          });
        console.log(userData)
        }
    },[])
    return (
    <>
        <Head>
            <title>FooTweet</title>
        </Head>
        <PrivateRoute>
            <HomePage/>
        </PrivateRoute>
    </>
    )
}