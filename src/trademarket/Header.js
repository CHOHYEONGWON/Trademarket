import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import DataHelper from '../DataHelper';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        this.indexcategories();
    }
 
    indexcategories() {
        Axios.get(DataHelper.baseURL() + '/categories/')
        .then((response) => {
            const categories = response = response.data;
            this.setState({
                categories: categories
            });
        });
    }

    render() {
            const categories = this.state.categories.map((category) => {
                return (
                    <Link key= {category.id} to={'/categories/'+ category.id}>{category.title}</Link>
                )
            });
        return(
            <header>
                <Link to='/'>Home</Link>
                {categories}
                <div className="header-right">
                    <Link to='/cart/stuffs/'>장바구니</Link>
                    <Link to='/me/stuffs'>My Stuffs</Link>
                    <Link to="/login">Login</Link>
                    
                </div>
            </header>
        )};
}
export default Header;