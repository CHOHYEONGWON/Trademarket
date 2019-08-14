import React from 'react';
import StuffBox from './StuffBox';
import axios from 'axios';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stuffs: []
        };
    }

    componentDidMount() {
        this.indexStuffs();
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.CategoryId !== prevProps.match.params.CategoryId) {
            this.indexStuffs()
        };
    }

    indexStuffs() {
        const CategoryId = this.props.match.params.CategoryId;
        axios.get('http://localhost:8010/categories/' + CategoryId +'/stuffs')
         .then((response) => {
            const stuffs = response.data;
            this.setState({
                stuffs: stuffs
            })
        });
    }

    render() {
        const stuffs = this.state.stuffs.map((stuff_b) => {
            return (
                <StuffBox key= {stuff_b.id} stuff = {stuff_b} />
            )
        });    
        return (
            <div id ='container'>
                <div id= 'item-list-container'>
                    {stuffs}
                </div>
            </div>
        )};
}

export default Category;