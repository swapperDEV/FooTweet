import React, {useContext, useRef} from 'react'
import homeStyles from './home.module.scss'
import CreatePost from './CreatePost'
import Posts from './Posts'
const Home = (props:any) => {

    const {actView} = props
    return (
        <div className={homeStyles.wrapper}>
            <p className={homeStyles.actView}>{actView}</p>
            <CreatePost/>
            <Posts/>
        </div>
    )
}

export default Home;