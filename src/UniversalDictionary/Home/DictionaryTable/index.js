import React from 'react';
import DictionaryColumn from "./DictionaryColumn";
import './index.css';

const DictionaryTable = (props) => {
    const { data } = props;
    const cols = Object.keys(data).map(key => <DictionaryColumn colName={key} data={data[key]}/>);
    return (
        <table className="table">
            {cols}
        </table>
    )
};

DictionaryTable.defaultProps = {
    data: {
        English: ['word1', 'word2', 'word3', 'word4'],
        Turkish: ['word1', 'word2', 'word3', 'word4'],
    }
};

export default DictionaryTable;