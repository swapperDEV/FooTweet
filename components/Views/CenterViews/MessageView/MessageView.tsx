import React, { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { query, where, collection, getFirestore, getDocs, doc, setDoc, onSnapshot } from "firebase/firestore";  
import viewStyles from '../../styles/view.module.scss'
import { getDate } from '../../../../functions/getDate';
import { UserDataContext } from '../../../../store/userData-context';
import { getUserData } from '../../../../functions/getUserData';
import Avatar from '../../../Avatar/Avatar';
const MessageView = () => {
    const path = useRouter();
    const messageValue:any = useRef('')
    const [conversation, setConversation]:Array<any> = useState({});
    const [targetUser, setTargetUser]:Array<any> = useState({username: ''});
    const userCtx = useContext(UserDataContext);
    const db = getFirestore();

    const createConversation = async (users:Array<string>) => {
        const newConversation = {
            users: users, 
            id: `${users.join()}`,
            messages: []
        }
        const conversationRef = doc(db, 'messages', `${users.join()}`)
        setDoc(conversationRef, newConversation);
        if(userCtx.data.username === users[0]) {
            const target = users[1]
            getUserData(target).then((value) => {
                setTargetUser(value[0])
            })
        } else {
            const target = users[0]
            getUserData(target).then((value) => {
                setTargetUser(value[0])
            })
        }
        setConversation(newConversation)

    }
    const messageSearch = async () => {
        const queryUsers = path.query.message;
        if(typeof(queryUsers) === 'string') {
            const users = queryUsers.split('+');
            const messagesRef = collection(db, 'messages');
            const q = query(messagesRef, where("users", "array-contains-any", users));
            const messagesSnapshot = await onSnapshot(q, (data) => {
                const table:Array<any> = []
                data.forEach((doc) => {
                    const data = doc.data()
                    if(data.users[0] === users[0] && data.users[1] === users[1]) {
                        table.push(data)
                    } else if(data.users[0] === users[1] && data.users[1] === users[0]) {
                        table.push(data)
                    }
                })
                if(table.length > 0) {
                    setConversation(table[0])
                    if(userCtx.data.username === table[0].users[0]) {
                        const target = table[0].users[1]
                        getUserData(target).then((value) => {
                            setTargetUser(value[0])
                        })
                    } else {
                        const target = table[0].users[0]
                        getUserData(target).then((value) => {
                            setTargetUser(value[0])
                        })
                    }
                } else {
                    createConversation(users)
                }
            })
        }
    }
    const pushMessage = async () => {
        const value = messageValue.current.value
        const messages = conversation.messages 
        messages.push({
            creator: userCtx.data.username,
            value: value, 
            time: getDate(),
        })
        const conversationToPush = conversation 
        conversationToPush.messages = messages
        await setDoc(doc(db, "messages", conversation.id), conversationToPush);
        messageValue.current.value = ''
    }
    useEffect(() => {
        let canYouSee = path.query.message
        if(userCtx.data.username) {
            if(typeof(canYouSee) === "string") {
                canYouSee = canYouSee.split('+')
                console.log(canYouSee, userCtx.data.username);
                if(canYouSee.includes(userCtx.data.username)) {
                    messageSearch()
                } else {
                    alert('ZAKAZANE')
                }
            }
        }
    },[userCtx])
    return (
        <>
            <div className={viewStyles.messageContainer}>
                {targetUser.uid && <Avatar userID={targetUser.uid}/>}
                {targetUser.username}
                lista<br/>
                <ul>
                    {conversation.messages && conversation.messages.map((message:any, index:number) => {
                        console.log(message);
                        return (
                            <li key={index}>{message.value}</li>
                        )
                    })}
                    <input placeholder='write' ref={messageValue}/><button onClick={() => pushMessage()}>push</button>
                </ul>
            </div>     
        </>
    )
}
export default MessageView;