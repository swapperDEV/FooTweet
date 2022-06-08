import { FirebaseContext } from '../store/firebase-context';
import { useContext } from 'react';
import Navigate from './Navigate'
const PrivateRoute = (props) => {
    const FirebaseCtx = useContext(FirebaseContext)
    const { currentUser } = FirebaseCtx
    return currentUser ? props.children : <Navigate/>;
};
export default PrivateRoute;