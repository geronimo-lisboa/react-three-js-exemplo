import * as THREE from 'three';
import SceneSubject from './SceneSubject';
import GeneralLights from './GeneralLights';

export default canvas => {

    const clock = new THREE.Clock();
    const origin = new THREE.Vector3(0,0,0);

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    const mousePosition = {
        x: 0,
        y: 0
    }

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const sceneSubjects = createSceneSubjects(scene);

    function buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#FFF");

        return scene;
    }

    function buildRender({ width, height }) {
        //Criação do renderer
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        //Pra lidar com as diferenças entre telas normais e telas tipo as Retina
        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        //Dimensiona o contexto opengl
        renderer.setSize(width, height);
        return renderer;
    }

    function buildCamera({ width, height }) {
        //propriedades da câmera
        const aspectRatio = width / height;
        const fieldOfView = 60;
        const nearPlane = 4;
        const farPlane = 100;
        //cria a câmera
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        //posiciona a câmera
        camera.position.z = 40;
        //retorna a camera
        return camera;
    }
    //Cria as coisas na cena
    function createSceneSubjects(scene) {
        const sceneSubjects = [
            new GeneralLights(scene), //As luzes
            new SceneSubject(scene) //Um objeto na cena
        ];

        return sceneSubjects;
    }

    function update() {
        //Pega o tempo passado
        const elapsedTime = clock.getElapsedTime();
        //Atualiza os objetos na cena de acordo com o tempo passado
        for(let i=0; i<sceneSubjects.length; i++)
            sceneSubjects[i].update(elapsedTime);
        //Reposiciona a câmera de acordo com a posicão do mouse
        updateCameraPositionRelativeToMouse();
        //Renderiza a cena
        renderer.render(scene, camera);
    }

    function updateCameraPositionRelativeToMouse() {
        camera.position.x += (  (mousePosition.x * 0.01) - camera.position.x ) * 0.01;
        camera.position.y += ( -(mousePosition.y * 0.01) - camera.position.y ) * 0.01;
        camera.lookAt(origin);
    }

    function onWindowResize() {
        //Lida com o resize
        const { width, height } = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }
    //Lida com o mouse move
    function onMouseMove(x, y) {
        mousePosition.x = x;
        mousePosition.y = y;
    }

    return {
        update,
        onWindowResize,
        onMouseMove
    }
}