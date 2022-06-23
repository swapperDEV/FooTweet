import { getFirestore, doc, getDoc, updateDoc} from 'firebase/firestore'
export const unfollowUser = async (username, uid, table, yourid, yourUsername) => {
    const users = table
    let index = users.indexOf(username)
    users.splice(index, 1)
    const db = getFirestore()
    const userRef = doc(db, "users", yourid);
    const followingUserRef = doc(db, "users", uid);
    await updateDoc(userRef, {
        following: users
    })
    let snap = await getDoc(userRef)
    if(snap.exists()) {
        const data = snap.data()
        const {followers} = data
        let index = followers.indexOf(yourUsername)
        followers.splice(index, 1)
        await updateDoc(followingUserRef, {
            followers: followers
        })
    }
    return await users
}