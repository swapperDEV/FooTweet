import React, {useContext, useEffect, useState} from 'react'
import { FaCircle } from "@react-icons/all-files/fa/FaCircle";
import { UserDataContext } from '../../../../store/userData-context'
import notifyStyles from './notify.module.scss'
import { getFirestore, updateDoc, doc} from 'firebase/firestore';
const NotificationsView = () => {
    const userCtx = useContext(UserDataContext)
    const [notifications, addNotifications] = useState(userCtx.data.notifications)
    const readNotify = async (id:String) => {
        const list = notifications 
        const index = list.findIndex((l:any) => l.id === id)
        console.log(index);
        list.splice(index, 1)
        const db = getFirestore()
        const notifyRef = doc(db, "users", `${userCtx.data.uid}`);
        await updateDoc(notifyRef, {
            notifications: list
        })
    }
    useEffect(() => {
        addNotifications(userCtx.data.notifications)
    },[])
    return (
        <div className={notifyStyles.wrapper}>
            <div className={notifyStyles.actView}>
                <p className={notifyStyles.top}>Notifications</p>
                <div className={notifyStyles.notifications}>
                    {notifications.length > 0 ?
                    <div className={notifyStyles.notificationsList}>
                        {notifications.map((notify:any) => {
                        return (
                            <div className={notifyStyles.notification} key={notify.id}>
                                <div>
                                    <FaCircle/> {notify.content}
                                </div>
                                <div className={notifyStyles.bottomNotify}>
                                    <p>From {notify.from}</p>
                                    <button onClick={() => readNotify(notify.id)} className={notifyStyles.btn}>Mark as read</button>
                                </div>
                            </div>
                        )})}
                    </div>
                    : 'You dont have any notifications'}
                </div>
                <p className={notifyStyles.bottom}>View all</p>
            </div>
        </div>
    )
}

export default NotificationsView;