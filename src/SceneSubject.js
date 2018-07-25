import * as THREE from 'three'
import alphaTexture from './textura.png'

export default class scene{
    constructor (scene){
        this.speed = 0.5;
        this.scene = scene;
        this.geometry = new THREE.BoxGeometry(10,10,10);
        this.material = new THREE.MeshBasicMaterial({color: '#ff0000'});
        this.cube = new THREE.Mesh(this.geometry, this.material);
        scene.add(this.cube);
        this.update = this.update.bind(this);
    }

    update(time){
        this.cube.rotation.y = this.speed * time;
        console.log("update("+time+")");
    }
}
