import React, {useRef, useEffect, useContext} from 'react';
import './index.css';
import {DictionaryContext} from "../../../Context/DictionaryContext";

const DropDown = (props) => {
    const { langs } = useContext(DictionaryContext);
    const { langMap } = useContext(DictionaryContext);
    const list = Object.keys(langs).filter(lang => langMap[lang]);
    list.sort((a, b) => langMap[a].localeCompare(langMap[b]));
    const { onChange, onClose, name } = props;
    const window = useRef();
    const outsideClick = e => {
        if (!window.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", outsideClick);
        return () => document.removeEventListener("mousedown", outsideClick);
    }, []);
    const items = list.map(l =>
        <li onClick={() => {
            onClose();
            onChange(l)
        }}>
            <div className="name">
                {langMap[l]}
            </div>
        </li>
    );

    return (
        <div className={"dropdown" + (name ? " " + name : "")} ref={window}>
            <ul className="choices">{items}</ul>
        </div>
    )
};

export default DropDown;