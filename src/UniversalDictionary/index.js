import React, { useState, useEffect } from 'react';
import UDRouter from "./UDRouter";
import {UserContext} from "../Context/UserContext";


const UniversalDictionary = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!!storedUser) {
            setUser(storedUser);
        }
    }, []);
    return (
        <UserContext.Provider value={{user, setUser, name: "context"}}>
            <UDRouter/>
        </UserContext.Provider>
    )
};

export default UniversalDictionary;