import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

class Socket extends Component {
    
    constructor(...props) {

        super(...props)

        this.state = {
            response: [],
            endpoint: "http://localhost:3000"
          };
        
            
    }
    
    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("mensajeBienvenida", data => this.setState({ response: data }));
      }

    render() {
        const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? <p>
              The temperature in Florence is: {this.state.response.admin} °F
            </p>
          : <p>Loading...</p>}
      </div>
    );}
    }

export default Socket