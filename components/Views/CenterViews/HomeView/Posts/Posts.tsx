import React, { useState, useEffect, useContext } from 'react'
import postsStyles from './post.module.scss'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getDocs, collection, getFirestore, onSnapshot, setDoc, doc} from 'firebase/firestore';
import { FirebaseContext } from '../../../../../store/firebase-context';
import Post from './Post';

const Posts = (props:any) => {
    const {requirements} = props
    const fbCtx = useContext(FirebaseContext)
    const [posts, setPosts]:any = useState([])
    const [newPosts, setNewPosts]:any = useState([])
    const postListening = () => {
        const db = getFirestore()
        onSnapshot(collection(db, "posts"), (snapshot) => {
            let postList:any = []
            snapshot.forEach((doc) => {
                postList.push({data: doc.data(), id: doc.id});
            });
            postList.sort((postA:any, postB:any) => {
                return postB.data.metaData.createDate - postA.data.metaData.createDate
            })
            if(requirements) {
                const mappedList:Array<any> = []
                postList.forEach((post:any) => {
                    let is = false;
                    post.data.content.hashtag.forEach((hashtag:String) => {
                        if(hashtag === requirements) {
                            if(is === false) {
                                mappedList.push(post)
                                is = true;
                            }
                        }
                    })
                })
                console.log(mappedList);
                setNewPosts(mappedList)
            } else {
                setNewPosts(postList)
            }
            })
    }
    useEffect(() => {
        postListening()
    },[])
    useEffect(() => {
        postListening()
    },[requirements])
    const postSearch = () => {
        const db = getFirestore()
        getDocs(collection(db, `posts`)).then((snapshot) => {
            let postList:any = []
            snapshot.forEach((doc) => {
              postList.push({data: doc.data(), id: doc.id});
            });
            postList.sort((postA:any, postB:any) => {
                return postB.data.metaData.createDate - postA.data.metaData.createDate
            })
            if(requirements) {
                const mappedList:Array<any> = []
                postList.forEach((post:any) => {
                    let is = false;
                    post.data.content.hashtag.forEach((hashtag:String) => {
                        if(hashtag === requirements) {
                            if(is === false) {
                                mappedList.push(post)
                                is = true;
                            }
                        }
                    })
                })
                console.log(mappedList);
                setPosts(mappedList)
            } else {
                setPosts(postList)                
            }
          }).catch((error) => {
            console.error(error);
          });
    }
    useEffect(() => {
        postSearch()
    },[])
    useEffect(() => {
        postSearch()
    },[requirements])
    const downloadPosts = () => {
        setPosts(newPosts)
    }
    return (
        <div className={postsStyles.posts}>
            <div className={postsStyles.changes}>
                {newPosts.length > posts.length ?<button onClick={downloadPosts}>See {newPosts.length - posts.length} new posts</button>:<p></p>}
            </div>
            {requirements && <p className={postsStyles.requirements}>Search by: #{requirements}</p>}
            {posts.length >= 1 && posts.map((post:any) => {
                console.log('test', post);
                return (
                <>
                    <Post key={post.data.metaData.postId} data={post}/>                
                </>
                )
            })}
        </div>
    )
}
export default Posts;
