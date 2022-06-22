import { getFirestore, query, collection, where, getDocs} from 'firebase/firestore';
export const getUserRetweets = async (username) => {
    const db = getFirestore()
    const userRef = collection(db, "users")
    const qUser = query(userRef, where("username", "==", username))
    const queryUserSnapshot = await getDocs(qUser)
    let data = []
    queryUserSnapshot.forEach((doc) => {
        data.push(doc.data())
    })
    let retweetsId = []
    data.forEach((doc) => {
        retweetsId.push(doc.retweets)
    })
    let posts = []
    await Promise.all(retweetsId[0].map(async(id) => {
        const postRef = collection(db, "posts")
        const qPost = query(postRef, where("metaData.postId", "==", id))
        const queryPostSnapshot = await getDocs(qPost)
        queryPostSnapshot.forEach((doc) => {
            posts.push(doc.data())
        })
    }))
    return posts
}