import React, { Component } from 'react';
import io from 'socket.io-client';
import Socket from './Sockets.jsx';
import { hot } from 'react-hot-loader';

class App extends Component {

    constructor(...props) {

        super(...props)
        
        this.state = {}

        this.handleOnClick = this.handleOnClick.bind(this); 

    }
    handleOnClick(e) {
        alert("Hice click")
    }

    render() {
        return ( 

            <div>
                <h1 onClick={this.handleOnClick}> Hola React! </h1>
                <Socket></Socket>
            </div>
        )
        }
    }

export default hot(module)(App)

