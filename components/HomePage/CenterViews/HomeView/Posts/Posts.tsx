import React, { useState, useEffect, useContext } from 'react'
import postsStyles from './post.module.scss'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getDocs, collection, getFirestore, onSnapshot} from 'firebase/firestore';
import { FirebaseContext } from '../../../../../store/firebase-context';
import Post from './Post';

const Posts = () => {
    const fbCtx = useContext(FirebaseContext)
    const [posts, setPosts]:any = useState([])
    useEffect(() => {
        const db = getFirestore()
        onSnapshot(collection(db, "posts"), (snapshot) => {
            let postList:any = []
            snapshot.forEach((doc) => {
                postList.push({data: doc.data(), id: doc.id});
            });
            setPosts(postList)
            })
    },[])
    console.log('test', posts);
    return (
        <div className={postsStyles.posts}>
            {posts.length >= 1 && posts.map((post:any, index:number) => {
                return (<Post key={index} data={post}/>)
            })}
        </div>
    )
}
export default Posts;