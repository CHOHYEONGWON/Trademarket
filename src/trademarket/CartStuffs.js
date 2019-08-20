import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import StuffBox from './StuffBox';
import DataHelper from '../DataHelper';
import { inject } from 'mobx-react';

@inject('authStore')
class CartStuffs extends React.Component {  
    constructor(props) {
        super(props);
        this.state= {
            cartStuffs: []
        }
    }

    componentDidMount() {
        this.indexStuffs();
    }

    indexStuffs = () => {
        let cartStuffs = localStorage.getItem('cart_stuffs');
        if (cartStuffs == null || cartStuffs.length < 1) {
            cartStuffs = [];
        } else {
            cartStuffs = JSON.parse(cartStuffs);
        }
        this.setState({
            cartStuffs
        });
    }  

    purchase = () => {
        const stuffs = [];
        const { authStore } = this.props;
        for (let cartStuff of this.state.cartStuffs) {
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
            localStorage.removeItem('cart_stuffs');
            this.props.history.push('/me/stuffs');
        });
    }
        
    render() {
        const stuffs = this.state.cartStuffs.map((cartStuff) => {
            console.log(cartStuff);
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