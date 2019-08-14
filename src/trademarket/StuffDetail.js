import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class StuffDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stuff: null
        };
    }

    componentDidMount() {
        this.getStuff();
    }

    getStuff = () => {
        const stuffId_a = this.props.match.params.stuffId;
        axios.get('http://localhost:8010/stuffs/' + stuffId_a)
            .then((response) => {
                const stuff_s = response.data;
                this.setState({
                    stuff: stuff_s
                })
            });
    }

    purchase = () => {
        const stuffId_b = this.state.stuff.id;
        axios.post(
            'http://localhost:8010/stuffs/' + stuffId_b + '/purchase/',
        {},
        {
            headers: {
                'Authorization': localStorage.getItem('authorization')
            }
        }
        ).then((response) => {
            this.props.history.push('/me/stuffs');
        });     
    }

    render() {
        const stuff = this.state.stuff;
        const name = stuff ? stuff.name : "";
        const desc = stuff ? stuff.description: "";
        const image = stuff ? stuff.image : null;
        return (
            <div id='container'>
                <div className='item-image-container'>
                    <img src={image} alt="" />
                </div>
                <div className='item-detail-container'>
                    <p>
                        <b>{name}</b>
                    </p>
                    <p>{desc}</p>
                    <button onClick={this.purchase}>구입</button>
                </div>
            </div>
        );
    }
}

export default withRouter(StuffDetail);