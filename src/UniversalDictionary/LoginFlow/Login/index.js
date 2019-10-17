import React from 'react';
import Button from '../../../UI/Button'
import './index.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: { username: "", password: "" }};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.encode = this.encode.bind(this);
    }

    handleInputChange({target: input}) {
        const val = input.value;
        const {user} = this.state;
        user[input.name] = val;
        this.setState({user: user });
    }

    encode(pass) {
        return "*".repeat(pass.length);
    }

    // onClick() {
    //     const {username, password, users} = this.state;
    //     users.push({username, password});
    //     this.setState({popup: true});
    // }

    render() {
        const {user} = this.state;
        const { onClick } = this.props;
        return (
            <div className="Login">
                <div className="input">
                    Username:
                    <input
                        name="username"
                        type="text"
                        value={user.username}
                        onChange={this.handleInputChange}/>
                    Password:
                    <input
                        name="password"
                        type="text"
                        value={this.encode(user.password)}
                        onChange={this.handleInputChange}/>
                    <Button text="Login"
                           disabled={user.username === "" || user.password === ""}
                           onClick={() => onClick(user)}
                    />
                </div>
            </div>
        )
    }
}

export default Login;