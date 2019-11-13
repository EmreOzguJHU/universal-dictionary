import React, {useState} from 'react';
import DropDown from "./DropDown";
import './index.css'

const Choose = (props) => {
    const {image, list, onChange} = props;
    const [show, setShow] = useState();
    return (
        <div>
            <div className="choose">
                <img className="chooseimg" src={image} alt="choose" onClick={() => setShow(true)}/>
                {show &&
                <DropDown list={list} onChange={onChange} onClose={() => setShow(false)}/>
                }
            </div>
        </div>
    )
};


export default Choose;