import LoginFlow from "../LoginFlow";
import React, {useContext} from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import {homePagePath, profilePath} from "../../Consts/paths";
import Home from "../Home";
import Profile from "../Profile";
import {DictionaryContext} from "../../Context/DictionaryContext";

const UDRouter = ({ data }) => {
    const {user} = useContext(DictionaryContext);
    return (
        <Router>
            <div>
                {user === null ? <LoginFlow data={data}/> :
                    <Switch>
                        <Route exact path={homePagePath} component={Home}/>
                        <Route exact path={profilePath} component={Profile}/>
                        <Route component={Home}/>
                    </Switch>
                }
            </div>
        </Router>
    );
};

export default UDRouter;