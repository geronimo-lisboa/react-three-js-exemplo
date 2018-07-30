import React, { Component } from 'react';
//import threeEntryPoint from  './threeEntryPoint.js' //'./src/threeEntryPoint';
import * as THREE from 'three'
//https://medium.com/@necsoft/three-js-101-hello-world-part-1-443207b1ebe1
//Versão antiga, tá quase funcionando.
class MyThreeJS extends Component{
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
        this.init = this.init.bind(this);
        this.animation = this.animation.bind(this);
        //this.createCamera = this.createCamera.bind(this);
        //this.createScene = this.createScene.bind(this);
        this.state = {isInitiated:false, renderContext:undefined, obj:undefined};
    }

    createCamera(canvas){
        const cam = new THREE.PerspectiveCamera(
            75, canvas.clientWidth / canvas.clientHeight, 1, 1000 );
        return cam;
    }

    createScene(){
        let scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xff0000 );
        return scene;
    }

    create3dObject(){
        let geometry = new THREE.IcosahedronGeometry(200, 1 );
        let material = new THREE.MeshBasicMaterial({
            color: 0xfff999fff,
            wireframe: true,
            wireframelinewidth:8 });
        let mesh = new THREE.Mesh(geometry, material);
        const obj = {geometry:geometry, material:material, mesh:mesh};
        return obj;
    }

    createRenderer(canvas){
        let newRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        newRenderer.setSize( canvas.clientWidth, canvas.clientHeight ) ;
        return newRenderer;
    }

    createClock(){
        const clock = new THREE.Clock();
        return clock;
    }

    init(){
        let clock = this.createClock();
        let newCam = this.createCamera(this.canvasRef.current);
        newCam.position.z = 500;
        let newScene = this.createScene();
        let newObj3D = this.create3dObject();
        newScene.add(newObj3D.mesh);
        newScene.backgroundColor = '#ff0000';
        let newRenderer = this.createRenderer(this.canvasRef.current);
        //{isInitiated:false, renderContext:undefined, obj:undefined};
        let newState = {isInitiated:true, renderContext:{
                camera:newCam,
                scene:newScene,
                renderer:newRenderer,
                clock:clock
            },
            obj: newObj3D
        };
        this.setState(newState);
    }

    animation(){
        window.requestAnimationFrame( this.animation );
        //Pega o tempo passado
        const elapsedTime =  this.state.renderContext.clock.getElapsedTime();
        let updatedObj = Object.assign({}, this.state.obj);
        updatedObj.mesh.rotation.y = elapsedTime * 0.1;
        this.state.renderContext.renderer.render(
            this.state.renderContext.scene,
            this.state.renderContext.camera
        );

    }

    componentDidMount(){
        console.log("my componentDidMount");
        if(this.state.isInitiated===false){
            this.init();
        }

        if(this.state.renderContext!==undefined){
            this.state.renderContext.renderer.render(
                this.state.renderContext.scene,
                this.state.renderContext.camera
            );
        }
    }

    render(){
        if(this.state.isInitiated!==false){
            this.animation();
        }
        return(
            <div>
                <canvas ref={this.canvasRef}></canvas>
            </div>
        )
    }
}

// class MyThreeJS extends Component {
//     constructor(props) {
//         super(props);
//         this.canvasRef = React.createRef();
//     }
//
//
//     createCamera(canvas){
//         const cam = new THREE.PerspectiveCamera(
//             75, canvas.clientWidth / canvas.clientHeight, 1, 1000 );
//         return cam;
//     }
//
//     createScene(){
//         const scene = new THREE.Scene();
//         return scene;
//     }
//
//     create3dObject(){
//         let geometry = new THREE.IcosahedronGeometry(200, 1 );
//         let material = new THREE.MeshBasicMaterial({
//             color: 0xfff999fff,
//             wireframe: true,
//             wireframelinewidth:8 });
//         let mesh = new THREE.Mesh(this.geometry, this.material);
//         const obj = {geometry:geometry, material:material, mesh:mesh};
//         return obj;
//     }
//
//     createRenderer(canvas){
//         let newRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
//         newRenderer.setSize( canvas.clientWidth, canvas.clientHeight ) ;
//         return newRenderer;
//     }
//
//     render(){
//         return(
//             <div>
//                 <canvas ref={this.canvasRef}></canvas>
//             </div>
//         )
//     }
// }

class App extends Component {
    render(){
        return(
            <div>
            <MyThreeJS/>
            </div>
        )
    }
}

export default App;
