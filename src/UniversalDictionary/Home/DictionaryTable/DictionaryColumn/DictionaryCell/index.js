import React from 'react';
import './index.css';

const DictionaryCell = ({ data }) => {
    return (
        <td className="cell">
            {data}
        </td>
    )
};

export default DictionaryCell;