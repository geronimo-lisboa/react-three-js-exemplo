import React, { Component } from 'react';
//import threeEntryPoint from  './threeEntryPoint.js' //'./src/threeEntryPoint';
import * as THREE from 'three'
// //https://medium.com/@necsoft/three-js-101-hello-world-part-1-443207b1ebe1
// class MyThreeJSContext extends Component{
//     constructor(props){
//         super(props);
//         this.state = {threejsInitialized: false};
//         this.canvasRef = React.createRef();//serve pra criar a referência pra div, necessária para a construção das coisas
//         //do threejs
//         this.buildThreeJSObjects = this.buildThreeJSObjects.bind(this);
//         this.animation = this.animation.bind(this);
//     }
//
//     buildThreeJSObjects(){
//         console.log("Aqui vou construir o contexto do threejs");
//         let width = this.canvasRef.current.clientWidth;
//         let height = this.canvasRef.current.clientHeight;
//         let canvas = this.canvasRef.current;
//         //Criação do renderer
//         let renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
//         //Pra lidar com as diferenças entre telas normais e telas tipo as Retina
//         const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
//         renderer.setPixelRatio(DPR);
//         renderer.setSize(width, height);
//         //Com isso renderer está criado e setado.
//         //Cria a câmera
//         //propriedades da câmera
//         const aspectRatio = width / height;
//         const fieldOfView = 60;
//         const nearPlane = 4;
//         const farPlane = 100;
//         //cria a câmera
//         let camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
//         //posiciona a câmera
//         camera.position.z = 40;
//         //Com isso a câmera está criada
//         //Cria a cena
//         let scene = new THREE.Scene();
//         scene.background = new THREE.Color("#00ff00");
//         //Cria o objeto 3d
//         let geometry = new THREE.BoxGeometry(10,10,10);
//         let material = new THREE.MeshBasicMaterial({color: '#ff0000'});
//         let cube = new THREE.Mesh(this.geometry, this.material);
//         scene.add(cube);
//         this.setState({
//             threejsInitialized:true,
//             renderer : renderer,
//             camera : camera,
//             scene : scene,
//             geometry : geometry,
//             material: material,
//             cube: cube
//         });
//
//     }
//
//     componentDidMount(){
//         if(this.state.threejsInitialized===false){
//             this.buildThreeJSObjects();
//         }
//     }
//
//     animation(){
//         if(this.state.threejsInitialized===true)
//         {
//
//             window.requestAnimationFrame( this.animation );
//             this.state.renderer.render( this.state.scene, this.state.camera);
//         }
//     }
//
//     render(){
//         window.requestAnimationFrame( this.animation );
//         return(<div>
//             <canvas ref={this.canvasRef}></canvas>
//         </div>);
//     }
// }

class MyThreeJS extends Component{
    constructor(props){
        super(props);
        this.canvasRef = React.createRef();
        this.init = this.init.bind(this);
        this.animation = this.animation.bind(this);
        this.camera = undefined;
        this.scene = undefined;
        this.renderer = undefined;
        this.geometry = undefined;
        this.material = undefined;
        this.mesh = undefined;
        this.isInitiated = false;
    }

    init(){
        this.camera = new THREE.PerspectiveCamera(
            75, this.canvasRef.current.clientWidth / this.canvasRef.current.clientHeight, 1, 1000 );
        this.camera.position.z = 500;
        this.scene = new THREE.Scene();
        this.geometry = new THREE.IcosahedronGeometry(200, 1 );
        this.material =  new THREE.MeshBasicMaterial({
            color: 0xfff999fff,
            wireframe: true,
            wireframelinewidth:8 })
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add( this.mesh );
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.current, antialias: true, alpha: true })
        this.renderer.setSize( this.canvasRef.current.clientWidth, this.canvasRef.current.clientHeight ) ;
        this.isInitiated = true;
    }

    animation(){
        window.requestAnimationFrame( this.animation );

        this.mesh.rotation.x = Date.now() * 0.00005;
        this.mesh.rotation.y = Date.now() * 0.0001;
        this.renderer.render( this.scene, this.camera);
    }
    //DO REACT
    componentDidMount(){
        if(this.isInitiated===false){
            this.init();
            this.animation();
        }
    }
    //Render - DO REACT
    render(){
        // if(this.isInitiated===true)
        //     this.animation();
        return(
            <div>
                <canvas ref={this.canvasRef}></canvas>
            </div>
        )
    }
}

class App extends Component {
    render(){
        ////da coisa q eu baixei e q funciona
        // return(
        //     <div>
        //         <div ref={element=>this.threeRootElement = element}/>
        //         <hr/>
        //         <MyThreeJSContext/>
        //     </div>
        // )
        return(
            <div>
            <MyThreeJS/>
            </div>
        )
    }
    /// da coisa que eu baixei e que funciona
    // componentDidMount(){
    //     threeEntryPoint(this.threeRootElement);
    // }

}

export default App;
