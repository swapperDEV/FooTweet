import { getFirestore, doc, getDocs, updateDoc, collection, query, where, getDoc} from 'firebase/firestore'
import { getDate } from './getDate';
export const sendNotify = async (target, from, content, type) => {
    const db = getFirestore()
    const userRef = doc(db, "users", `${target}`);
    const userSnap = await getDoc(userRef)
    if(userSnap.exists()) {
        const data = userSnap.data()
        const notifyList = data.notifications
        notifyList.unshift({
            type: type,
            content: content,
            from: from,
            id: `${getDate()}${target}`, 
        })
        await updateDoc(userRef, {
           notifications: notifyList
        }) 
    }
}