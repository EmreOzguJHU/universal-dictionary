import React from 'react';
import './index.css'

const DictionaryColumn = (props) => {
    const { colName, data } = props;
    const rows = data.map(d => (
        <td className="row">
            {d}
        </td>
    ));

    return (
        <tr className="column">
            <td className="colHeader">
                {colName}
            </td>
            {rows}
        </tr>
    )
};

export default DictionaryColumn;