import React, { Component } from 'react';
import io from 'socket.io-client';
import Socket from './Sockets.jsx';

const socket = io('http://localhost:3000');

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

export default App

