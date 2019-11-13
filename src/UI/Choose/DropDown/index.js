import React, {useRef, useEffect, useState} from 'react';
import './index.css';

const DropDown = (props) => {
    const {list, onChange, onClose} = props;
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
            <img src={l.flag} alt="flag"/>
            <div className="name">
                {l.nativeName}
            </div>
        </li>
    );

    return (
        <div className="dropdown" ref={window}>
            <ul className="choices">{items}</ul>
        </div>
    )
};

export default DropDown;