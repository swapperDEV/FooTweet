import React, { useState, useEffect, useContext } from 'react'
import postsStyles from './post.module.scss'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getDocs, collection, getFirestore, onSnapshot, setDoc, doc} from 'firebase/firestore';
import { FirebaseContext } from '../../../../../store/firebase-context';
import Post from './Post';

const Posts = (props:any) => {
    const {requirements, requirementsType} = props
    console.log(requirements, requirementsType);
    const fbCtx = useContext(FirebaseContext)
    const [posts, setPosts]:any = useState([])
    const [newPosts, setNewPosts]:any = useState([])
    const mappedPostByHashtag = (postList:Array<Object>, type:String) => {
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
        if(type === 'new') {
            setNewPosts(mappedList)
        } else if(type === 'all') {
            setPosts(mappedList)
        }
    }
    const mappedPostByWords = (postList:Array<Object>, type:String) => {
        console.log('mapped by words');
        const mappedList:Array<any> = []
        postList.forEach((post: any) => {
            let description = post.data.content.description.toLowerCase()
            if(description.includes(requirements.toLowerCase())) {
                mappedList.push(post)
            }
        })        
        if(type === 'new') {
            setNewPosts(mappedList)
        } else if(type === 'all') {
            setPosts(mappedList)
        }
    }
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
                if(requirementsType === 'hashtag') {
                    mappedPostByHashtag(postList, 'new')
                } else if(requirementsType === 'words') {
                    mappedPostByWords(postList, 'new')
                }
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
                if(requirementsType === 'hashtag') {
                    mappedPostByHashtag(postList, 'all')
                } else if(requirementsType === 'words') {
                    mappedPostByWords(postList, 'all')
                }
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
            {requirements && <p className={postsStyles.requirements}>Search by: {requirementsType === 'hashtag' ?  '#' : 'word '}{requirements}</p>}
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
