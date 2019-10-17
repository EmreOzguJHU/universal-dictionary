import NavBar from "../../UI/NavBar";
import React from 'react';
import DictionaryTable from "./DictionaryTable";

class Home extends React.Component {
    render() {
        return (
            <div className="homepage">
                <NavBar>
                    <DictionaryTable/>
                </NavBar>
            </div>
        );
    }
}

export default Home;
