import React from 'react';
import DictionaryColumn from "./DictionaryColumn";
import {DictionaryContext} from "../../../Context/DictionaryContext";
import './index.css';

class DictionaryTable extends React.Component {
    static contextType = DictionaryContext;

    constructor(props) {
        super(props);
        // const { from, to, languages } = props;
        // const data = fakeData(languages);
        // const fromNames = from.map(l => l.nativeName);
        // const fromCols = [];
        // const toCols = [];
        // Object.keys(data).forEach(key => {
        //     let col = <DictionaryColumn colName={key} data={data[key]} onDelete={() => {
        //         delete data[key];
        //         this.setState({ data });
        //     }
        //     }/>;
        //     if (key === to.nativeName) {
        //         col = <DictionaryColumn colName={key} selected={true} setRef={this.toColumn} data={data[key]} />
        //     }
        //     if (fromNames.includes(key)) {
        //         fromCols.push(col);
        //     } else {
        //         toCols.push(col);
        //     }
        // });
        // this.state = { data, fromCols, toCols };
        const { from, to, data } = props;
        const langs = Object.keys(data);
        const idx = langs.indexOf(to);
        const start = idx - 3 < 0 ? 0 : idx - 3;
        const end = idx + 10 > langs.length ? langs.length : idx + 10;
        const toLangs = langs.slice(start, end);
        this.state = { from, to, toLangs, data, fromCols: {}, toCols: {}, colWords: {} };
        this.toColumn = React.createRef();
    }

    buildCols() {
        const {from, to, toLangs, data} = this.state;
        const targetLangs = from.concat(toLangs);
        const colWords = {};
        const concepts = data[to] ? Object.keys(data[to]) : [];
        for (let i = 0; i < concepts.length; i++) {
            const concept = concepts[i];
            // let maxWords = 0;
            // for (let j = 0; j < from.length; j++) {
            //     if (data[from][concept].length > maxWords) {
            //         maxWords = data[from][concept].length;
            //     }
            // }
            // maxWords = maxWords || data[to][concept].length;
            for (let j = 0; j < targetLangs.length; j++) {
                const lang = targetLangs[j];
                if (!(lang in colWords)) {
                    colWords[lang] = [];
                }
                colWords[lang].push(data[lang][concept]);
                // if (data[lang][concept].length < maxWords) {
                //     colWords[lang].push(data[lang][concept].concat(Array(maxWords - data[lang][concept].length).fill(data[lang[concept[0]]])));
                // } else {
                //     colWords[lang].push(data[lang][concept].slice(0, maxWords));
                // }
            }
        }
        return colWords;
    }


    // componentDidMount() {
    //     const data = {};
    //     const seen = {};
    //     tsv('swadesh.tsv', (row) => {
    //         if (!(row.cod in data)) {
    //             data[row.cod] = [];
    //             seen[row.cod] = {};
    //         }
    //         if (data[row.cod].length < 100 && !seen[row.cod][row.con]) {
    //             data[row.cod].push(row.wor);
    //             seen[row.cod][row.con] = true;
    //         }
    //     }).then(() => this.setState({ data: data}));
    // }

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
        const { data } = this.state;
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
            if (from.indexOf(toLangs[i]) < 0) {
               newToLangs.push(toLangs[i]);
           }
       }
       this.setState({ from, to, toLangs: newToLangs });
    }

    render() {
        /*
        const { from, to, languages } = this.props;
        const { data } = this.state;
        // const fromNames = from.map(l => l.nativeName);
        const fromCols = [];
        const toCols = [];
        // Object.keys(data).forEach(key => {
        //     let col = <DictionaryColumn colName={key} data={data[key]} onDelete={() => {
        //         delete data[key];
        //         this.setState({ data });
        //     }
        //     }/>;
        //     if (key === to.nativeName) {
        //         col = <DictionaryColumn colName={key} selected={true} setRef={this.toColumn} data={data[key]} />
        //     }
        //     if (fromNames.includes(key)) {
        //         fromCols.push(col);
        //     } else {
        //         toCols.push(col);
        //     }
        // });
        const seen = {};
        from.forEach(country => {
           if (country.languages) {
               country.languages.forEach(lang => {
                   if (data[lang.iso639_2]) {
                       let col = <DictionaryColumn colName={lang.nativeName} data={data[lang.iso639_2].slice(52)} onDelete={() => {
                           // delete data[key];
                           // this.setState({data});
                       }
                       }/>;
                       fromCols.push(col);
                       seen[lang.iso639_2] = true;
                   }
               })
           }
        });
        const toName = to.languages[0].nativeName;
        languages.forEach(l => {
           l.languages.forEach(lang => {
               if (lang.name !== "English" && !seen[lang.iso639_2] && data[lang.iso639_2]) {
                   let col = <DictionaryColumn colName={lang.nativeName} data={data[lang.iso639_2].slice(52)} onDelete={() => {
                       delete data[lang.iso639_2];
                       this.setState({data});
                   }
                   }/>;
                   // if (lang.nativeName === toName) {
                   //     col = <DictionaryColumn colName={lang.nativeName} selected={true} setRef={this.toColumn} data={data[lang.iso639_2]} />
                   // }
                   toCols.push(col);
                   seen[lang.iso639_2] = true;
               }
           })
        });
        if ('tuq' in data) {
            const col = <DictionaryColumn colName={"Tedaga"} selected={true} setRef={this.toColumn} data={data['tuq'].slice(52)}/>
            toCols.splice(7, 0, col);
        }
         */
        const colWords = this.buildCols();
        const { from, to, toLangs } = this.state;
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