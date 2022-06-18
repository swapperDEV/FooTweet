import React, {useEffect, useRef, useState} from 'react'
import hashtagsStyles from './hashtag.module.scss'
import { FaStream } from "@react-icons/all-files/fa/FaStream";
import { getFirestore, onSnapshot, collection } from 'firebase/firestore';
import Router from 'next/router';

type postTypes = {
    data: {
        content: {
            hashtag: Array<string>
        }
    }
}
const Hashtags = () => {
    const hashtagSearchRef = useRef<HTMLInputElement>(null)
    const [allHashtag, setAllHashtag] = useState(false)
    const [mappedHashtagList, setMappedHashtagList] = useState([{}])
    const calculateHashtags = async (postList:Array<postTypes>) => {
        const hashtags:Array<String> = []
        postList.forEach(post => {
            let hashtagsInPost = post.data.content.hashtag
            hashtagsInPost.forEach((hashtag:String) => {
                hashtags.push(hashtag)
            })
        })
        let sortedArr = hashtags.sort();
        let hashtagsArray = []
        let count = 1;
        for (let i = 0; i < sortedArr.length; i = i + count) {
            count = 1;
            for (let j = i + 1; j < sortedArr.length; j++) {
                if (sortedArr[i] === sortedArr[j])
                count++;
            }
            const obj = {
                name: sortedArr[i],
                count: count
            }
            hashtagsArray.push(obj)
        }
        hashtagsArray.sort((hashA, hashB) => {
            return hashB.count - hashA.count
        })
        setMappedHashtagList(hashtagsArray)
    }
    useEffect(() => {
        const db = getFirestore()
        onSnapshot(collection(db, "posts"), (snapshot) => {
            let postList:Array<any> = []
            snapshot.forEach((doc) => {
                postList.push({data: doc.data(), id: doc.id});
            });
            calculateHashtags(postList)
        })
    },[])
    const searchByHashtag = (e:React.KeyboardEvent<HTMLElement>) => {
        if(e.key === 'Enter') {
            Router.push(`/hashtag/${hashtagSearchRef.current!.value}`)
        }
    }
    const redirectToHashtag = (hashtag:String) => {
        Router.push(`/hashtag/${hashtag}`, undefined, { shallow: true })
    }
    const seeAllHashtag = () => {
        setAllHashtag(!allHashtag)
    }
    return (
        <div className={hashtagsStyles.wrapper}>
            <div className={hashtagsStyles.search}>
                <input placeholder="# Search post" ref={hashtagSearchRef} onKeyDown={searchByHashtag}/>
                <FaStream/>
            </div>
            <div className={hashtagsStyles.popular}>
                <div className={allHashtag ? hashtagsStyles.wrapperonce : hashtagsStyles.popularWrap}>
                {mappedHashtagList.map((hashtag:any, index:number) => {
                    return (
                        <div key={index} className={hashtagsStyles.divHashtag} onClick={() => redirectToHashtag(hashtag.name)}>
                            <p>{`#${hashtag.name}`}</p>
                            <p>{hashtag.count}</p>
                        </div>
                    )
                })}
                </div>
                <p className={hashtagsStyles.more} onClick={() => seeAllHashtag()}>{allHashtag ? "HIDE" : "SEE MORE" }</p>
            </div>
        </div>
    )
}
export default Hashtags;