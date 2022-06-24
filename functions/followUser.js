import { getFirestore, doc, getDocs, updateDoc, collection, query, where} from 'firebase/firestore'
import {sendNotify} from './sendNotify.js'
export const followUser = async (username, id, followedUsers, yourUsername) => {
    console.log('follow')
    const db = getFirestore()
    const userRef = doc(db, "users", `${id}`);
    const following = followedUsers
    if(following.includes(username)) {
        let index = following.indexOf(username)
        following.splice(index, 1)
    } else {
        following.push(username)
    }
    await updateDoc(userRef, {
        following: following
    });
    const followedRef = collection(db, "users");
    const q = query(followedRef, where("username", "==", `${username}`))
    const querySnapshot = await getDocs(q)
    let data;
    querySnapshot.forEach((doc) => {
        data = doc.data()
    }); 
    const followers = data.followers 
    const targetUID = data.uid
    followers.push(yourUsername)
    const targetRef = doc(db, "users", `${targetUID}`);
    updateDoc(targetRef, {
        followers: followers
    })
    sendNotify(targetUID, yourUsername, `${yourUsername}, follow you!`, 'follow')
}