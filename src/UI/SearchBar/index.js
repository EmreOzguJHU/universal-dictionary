import React, { useState } from 'react';
import searchIcon from "../../Consts/search.svg"
import './index.css'

const SearchBar = (props) => {
    const [search, setSearch] = useState("");
    return (
        <div className="searchBar" {...props}>
            <input
                name="username"
                type="text"
                value={search}
                onChange={({target: { input: value }}) => setSearch(value)}
            />
            <img src={searchIcon} alt="search"/>
        </div>
    );
};

export default SearchBar;