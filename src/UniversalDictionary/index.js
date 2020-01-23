import React, { useState, useEffect } from 'react';
import UDRouter from "./UDRouter";
import {DictionaryContext} from "../Context/DictionaryContext";
import { tsv } from 'd3';
import find from 'lang-codes'

const UniversalDictionary = () => {
    const [user, setUser] = useState(null);
    const setUserContext = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };
    const [data, setData] = useState();
    const setDataContext = (data) => {
        localStorage.setItem('langs', JSON.stringify(data));
        setData(data);
    };

    const [langMap, setMap] = useState();
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        let langs = JSON.parse(localStorage.getItem('langs'));
        let codes = JSON.parse(localStorage.getItem('codes'));
        if (!langs || Object.keys(langs).length === 0) {
            codes = {};
            langs = {};
            tsv('autonyms.tsv', (row) => {
               codes[row.tag3] = row.autonym || row.name;
            }).then(() => {
                tsv('swadesh.tsv', (row) => {
                    if (!(row.cod in langs)) {
                        langs[row.cod] = {};
                        const lang = find(row.cod);
                        if (lang.length) {
                            codes[row.cod] = lang.local;
                        }
                    }
                    if (!(row.con in langs[row.cod])) {
                        langs[row.cod][row.con] = [];
                    }
                    langs[row.cod][row.con].push(row.wor);
                }).then(() => {
                    localStorage.setItem('langs', JSON.stringify(langs));
                    localStorage.setItem('codes', JSON.stringify(codes));
                    setData(langs);
                    setMap(codes);
                })
            });
        } else {
           setData(langs);
           setMap(codes);
        }
        if (!!storedUser) {
            setUser(storedUser);
        }
    }, []);
    return (
        <DictionaryContext.Provider value={{user, setUser: setUserContext, name: "context", langs: data, setLangs: setDataContext, langMap}}>
            <UDRouter/>
        </DictionaryContext.Provider>
    )
};

export default UniversalDictionary;