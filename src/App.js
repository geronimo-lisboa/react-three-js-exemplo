import React, { Component } from 'react';
import threeEntryPoint from  './threeEntryPoint.js' //'./src/threeEntryPoint';

class App extends Component {
    componentDidMount(){
        threeEntryPoint(this.threeRootElement);
    }

    render(){
        return(
            <div ref={element=>this.threeRootElement = element}/>
        )
    }

}

export default App;
