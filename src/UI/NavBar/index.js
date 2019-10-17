import React, {useContext, useState} from 'react';
import {profilePath} from "../../Consts/paths";
import {Link} from "react-router-dom";
import {UserContext} from "../../Context/UserContext";
import './index.css'
import DropDown from "../DropDown";

const NavBar = ({ children }) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const {user} = useContext(UserContext);
    return (
        <div>
            <div className="navbar">
                <ul className="items">
                    <li>
                        <img src={user.lang.flag} alt="flag"/>
                    </li>
                    <li onClick={() => setShowDropDown(true)}>
                        From
                        {showDropDown &&
                            <DropDown onClose={() => setShowDropDown(false)}/>
                        }
                    </li>
                    <li>
                        To
                    </li>
                    <li className="user">
                        User: {user.username}
                    </li>
                    <li>
                        <Link to={profilePath}> Profile </Link>
                    </li>
                </ul>
            </div>
            {children}
        </div>
    )
};

export default NavBar;