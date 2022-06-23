import { getFirestore, doc, getDoc} from 'firebase/firestore';
export const getUsername = async (uID) => {
    const db = getFirestore();
    const userRef = doc(db, "users", `${uID}`);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        let data = userSnap.data()
        return await data.username
    }
}