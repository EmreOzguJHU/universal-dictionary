import React, { useState } from 'react';
import searchIcon from "../../Consts/search.svg"
import './index.css'

const SearchBar = (props) => {
    const [search, setSearch] = useState("");
    const { setSearchWord } = props;
    return (
        <div className="searchBar" {...props}>
            <input
                name="username"
                type="text"
                value={search}
                onChange={target => {
                    const word = target.target.value;
                    setSearch(word);
                }}
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                        setSearchWord(search);
                    }
                }}
            />
            <img src={searchIcon} alt="search" onClick={() => setSearchWord(search)}/>
        </div>
    );
};

export default SearchBar;