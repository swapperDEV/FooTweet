import { getFirestore, query, collection, where, getDocs} from 'firebase/firestore';
export const getUserData = async (username) => {
    const db = getFirestore()
    const dataRef = collection(db, "users")
    const q = query(dataRef, where("username", "==", username))
    const querySnapshot = await getDocs(q)
    let data = []
    querySnapshot.forEach((doc) => {
        data.push(doc.data())
    })
    return await data
}