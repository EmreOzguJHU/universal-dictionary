import React, {useRef, useEffect, useState} from 'react';
import './index.css';

const DropDown = (props) => {
    const { list, title, onChange } = props;
    const window = useRef();
    const [show, setShow] = useState(false);
    const outsideClick = e => {
        if (!window.current.contains(e.target)) {
            setShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", outsideClick);
        return () => document.removeEventListener("mousedown", outsideClick);
    }, []);
    const items = list.map(l =>
        <li onClick={() => {
            setShow(false);
            onChange(l)
        }}>
            <img src={l.flag} alt="flag"/>
            <div className="lang-name">
                {l.name}
            </div>
        </li>
    );

    return (
        <div ref={window} {...props}>
            <div className="menu" onClick={() => setShow(!show)}>
                {title}
            </div>
            {show &&
                <div className="dropdown">
                    <ul className="choices">{items}</ul>
                </div>}
        </div>
    )
};

DropDown.defaultProps = {
    title: "Choose",
};

export default DropDown;