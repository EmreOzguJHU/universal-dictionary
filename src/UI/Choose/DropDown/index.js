import React, {useRef, useEffect, useContext} from 'react';
import './index.css';
import {DictionaryContext} from "../../../Context/DictionaryContext";

const DropDown = (props) => {
    const { onChange, onClose, name, data } = props;
    let list;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { langs } = useContext(DictionaryContext);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { langMap } = useContext(DictionaryContext);
    if (data) {
        list = data;
    } else {
        list = Object.keys(langs).filter(lang => langMap[lang]);
        list.sort((a, b) => langMap[a].localeCompare(langMap[b]));
    }
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
            if (!data) {
                onClose();
                onChange(l)
            }
        }}>
            <div className="name">
                {data ? l : langMap[l]}
            </div>
        </li>
    );

    return (
        <div className={"dropdown" + (name ? " " + name : "")} ref={window}>
            <ul className="choices">{items}</ul>
        </div>
    )
};

DropDown.defaultProps = {
    data: null,
};

export default DropDown;