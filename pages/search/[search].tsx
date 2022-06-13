import React from 'react'
import View from '../../components/Views/View';
import PrivateRoute from '../../routes/PrivateRoute';
import Head from 'next/head';

export default function Hashtag() {
    return (
    <>
        <Head>
            <title>Searching By Keywords</title>
        </Head>
        <PrivateRoute>
            <View/>
        </PrivateRoute>
    </>
    )
}