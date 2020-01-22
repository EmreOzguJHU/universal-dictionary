import NavBar from "../../UI/NavBar";
import React, { useState, useContext } from 'react';
import DictionaryTable from "./DictionaryTable";
import './index.css'
import apiConnect from "../../Helpers/apiConnect";
import {DictionaryContext} from "../../Context/DictionaryContext";

const propsToCalls = {
    languages: 'https://restcountries.eu/rest/v2/all',
};

const Home = ({ languages }) => {
    const [from, setFrom] = useState([]);
    const [search, setSearch] = useState("");
    const {user: { lang }} = useContext(DictionaryContext);
    const [to, setTo] = useState(lang);
    const { langs } = useContext(DictionaryContext);
    return (
        <div className="homepage">
            <NavBar choices={languages} from={from} setFrom={setFrom} setTo={setTo} setSearchWord={setSearch}/>
            <DictionaryTable languages={languages} from={from} to={to} data={langs} search={search}/>
        </div>
    );
};

Home.defaultProps = {
    languages: [],
};

export default apiConnect(propsToCalls)(Home);
