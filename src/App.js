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
        //Criação da canvas na div. TODO: Criar a canvas no Render() e pegar a ref pra canvas.
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        this.divRef.current.appendChild(canvas);
        //Criação do renderer
        let renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        //Pra lidar com as diferenças entre telas normais e telas tipo as Retina
        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);
        //Com isso renderer está criado e setado.
        //Cria a câmera
        //propriedades da câmera
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 4;
        const farPlane = 100;
        //cria a câmera
        let camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        //posiciona a câmera
        camera.position.z = 40;
        //Com isso a câmera está criada
        //Cria a cena
        let scene = new THREE.Scene();
        scene.background = new THREE.Color("#00ff00");

        // //teste da canvas
        // var ctx = canvas.getContext("2d");
        // ctx.beginPath();
        // ctx.rect(0, 0, 150, 100);
        // ctx.fillStyle = "red";
        // ctx.fill();

        this.setState({
            threejsInitialized:true,
            renderer : renderer,
            camera : camera,
            scene : scene
        });

    }

    componentDidMount(){
        if(this.state.threejsInitialized===false){
            this.buildThreeJSObjects();
        }
    }

    render(){
        //requestAnimationFrame(this.render);
        if(this.state.threejsInitialized===true)
            this.state.renderer.render(this.state.scene, this.state.camera);
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
