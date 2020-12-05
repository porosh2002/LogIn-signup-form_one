import React from 'react'
import {SearchBar,SearchButton} from '../../Styled';
import { FaSearch} from "react-icons/fa";

function Search() {
    return (
        <div style={{display:"flex"}}>
        <SearchBar />
        <SearchButton>{<FaSearch />}</SearchButton>
        </div>
    )
}

export default Search



