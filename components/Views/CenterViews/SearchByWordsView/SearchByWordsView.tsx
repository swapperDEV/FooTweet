import React from 'react'
import SearchByWords from './SearchByWords'
import viewStyles from '../../styles/view.module.scss'
const SearchByWordsView = () => {
    return (
        <>
            <div className={viewStyles.posts}>
                <SearchByWords/>
            </div>
        </>
    )
}
export default SearchByWordsView;