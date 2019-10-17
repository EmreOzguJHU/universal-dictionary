import LoginFlow from "../LoginFlow";
import React, {useContext} from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import {homePagePath, profilePath} from "../../Consts/paths";
import Home from "../Home";
import Profile from "../Profile";
import {UserContext} from "../../Context/UserContext";

const UDRouter = () => {
    const {user} = useContext(UserContext);
    return (
        <Router>
            <div>
                {user === null ? <LoginFlow/> :
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