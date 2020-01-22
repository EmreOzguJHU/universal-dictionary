import React, {useContext, useState} from 'react';
import {profilePath} from "../../Consts/paths";
import {Link} from "react-router-dom";
import {DictionaryContext} from "../../Context/DictionaryContext";
import './index.css'
import DropDown from "../Choose/DropDown";
import CircleIcon from "../CircleIcon";
import logo from "../../Consts/overflow.svg"
import arrow from "../../Consts/longarrow.png"
import SearchBar from "../SearchBar";
import avatar from "../../Consts/avatar.svg"

const NavBar = ({ choices, from, setFrom, setTo, setSearchWord }) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [showTo, setShowTo] = useState(false);
    // const fromIcons = from.map((l) => (
    //     <li>
    //         <CircleIcon src={l.flag}/>
    //     </li>
    // ));
    const {user, langMap, setUser} = useContext(DictionaryContext);
    return (
        <div>
            <div className="navbar">
                <ul className="items">
                    <li>
                        <ul className="froms">
                            {}
                        </ul>
                    </li>
                    <li>
                        <CircleIcon src={logo} onClick={() => setShowDropDown(true)}/>
                    </li>
                    <li>
                        <img src={arrow} alt="arrow" className="arrow"/>
                    </li>
                    <li>
                        <div className="to" onClick={() => setShowTo(true)}>
                            {langMap[user.lang]}
                        </div>
                    </li>
                    <li className="search">
                        <SearchBar setSearchWord={setSearchWord}/>
                    </li>
                    <li className="user">
                        {user.username}
                    </li>
                    <li className="profile">
                        <Link to={profilePath}>
                            <CircleIcon src={avatar}/>
                        </Link>
                    </li>
                </ul>
            </div>
            {showDropDown &&
            <DropDown onClose={() => setShowDropDown(false)} onChange={(l) => {
                const newFrom = from.slice();
                newFrom.push(l);
                setFrom(newFrom);
            }}/>}
            {showTo &&
                <DropDown name="to" onClose={() => setShowTo(false)} onChange={(l) => {
                user.lang = l;
                setUser(user);
                setTo(l);
            }}/>}
            }
        </div>
    )
};

export default NavBar;