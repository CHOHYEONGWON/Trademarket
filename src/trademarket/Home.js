import React from 'react';
import axios from 'axios';
import StuffBox from './StuffBox';

class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            stuffs: []
        };
    }

    componentDidMount() {
        this.indexStuffs();
    }

    indexStuffs() {
        axios.get('http://127.0.0.1:8010/stuffs/')
            .then((response) => {
                const a = response.data;
                this.setState({
                    stuffs: a
                })
            });
    }
    
    render() { 

        const stuffs_c = this.state.stuffs.map((stuff) => {
            return (
                <StuffBox key={stuff.id} stuff={stuff}/>
            )
        });
        return (
            <div>
                <div id='container'>
                    <div id='item-list-container'>
                        {stuffs_c}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;