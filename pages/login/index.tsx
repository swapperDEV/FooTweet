import React, {useContext, useEffect, useState} from 'react'
import { FirebaseContext } from '../../store/firebase-context'
import Link from 'next/link';
import Router from 'next/router';
import LoginComponent from '../../components/Login/Login';
import UnAuthRoute from '../../routes/UnAuthRoute';
import PrivateRoute from '../../routes/PrivateRoute'
import Head from 'next/head';

export default function Signup() {
    const FirebaseCtx = useContext(FirebaseContext)
    const { currentUser } = FirebaseCtx
    useEffect(() => {
      if(currentUser) {
        Router.push('/home')
    }})
    return (
        <>
            <Head>
                <title>FooTweet Login</title>
            </Head>
            <UnAuthRoute>
                <LoginComponent/>
            </UnAuthRoute>
        </>
    )
}