import React from 'react';
import Button from '../../../UI/Button'
import './index.css'
import avatar from '../../../Consts/avatar.svg'
import arrow from '../../../Consts/rightarrow.svg'
import lock from '../../../Consts/lock.svg'
import book from '../../../Consts/book.svg'
import Input from "../../../UI/Input";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: {username: "", password: ""}};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.encode = this.encode.bind(this);
    }

    handleInputChange({target: input}) {
        const val = input.value;
        const {user} = this.state;
        user[input.name] = val;
        this.setState({user: user});
    }

    encode(pass) {
        return "*".repeat(pass.length);
    }

    render() {
        const {user} = this.state;
        const {onClick} = this.props;
        return (
            <div className="Login">
                <div className="input">
                    <img className="logo" src={book} alt="dict"/>
                    <div className="user name">
                        <img src={avatar} alt="user"/>
                        <Input
                            name="username"
                            type="text"
                            value={user.username}
                            onChange={this.handleInputChange}/>
                    </div>
                    <div className="user password">
                        <img src={lock} alt="lock"/>
                        <Input
                            name="password"
                            type="password"
                            value={user.password}
                            onChange={this.handleInputChange}/>
                    </div>
                    <Button image={arrow}
                            disabled={user.username === "" || user.password === ""}
                            onClick={() => onClick(user)}
                    />
                </div>
            </div>
        )
    }
}

export default Login;