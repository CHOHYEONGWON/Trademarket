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
        this.getMyStuffs();
        this.getUser();
    }

    getUser = () => {
        axios.get(
            DataHelper.baseURL() + '/me/',
            {
                headers: {
                    'Authorization' : localStorage.getItem('authorization')
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
                'Authorization':localStorage.getItem('authorization')
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
        const stuffs = this.state.userStuffs.map((userStuff_d) => {
            const stuff = userStuff_d.stuff;
            return (
                <StuffBox key={stuff.id}
                stuff = {stuff}
                count={userStuff_d.count} />
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