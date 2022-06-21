import React, { useEffect, useState } from 'react'
import { doc, getDocs, getFirestore, collection, updateDoc } from "firebase/firestore";
import suggestionStyle from './suggestion.module.scss'
import Avatar from '../../../../../Avatar/Avatar';

type suggestionsProps = {
    followedUsers: Array<String>,
    id: String
}
const Suggestions = ({followedUsers, id}:suggestionsProps) => {
    const [usersSuggestion, updateSuggestion]:any = useState([])
    useEffect(() => {
        const db = getFirestore()
        getDocs(collection(db, `users`)).then((snapshot) => {
            let usersList:any = []
            snapshot.forEach((doc) => {
                usersList.push({data: doc.data(), id: doc.id});
            });
            let max = usersList.length 
            let numbers:any = []
            for(let i = 0; i<3; i++) {
                max = max - 1
                let number = Math.floor(Math.random() * 0) + max
                while(numbers.includes(number)) {
                    Math.floor(Math.random() * 0) + max
                }
                numbers.push(number)
            }
            const list:any = []
            numbers.map((id:number) => {
                list.push(usersList[id])
            })
            updateSuggestion(list)
        })
    },[])
    const followUser = async (username:String) => {
        const db = getFirestore()
        const userRef = doc(db, "users", `${id}`);
        const following = followedUsers
        following.push(username)
        await updateDoc(userRef, {
            following: following
          });
    }
    return (
        <div className={suggestionStyle.wrapper}>
            <div>
                <p>You should follow</p>
            </div>
            <div>
                {usersSuggestion.length > 0 && usersSuggestion.map((user:any, index:number) => {
                    return (
                        <div key={index} className={suggestionStyle.userBaner}>
                            <div>
                                <Avatar userID={user.data.uid}/>
                            </div>
                            <div className={suggestionStyle.userBanerInfo}>
                                <p>{user.data.name}</p>
                                <p>@{user.data.username}</p>
                            </div>
                            <div>
                                <div onClick={() => followUser(user.data.username)}>{followedUsers.includes(user.data.username) ? <button>Unfollow</button> : <button>Follow</button>}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Suggestions;