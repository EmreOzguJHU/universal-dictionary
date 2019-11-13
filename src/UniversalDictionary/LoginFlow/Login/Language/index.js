import React, { useState } from 'react';
import apiConnect from "../../../../Helpers/apiConnect";
import './index.css'
import Button from "../../../../UI/Button";
import Choose from "../../../../UI/Choose";
import arrow from "../../../../Consts/rightarrow.svg"
import flag from "../../../../Consts/flag.svg"


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

            <Choose list={languages} image={flag} onChange={(l) => setLang(l)}/>
            <Button className="button" image={arrow} disabled={!lang.flag} onClick={() => onClick(lang)}/>
        </div>
    );
};

Language.defaultProps = {
    languages: [],
};

export default apiConnect(propsToCalls)(Language)