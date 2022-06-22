import { getFirestore, query, collection, where, getDocs} from 'firebase/firestore';
export const getUserTweets = async (username) => {
    const db = getFirestore()
    const postRef = collection(db, "posts")
    const q = query(postRef, where("creator.username", "==", username))
    const querySnapshot = await getDocs(q)
    let data = []
    querySnapshot.forEach((doc) => {
        data.push(doc.data())
    })
    return await data
}