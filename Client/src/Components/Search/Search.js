import React, { PureComponent } from 'react'
import {SearchBar,SearchButton} from '../../Styled';
import { FaSearch} from "react-icons/fa";
export class Search extends PureComponent {
    render() {
        return (
            <div style={{display:"flex"}}>
            <SearchBar />
            <SearchButton>{<FaSearch />}</SearchButton>
            </div>
                
        )
    }
}

export default Search

