import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import StuffBox from './StuffBox';
import DataHelper from '../DataHelper';
import { inject, observer } from 'mobx-react';

@inject('authStore', 'stuffStore')
@observer
class CartStuffs extends React.Component {  
    
    purchase = () => {
        const stuffs = [];
        const { authStore, stuffStore } = this.props;
        for (let cartStuff of stuffStore.cartStuffs) {
            stuffs.push({
                stuff_id: cartStuff.stuff.id,
                count: cartStuff.count
            })
        }
        axios.post(
            DataHelper.baseURL() + '/stuffs/purchase/',
            {
                stuffs
            },
            {
                headers: {
                    'Authorization': authStore.authToken
                }
            }
        ).then((response) => {
            stuffStore.clearCartStuffs();
            this.props.history.push('/me/stuffs');
        });
    }
        
    render() {
        const { stuffStore } = this.props;
        const stuffs = stuffStore.cartStuffs.map((cartStuff) => {
            const stuff = cartStuff.stuff;
            return (
                <StuffBox key={stuff.id}
                    stuff={stuff}
                    count={cartStuff.count} />
            )
        });
        return (
            <div id='container'>
                <h1>장바구니</h1>
                <button onClick={this.purchase}>구입</button>
                <div id="item-list-container">
                    {stuffs}
                </div>
            </div>
            
        );
    }
}

export default withRouter(CartStuffs);