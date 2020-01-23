import React from 'react';
import DictionaryColumn from "./DictionaryColumn";
import {DictionaryContext} from "../../../Context/DictionaryContext";
import './index.css';

class DictionaryTable extends React.Component {
    static contextType = DictionaryContext;

    constructor(props) {
        super(props);
        const { from, to, data } = props;
        const langs = Object.keys(data);
        const idx = langs.indexOf(to);
        const start = idx - 3 < 0 ? 0 : idx - 3;
        const end = idx + 10 > langs.length ? langs.length : idx + 10;
        const toLangs = langs.slice(start, end);
        this.state = { from, to, toLangs, data, fromCols: {}, toCols: {}, colWords: {}, deleted: [] };
        this.toColumn = React.createRef();
    }

    buildCols() {
        const {from, to, toLangs, data} = this.state;
        const targetLangs = from.concat(toLangs);
        const colWords = {};
        const concepts = data[to] ? Object.keys(data[to]) : [];
        for (let i = 0; i < concepts.length; i++) {
            const concept = concepts[i];
            for (let j = 0; j < targetLangs.length; j++) {
                const lang = targetLangs[j];
                if (!(lang in colWords)) {
                    colWords[lang] = [];
                }
                colWords[lang].push(data[lang][concept]);
            }
        }
        return colWords;
    }

    findConcept(search) {
        const { from, toLangs, data } = this.state;
        const langs = from.concat(toLangs);
        for (let i = 0; i < langs.length; i++) {
            const concepts = Object.keys(data[langs[i]]);
            for (let j = 0; j < concepts.length; j++) {
                const words = data[langs[i]][concepts[j]];
                for (let k = 0; k < words.length; k++) {
                    const word = words[k];
                    if (word.includes(search)) {
                        return words.toString();
                    }
                }
            }
        }
        return "";
    }

    componentWillReceiveProps(nextProps) {
        const { from, to } = nextProps;
        const { data, deleted } = this.state;
        const { search: oldSearch } = this.props;
        const { search } = nextProps;
        if (oldSearch !== search) {
            window.find(search);
            const concepts = this.findConcept(search);
            if (concepts) {
                document.getElementById(concepts).scrollIntoView();
            } 
            return;
        }
        const langs = Object.keys(data);
        const idx = langs.indexOf(to);
        const start = idx - 3 < 0 ? 0 : idx - 3;
        const end = idx + 10 > langs.length ? langs.length : idx + 10;
        const toLangs = langs.slice(start, end);
        const newToLangs = [];
        for (let i = 0; i < toLangs.length; i++) {
            if (from.indexOf(toLangs[i]) < 0 && deleted.indexOf(toLangs[i]) < 0) {
               newToLangs.push(toLangs[i]);
           }
       }
       this.setState({ from, to, toLangs: newToLangs });
    }

    render() {
        const colWords = this.buildCols();
        const { from, to, toLangs, deleted } = this.state;
        const { langMap } = this.context;
        const fromCols = [];
        const toCols = [];
        Object.keys(colWords).forEach(lang => {
            let col;
            if (from.indexOf(lang) >= 0) {
                col = <DictionaryColumn colName={langMap[lang]} data={colWords[lang]} code={lang} onDelete={() => {
                    from.splice(from.indexOf(lang), 1);
                    this.setState({ from });
                }
                }/>;
                fromCols.push(col);
            } else {
                col = <DictionaryColumn colName={langMap[lang]} data={colWords[lang]} code={lang} selected={lang === to} onDelete={() => {
                    deleted.push(lang);
                    toLangs.splice(toLangs.indexOf(lang), 1);
                    this.setState({ toLangs });
                }
                }/>;
                toCols.push(col);
            }
        });
        return (
            <div id="table" className="dictionaryTable">
                <table className="pinnedTable">
                    {fromCols}
                </table>
                <div className="tableWithScroll">
                    <table className="table">
                        {toCols}
                    </table>
                </div>
            </div>
        )
    }
}

DictionaryTable.defaultProps = {
    data: {},
    languages: []
};

export default DictionaryTable;