import React from 'react';
import StuffBox from './StuffBox';
import axios from 'axios';
import DataHelper from '../DataHelper';

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
            this.indexStuffs();
        }
    }

    indexStuffs() {
        const categoryId = this.props.match.params.categoryId;
        axios.get(DataHelper.baseURL() + '/categories/' + categoryId +'/stuffs/')
         .then((response) => {
            const stuffs = response.data;
            this.setState({
                stuffs: stuffs
            })
        });
    }

    render() {
        const stuffs = this.state.stuffs.map((stuff) => {
            return (
                <StuffBox key= {stuff.id} stuff = {stuff} />
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