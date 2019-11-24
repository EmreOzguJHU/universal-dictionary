import React from 'react';
import DictionaryColumn from "./DictionaryColumn";
import './index.css';

const fakeData = (langs) => {
    const data = {};
    langs.forEach((l) => {
        data[l.nativeName] = [];
        for (let i = 0; i < 30; i++) {
            data[l.nativeName].push("word" + i);
        }
    });
    return data;
};

class DictionaryTable extends React.Component {
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
        this.state = { data: {}};
        this.toColumn = React.createRef();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ data: fakeData(nextProps.languages)});
        // const { from } = nextProps;
        // const { fromCols, toCols } = this.state;
    }

    render() {
        const { from, to} = this.props;
        const { data } = this.state;
        const fromNames = from.map(l => l.nativeName);
        const fromCols = [];
        const toCols = [];
        Object.keys(data).forEach(key => {
            let col = <DictionaryColumn colName={key} data={data[key]} onDelete={() => {
                delete data[key];
                this.setState({ data });
            }
            }/>;
            if (key === to.nativeName) {
                col = <DictionaryColumn colName={key} selected={true} setRef={this.toColumn} data={data[key]} />
            }
            if (fromNames.includes(key)) {
                fromCols.push(col);
            } else {
                toCols.push(col);
            }
        });
        return (
            <div className="dictionaryTable">
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
    data: {
        English: ['word1', 'word2', 'word3', 'word4'],
        Turkish: ['word1', 'word2', 'word3', 'word4'],
    },
    languages: []
};

export default DictionaryTable;