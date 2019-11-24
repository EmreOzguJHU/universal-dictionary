import React, { useEffect } from 'react';
import './index.css';
import DictionaryCell from "./DictionaryCell";
import close from '../../../../Consts/close.svg';
import edit from '../../../../Consts/edit.svg';

const DictionaryColumn = (props) => {
    const {colName, data, setRef, onDelete, selected} = props;
    const rows = data.map(d => <DictionaryCell edit={selected} data={d}/>);
    useEffect(() => {
        if (setRef) {
            window.scrollTo({ left: setRef.current.offsetLeft, behavior: 'smooth'})
        }
    }, []);
    return (
        <tr className={"column" + (selected ? " selected" : "")} ref={setRef}>
            <td className="colHeader">
                <div>
                    {colName}
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