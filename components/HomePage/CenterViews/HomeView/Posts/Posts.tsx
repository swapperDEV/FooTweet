import React, { useState, useEffect, useContext } from 'react'
import postsStyles from './post.module.scss'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getDocs, collection, getFirestore, onSnapshot, setDoc, doc} from 'firebase/firestore';
import { FirebaseContext } from '../../../../../store/firebase-context';
import Post from './Post';

const Posts = () => {
    const fbCtx = useContext(FirebaseContext)
    const [posts, setPosts]:any = useState([])
    const [newPosts, setNewPosts]:any = useState([])
    useEffect(() => {
        const db = getFirestore()
        onSnapshot(collection(db, "posts"), (snapshot) => {
            let postList:any = []
            snapshot.forEach((doc) => {
                postList.push({data: doc.data(), id: doc.id});
            });
            postList.sort((postA:any, postB:any) => {
                return postB.data.metaData.createDate - postA.data.metaData.createDate
            })
            setNewPosts(postList)
            })
    },[])
    useEffect(() => {
        const db = getFirestore()
        getDocs(collection(db, `posts`)).then((snapshot) => {
            let postList:any = []
            snapshot.forEach((doc) => {
                console.log('id', doc.id)
              postList.push({data: doc.data(), id: doc.id});
            });
            console.log(postList); 
            postList.sort((postA:any, postB:any) => {
                console.log('sortowanie', postA, postB);
                return postB.data.metaData.createDate - postA.data.metaData.createDate
            })
            setPosts(postList)
          }).catch((error) => {
            console.error(error);
          });
    },[])
    const downloadPosts = () => {
        setPosts(newPosts)
    }
    return (
        <div className={postsStyles.posts}>
            <div className={postsStyles.changes}>
                {newPosts.length > posts.length ?<button onClick={downloadPosts}>See {newPosts.length - posts.length} new posts</button>:<p></p>}
            </div>
            {posts.length >= 1 && posts.map((post:any, index:number) => {
                return (<Post key={index} data={post}/>)
            })}
        </div>
    )
}
export default Posts;