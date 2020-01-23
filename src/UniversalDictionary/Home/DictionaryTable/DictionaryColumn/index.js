import React, { useEffect, useContext } from 'react';
import './index.css';
import DictionaryCell from "./DictionaryCell";
import close from '../../../../Consts/close.svg';
import edit from '../../../../Consts/edit.svg';
import {DictionaryContext} from "../../../../Context/DictionaryContext";

const DictionaryColumn = (props) => {
    const {colName, data, setRef, onDelete, selected, code} = props;
    const { langs, setLangs } = useContext(DictionaryContext);
    const concepts = Object.keys(langs[code]);
    const rows = data.map((d, i) => <DictionaryCell edit={selected} data={d} onEdit={(word) => {
        langs[code][concepts[i]] = [word];
        setLangs(langs);
    }
    }/>);
    useEffect(() => {
        if (setRef) {
            window.scrollTo({ left: setRef.current.offsetLeft, behavior: 'smooth'})
        }
    }, []);
    return (
        <tr className={"column" + (selected ? " selected" : "")} ref={setRef} key={colName}>
            <td className="colHeader">
                <div>
                    <input
                        className="header"
                        name="data"
                        type="text"
                        value={colName}
                        disabled="true"/>
                    {!selected ?
                        <img src={close} onClick={onDelete} alt="exit"/>
                        :
                        <img src={edit} alt="edit"/>
                    }
                </div>
            </td>
            {rows}
        </tr>
    )
};

DictionaryColumn.defaultProps = {
    onDelete: () => {},
    selected: false,
};

export default DictionaryColumn;