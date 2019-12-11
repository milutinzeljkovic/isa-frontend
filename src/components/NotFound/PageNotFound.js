import React, { Component } from 'react';
import browserHistory from '../../history';

class PageNotFound extends Component {

    onIsland = () => {
        browserHistory.push('/home');
    }

    render() {
        return (
            <div class="not-found parallax">
            <div class="wave-message">
                <p>Your're lost</p>
            </div>
            <div class="wave-lost wrp">
                <span>4</span>
                <span>0</span>
                <span>4</span>
            </div>
            <div class="sky-bg"></div>
            <div class="wave-7"></div>
            <div class="wave-6"></div>
            <a class="wave-island" onClick = {this.onIsland}>
                    <img src="http://res.cloudinary.com/andrewhani/image/upload/v1524501929/404/island.svg" alt="Island"/>
            </a>
            <div class="wave-5"></div>
            <div class="wave-4"></div>
            <div class="wave-3"></div>
            <div class="wave-2"></div>
            <div class="wave-1"></div>
        </div>
        )
    }
}

export default PageNotFound;