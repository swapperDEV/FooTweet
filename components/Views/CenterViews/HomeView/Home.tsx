import React, {useContext, useRef} from 'react'
import homeStyles from './home.module.scss'
import CreatePost from './CreatePost/CreatePost'
import Posts from '../../../Posts/Posts'
const Home = () => {
    return (
        <div className={homeStyles.wrapper}>
            <div className={homeStyles.content}>
                <CreatePost/>
                <Posts/>
            </div>
        </div>
    )
}

export default Home;