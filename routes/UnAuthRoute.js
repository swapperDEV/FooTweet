import React from 'react'
import { FirebaseContext } from '../store/firebase-context';
import { useContext } from 'react';
const UnAuthRoute = (props) => {
    const FirebaseCtx = useContext(FirebaseContext)
    const { currentUser } = FirebaseCtx
    return currentUser ? console.log('-') : props.children;
};
export default UnAuthRoute;