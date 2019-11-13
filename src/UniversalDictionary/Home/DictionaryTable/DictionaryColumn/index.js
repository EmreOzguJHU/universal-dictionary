import React, { useEffect } from 'react';
import './index.css'
import DictionaryCell from "./DictionaryCell";
import close from '../../../../Consts/close.svg'

const DictionaryColumn = (props) => {
    const {colName, data, setRef, onDelete} = props;
    const rows = data.map(d => <DictionaryCell data={d}/>);
    useEffect(() => {
        if (setRef) {
            window.scrollTo({ left: setRef.current.offsetLeft, behavior: 'smooth'})
        }
    }, []);
    return (
        <tr className="column" ref={setRef}>
            <td className="colHeader">
                <div>
                    {colName}
                    <img src={close} onClick={onDelete} alt="exit"/>
                </div>
            </td>
            {rows}
        </tr>
    )
};

DictionaryColumn.defaultProps = {
    onDelete: () => {},
};

export default DictionaryColumn;