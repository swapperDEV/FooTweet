import React from 'react'
import searchStyles from './searchwords.module.scss'
import Posts from '../../../Posts/Posts';
import { useRouter } from 'next/router';
const SearchByWords = () => {
    const path = useRouter()
    console.log(path);
    return (
    <div className={searchStyles.wrapper}>
        <div className={searchStyles.content}>
            <Posts requirements={path.query.search} requirementsType="words"/>
        </div>
    </div>
    )
}
export default SearchByWords;