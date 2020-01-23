import React from 'react';
import Index from "../Button";
import './Popup.css';

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {index: 0, text: ''};
        this.showMore = this.showMore.bind(this);
    }

    showMore() {
        console.log('here');
        const {index} = this.state;
        const {users} = this.props;
        if (index < users.length - 1) {
            this.setState({index: index + 1});
        }
    }

    render() {
        const {index} = this.state;
        const {users} = this.props;
        const names = [];
        const createUserListItem = (username, password) => 'Username: ' + username + ' Password: ' + password;
        for (let i = 0; i <= index; i++) {
            names.push(
                <li>
                    {createUserListItem(users[i].username, users[i].password)}
                </li>
            );
        }
        return (
            <div className='Popup' ref="popup-window">
                <div className='inner'>
                    <h1>
                        All Users:
                    </h1>
                    <div>
                        {names}
                    </div>
                    <Index onClick={this.showMore}/>
                </div>
            </div>
        )
    }
}

export default Popup;