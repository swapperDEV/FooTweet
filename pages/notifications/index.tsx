import React from 'react'
import View from '../../components/Views/View';
import PrivateRoute from '../../routes/PrivateRoute';
import Head from 'next/head';

export default function Home() {
    return (
    <>
        <Head>
            <title>FooTweet - Notifications</title>
        </Head>
        <PrivateRoute>
                <View/>
        </PrivateRoute>
    </>
    )
}