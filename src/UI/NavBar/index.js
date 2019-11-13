import React, {useContext, useState} from 'react';
import {profilePath} from "../../Consts/paths";
import {Link} from "react-router-dom";
import {UserContext} from "../../Context/UserContext";
import './index.css'
import DropDown from "../Choose/DropDown";
import CircleIcon from "../CircleIcon";
import logo from "../../Consts/overflow.svg"
import arrow from "../../Consts/longarrow.png"
import SearchBar from "../SearchBar";
import avatar from "../../Consts/avatar.svg"

const NavBar = ({ choices, from, setFrom }) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const fromIcons = from.map((l) => (
        <li>
            <CircleIcon src={l.flag}/>
        </li>
    ));
    const {user} = useContext(UserContext);
    return (
        <div>
            <div className="navbar">
                <ul className="items">
                    <li>
                        <ul className="froms">
                            {fromIcons}
                        </ul>
                    </li>
                    <li>
                        <CircleIcon src={logo} onClick={() => setShowDropDown(true)}/>
                    </li>
                    <li>
                        <img src={arrow} alt="arrow" className="arrow"/>
                    </li>
                    <li>
                        <CircleIcon src={user.lang.flag}/>
                    </li>
                    <li className="search">
                        <SearchBar/>
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
            <DropDown list={choices} onClose={() => setShowDropDown(false)} onChange={(l) => {
                const newFrom = from.slice();
                newFrom.push(l);
                setFrom(newFrom);
            }}/>
            }
        </div>
    )
};

export default NavBar;