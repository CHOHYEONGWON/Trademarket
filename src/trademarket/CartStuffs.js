import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import StuffBox from './StuffBox';

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
        const stuffsQueue = [];
        for (let cartStuff of this.state.cartStuffs) {
            for (let i = 0; i < cartStuff.count; i++) {
                stuffsQueue.push(cartStuff.stuff.id);
            }
        }
        this.purchaseNextStuff(stuffsQueue);
    }

    purchaseNextStuff(stuffsQueue) {
        console.log(stuffsQueue);
        if (stuffsQueue.length < 1) {
            localStorage.setItem('cart_stuffs', '[]');
            this.props.history.push('/me/stuffs');
        } else {
            const stuffId = stuffsQueue.shift();
            axios.post(
                'http://localhost:8010/stuffs/' + stuffId + '/purchase/',
                {},
                {
                    headers: {
                        'Authorization': localStorage.getItem('authorization')
                    }
                }
            ).then((response) => {
                this.purchaseNextStuff(stuffsQueue);
               
            });

        }
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