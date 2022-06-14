import React from 'react'
import searchStyles from './searchwords.module.scss'
import Posts from '../HomeView/Posts/Posts';
import { useRouter } from 'next/router';
import { Fade } from 'react-awesome-reveal'
const SearchByWords = () => {
    const path = useRouter()
    console.log(path);
    return (
        <Fade>
        <div className={searchStyles.wrapper}>
            <div className={searchStyles.content}>
                <Posts requirements={path.query.search} requirementsType="words"/>
            </div>
        </div>
        </Fade>
    )
}
export default SearchByWords;