import React, {useState} from 'react';
import './index.css';

const DictionaryCell = ({ data, edit }) => {
    const [content, setContent] = useState(data);
    return (
        <td className="cell">
            <input
                className="word-input"
                name="data"
                type="text"
                value={content}
                onChange={({ target: input }) => setContent(input.value)}
                disabled={edit ? "" : "true"}/>
        </td>
    )
};

export default DictionaryCell;