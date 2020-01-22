import React, { useState, useContext } from 'react';
import apiConnect from "../../../../Helpers/apiConnect";
import './index.css'
import Button from "../../../../UI/Button";
import Choose from "../../../../UI/Choose";
import arrow from "../../../../Consts/rightarrow.svg"
import flag from "../../../../Consts/flag.svg"
import {DictionaryContext} from "../../../../Context/DictionaryContext";


const propsToCalls = {
    languages: 'https://restcountries.eu/rest/v2/all',
};

const Language = ({languages, onClick}) => {
    const [lang, setLang] = useState();
    const { langMap } = useContext(DictionaryContext);
    return (
        <div className="language">
            {!!lang &&
                <div className="choice">
                    <div className="lang-name">
                        {langMap[lang]}
                    </div>
                </div>
            }

            <Choose image={flag} onChange={(l) => setLang(l)}/>
            <Button className="button" image={arrow} disabled={!lang} onClick={() => onClick(lang)}/>
        </div>
    );
};

Language.defaultProps = {
    languages: [],
};

export default apiConnect(propsToCalls)(Language)