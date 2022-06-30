import {useContext, useEffect, useState} from 'react'
import { getUserData } from "../../../../functions/getUserData";
import Router from 'next/router';
import Avatar from "../../../Avatar/Avatar";
import { UserDataContext } from '../../../../store/userData-context';
const Conversation = (props:any) => {
    const [id, changeId] = useState('')
    const userCtx = useContext(UserDataContext)
    const [target, changeTarget] = useState(null)
    const [number, setNumber] = useState(0)
    const {conversation} = props

    useEffect(() => {
        if(userCtx.data)  {
            userCtx.data.messages.map((message:any) => {
                if(message.id === conversation.id) {
                    setNumber(message.new)
                }
            })
        }
        if(conversation) {
            if(conversation.users[0] === props.userCtx.data.username) {
                changeTarget(conversation.users[1])
            } else {
                changeTarget(conversation.users[0])
            }
            if(target) {
                getUserData(target).then((value:any) => {
                    changeId(value[0].uid)
                })
            }
        }
    },[target])
    const redirect = () => {
        Router.push(`/messages/${conversation.users[0]}+${conversation.users[1]}`)
    }
    return (
        <li onClick={() => redirect()}>      
            <div>{id && <Avatar userID={id}/>}</div>
            <p>{target}</p>
            <a>({number} new messages)</a>
        </li>
    )
}
export default Conversation;