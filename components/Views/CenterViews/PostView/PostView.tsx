import React, { useEffect, useState } from 'react'
import viewStyles from '../../styles/view.module.scss'
import { Fade } from 'react-awesome-reveal'
import Post from '../../../Posts/Post'
import { useRouter } from 'next/router'
import { getFirestore, doc, getDoc, onSnapshot} from 'firebase/firestore'
import Router from 'next/router'
const PostView = () => {
    const [data, setData]:any = useState(null)
    const path = useRouter()
    useEffect(() => {
        if(path.query) {
            const db = getFirestore()
           onSnapshot(doc(db, `posts/${path.query.postId}`), (doc:any) => {
                if (doc.exists()) {
                    console.log(doc.data());
                    setData({data: doc.data()})
                } else {
                    Router.push('/')
                }
            })
        }
    },[])
    console.log(data);
    return (
        <>
        <Fade>
            <div className={viewStyles.posts}>
                {data !== null && <Post data={data} type='long'/>}
            </div>
        </Fade>
        </>
    )
}
export default PostView;