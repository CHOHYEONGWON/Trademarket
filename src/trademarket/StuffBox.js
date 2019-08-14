import React from 'react';
import { withRouter } from 'react-router-dom';

class StuffBox extends React.Component {
   
    gotoPhoto = () => {
        const stuff = this.props.stuff_b;
        this.props.history.push('/stuffs/' + stuff.id);
    }

    render() {
        const stuff_b = this.props.stuff_b;
        const count = this.props.count;
        let image = stuff_b.image;
        
        if (!image.startsWith('http')) {
            image = 'http://127.0.0.1:8010/stuffs' + image;
        }
        return (
            <div className='item-container' onClick={this.gotoPhoto}>
                <img src={image} alt="" />
                <p className='item-title'>{stuff_b.title}</p>
                <p className='item-price'>
                    {count ==null ?
                    '가격:' + stuff_b.price :
                    '개수:' + count}
                </p>
            </div>
        )
    }
}

export default withRouter(StuffBox);