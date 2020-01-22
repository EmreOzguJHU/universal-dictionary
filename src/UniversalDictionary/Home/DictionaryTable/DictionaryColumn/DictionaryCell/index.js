import React, {useState} from 'react';
import './index.css';

const DictionaryCell = ({ data, edit, onEdit }) => {
    const [content, setContent] = useState(data);
    return (
        <td id={data.toString()} className="cell">
            <input
                className="word-input"
                name="data"
                type="text"
                value={content}
                onChange={({ target: input }) => {
                    setContent(input.value);
                    onEdit(input.value);
                }}
                disabled={edit ? "" : "true"}/>
        </td>
    )
};

export default DictionaryCell;