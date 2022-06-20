import React, { useEffect, useState } from 'react'
import { doc, getDocs, getFirestore, collection } from "firebase/firestore";
import suggestionStyle from './suggestion.module.scss'
import Avatar from '../../../../../Avatar/Avatar';
const Suggestions = () => {
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
    return (
        <div className={suggestionStyle.wrapper}>
            <div>
                <p>You should follow</p>
            </div>
            <div>
                {usersSuggestion.length > 0 && usersSuggestion.map((user:any, index:number) => {
                    console.log(user);
                    return (
                        <div key={index} className={suggestionStyle.userBaner}>
                            <div>
                                <Avatar/>
                            </div>
                            <div className={suggestionStyle.userBanerInfo}>
                                <p>{user.data.name}</p>
                                <p>@{user.data.username}</p>
                            </div>
                            <div>
                                <p>Follow</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Suggestions;