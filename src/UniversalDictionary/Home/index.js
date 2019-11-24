import NavBar from "../../UI/NavBar";
import React, { useState, useContext } from 'react';
import DictionaryTable from "./DictionaryTable";
import './index.css'
import apiConnect from "../../Helpers/apiConnect";
import {UserContext} from "../../Context/UserContext";

const propsToCalls = {
    languages: 'https://restcountries.eu/rest/v2/all',
};

const Home = ({ languages }) => {
    const [from, setFrom] = useState([]);
    const [search, setSearch] = useState("");
    const {user: { lang} } = useContext(UserContext);
    return (
        <div className="homepage">
            <NavBar choices={languages} from={from} setFrom={setFrom}/>
            <DictionaryTable languages={languages} from={from} to={lang}/>
        </div>
    );
};

Home.defaultProps = {
    languages: [],
};

export default apiConnect(propsToCalls)(Home);
