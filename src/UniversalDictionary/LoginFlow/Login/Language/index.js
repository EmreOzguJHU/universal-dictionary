import React, { useState } from 'react';
import apiConnect from "../../../../Helpers/apiConnect";
import DropDown from "../../../../UI/DropDown";
import './index.css'
import Button from "../../../../UI/Button";

const propsToCalls = {
    languages: 'https://restcountries.eu/rest/v2/all',
};

const Language = ({languages, onClick}) => {
    const [lang, setLang] = useState({});
    return (
        <div className="language">
            {!!lang.flag &&
                <div className="choice">
                    <img className="flagName" src={lang.flag} alt="flag"/>
                    <div className="lang-name">
                        {lang.name}
                    </div>
                </div>
            }
            <DropDown className="drop" list={languages} onChange={(l) => setLang(l)}/>
            <Button className="button" text="Next" disabled={!lang.flag} onClick={() => onClick(lang)}/>
        </div>
    );
};

Language.defaultProps = {
    languages: [],
};

export default apiConnect(propsToCalls)(Language)