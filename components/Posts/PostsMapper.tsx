/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react'
import postsStyles from './post.module.scss'
import { getDocs, collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { FirebaseContext } from '../../store/firebase-context';
import Post from './Post';
import { PostsProps, PostListType, IPostList } from '../../types/post/postsmapper';

const Posts = ({requirements, requirementsType}: PostsProps) => {
    const [posts, setPosts] = useState<IPostList[]|any>([])
    const [newPosts, setNewPosts] = useState<IPostList[]|any>([])
    const mappedPostByHashtag = (postList:Array<PostListType>, type:String) => {
        const mappedList:Array<PostListType> = []
        postList.map((post) => {
            post.data.content.hashtag.map((hashtag:String) => {
                if(hashtag === requirements) {
                    return mappedList.push(post)
                }
            })
        })
        if(type === 'new') {
            setNewPosts(mappedList)
        } else if(type === 'all') {
            setPosts(mappedList)
        }
    }
    const mappedPostByWords = (postList:Array<PostListType>, type:String) => {
        const mappedList:Array<PostListType> = []
        postList.map((post) => {
            let description = post.data.content.description.toLowerCase()
            if(description.includes(requirements!.toLowerCase())) {
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
            postList.sort((postA:PostListType, postB:PostListType) => {
                return postB.data.metaData.createDate - postA.data.metaData.createDate
            })
            if(requirements !== 'none') {
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
            let postList:Array<PostListType | any> = []
            snapshot.forEach((doc) => {
              postList.push({data: doc.data(), id: doc.id});
            });
            postList.sort((postA:PostListType, postB:PostListType) => {
                return postB.data.metaData.createDate - postA.data.metaData.createDate
            })
            if(requirements !== 'none') {
                if(requirementsType === 'hashtag') {
                    mappedPostByHashtag(postList, 'all')
                } else if(requirementsType === 'words') {
                    mappedPostByWords(postList, 'all')
                }
            } else {
                setPosts(postList)                
            }
          })
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
            {requirements !== 'none' && <p className={postsStyles.requirements}>Search by: {requirementsType === 'hashtag' ?  '#' : 'word '}{requirements}</p>}
            {posts.length >= 1 && posts.map((post:any) => {
                return (
                <>
                    <Post avatar={true} key={post.data.metaData.postId} type='short' data={post}/>                
                </>
                )
            })}
        </div>
    )
}
export default Posts;
