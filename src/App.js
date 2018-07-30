import React, { Component } from 'react';
import threeEntryPoint from  './threeEntryPoint.js' //'./src/threeEntryPoint';
import * as THREE from 'three'
//https://medium.com/@necsoft/three-js-101-hello-world-part-1-443207b1ebe1
class MyThreeJSContext extends Component{
    constructor(props){
        super(props);
        this.state = {threejsInitialized: false};
        this.divRef = React.createRef();//serve pra criar a referência pra div, necessária para a construção das coisas
        //do threejs
        this.buildThreeJSObjects = this.buildThreeJSObjects.bind(this);
    }

    buildThreeJSObjects(){
        console.log("Aqui vou construir o contexto do threejs");
        let width = this.divRef.current.clientWidth;
        let height = this.divRef.current.clientHeight;

        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        this.divRef.current.appendChild(canvas);

        //teste da canvas
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.rect(0, 0, 150, 100);
        ctx.fillStyle = "red";
        ctx.fill();

        this.setState({threejsInitialized:true});

    }

    componentDidMount(){
        if(this.state.threejsInitialized===false){
            this.buildThreeJSObjects();
        }
    }

    render(){
        return(<div ref={this.divRef}>foobar</div>)
    }
}

class App extends Component {
    render(){
        return(
            <div>
                <div ref={element=>this.threeRootElement = element}/>
                <hr/>
                <MyThreeJSContext/>
            </div>

        )
    }

    componentDidMount(){
        threeEntryPoint(this.threeRootElement);
    }

}

export default App;
