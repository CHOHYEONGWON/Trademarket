import React from 'react';
import { withRouter } from 'react-router-dom';

class StuffBox extends React.Component {
   
    goToStuff = () => {
        const stuff = this.props.stuff;
        this.props.history.push('/stuffs/' + stuff.id);
    }

    render() {
        const stuff = this.props.stuff;
        const count = this.props.count;
        let image = stuff.image;   
        if (!image.startsWith('http')) {
            image = 'http://127.0.0.1:8010' + image;
        }
        return (
            <div className='item-container' onClick={this.goToStuff}>
                <img src={image} alt="" />
                <p className='item-title'>{stuff.title}</p>
                <p className='item-price'>
                    {count ==null ?
                    '가격:' + stuff.price + 'p' :
                    '개수:' + count}
                </p>
            </div>
        )
    }
}

export default withRouter(StuffBox);