import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import DataHelper from '../DataHelper';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            username: "",
            password: ""
        };
    }

    OnInPutChanged = (event) => {
        const target = event.target;
        if (target.name === 'username') {
            this.setState({
                username: target.value
            });
        } else if (target.name === 'password') {
            this.setState({
                password: target.value
            });
        }
    }
    
    login = () => {
        axios.post( 
            DataHelper.baseURL() + '/o/token/',
        {
            grant_type : "password",
            client_id : "cDoKLZHYVjbeYb4PpjudA2QxmLdvXLrna71YTGbH",
            username: this.state.username,
            password: this.state.password
        }).then((response) =>{
            const token = response.data;
            localStorage.setItem('authorization', token.token_type + ' ' + token.access_token); 
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <p>
                        <label>아이디</label>
                        <input type='text'
                        value={this.state.username}
                        onChange={this.OnInPutChanged}
                        name='username'/>
                    </p>
                </div>    
                <div className='container'>
                    <p>
                        <label>비밀번호</label>
                        <input type='password'
                        value={this.state.password}
                        onChange={this.OnInPutChanged}
                        name="password"/>
                    </p>
                </div>
                <button onClick={this.login}>로그인</button>
            </div>
        )
    }
}

export default withRouter(Login);