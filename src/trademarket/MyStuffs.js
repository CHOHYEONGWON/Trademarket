import React from 'react';
import axios from 'axios'
import StuffBox from './StuffBox';
import { withRouter } from 'react-router-dom';
import DataHelper from '../DataHelper';

class MyStuffs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userStuffs: []
        }
    }

    componentDidMount() {
        this.getUser();
        this.getMyStuffs(); 
    }

    getUser = () => {
        axios.get(
            DataHelper.baseURL() + '/me/',
            {
                headers: {
                    'Authorization' : DataHelper.getAuthToken()
                }
            }
        ).then((response) => {
            const user = response.data;
            this.setState({
                user: user
            });
        });
    }

    getMyStuffs = () => {
        axios.get(
            DataHelper.baseURL() + '/me/stuffs/',
        {
            headers: {
                'Authorization': DataHelper.getAuthToken()
            }
        }
        ).then((response) => {
            const userStuffs_a = response.data;
            this.setState({
                userStuffs: userStuffs_a
            });
        });
    }

    render() {
        const user = this.state.user;
        const point = user ? user.point : 0;
        const stuffs = this.state.userStuffs.map((userStuff) => {
            const stuff = userStuff.stuff;
            return (
                <StuffBox key={stuff.id}
                stuff = {stuff}
                count={userStuff.count} />
            )
        });
        return (
            <div id='container'>
                <h1>내 아이템 목록</h1>
                <h2>잔고 : {point}p </h2>
                <div id="item-list-container">
                    {stuffs}
                </div>
            </div>
        );
    }
}

export default withRouter(MyStuffs);