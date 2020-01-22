import React from 'react';
import Login from "./Login";
import {DictionaryContext} from "../../Context/DictionaryContext";
import Language from  "./Login/Language";

class LoginFlow extends React.Component {
    static contextType = DictionaryContext;
    constructor(props) {
        super(props);
        this.state = { user: { username: "" }, language: "", stage: 0};
    }

    render() {
        const { stage } = this.state;
        if (stage === 0) {
            return <Login onClick={(val) => this.setState({stage: stage + 1, user: val})}/>
        } else if (stage === 1) {
            return <Language onClick={(val) => {
                const {setUser} = this.context;
                const {user} = this.state;
                user.lang = val;
                setUser(user);
            }}/>
        }
    }
}

export default LoginFlow;