import React from 'react'
import View from '../../components/Views/View';
import PrivateRoute from '../../routes/PrivateRoute';
import Head from 'next/head';

export default function Messages() {
    return (
    <>
        <Head>
            <title>FooTweet - Messages</title>
        </Head>
        <PrivateRoute>
            <View/>
        </PrivateRoute>
    </>
    )
}
