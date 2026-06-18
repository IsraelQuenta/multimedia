import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let scene, camera, renderer, mixer;
let actions = [];
let sound;

const clock = new THREE.Clock();

init();
animate();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);

    // Volvemos a usar el tamano total de la ventana (pantalla completa limpia)
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 1.5, 4);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Luces
    const ambient = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambient);

    const dir = new THREE.DirectionalLight(0xffffff, 2);
    dir.position.set(5, 10, 5);
    scene.add(dir);

    // Piso
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        new THREE.MeshStandardMaterial({ color: 0x90ee90 })
    );
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Modelo 3D
    const loader = new GLTFLoader();
    loader.load(
        "./models/dance.glb",
        (gltf) => {
            const model = gltf.scene;
            model.scale.set(1, 1, 1);
            scene.add(model);

            mixer = new THREE.AnimationMixer(model);
            gltf.animations.forEach((clip) => {
                const action = mixer.clipAction(clip);
                action.play();
                action.paused = true; // Se queda en pausa hasta presionar el boton
                actions.push(action);
            });
        }
    );

    // Audio
    const listener = new THREE.AudioListener();
    camera.add(listener);

    sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(
        "./audio/vaca-lola.mp3",
        (buffer) => {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(0.8);
        }
    );

    // Escuchador del boton original
    document.getElementById("playBtn").addEventListener("click", () => {
        if (sound && !sound.isPlaying) {
            sound.play();
        }

        actions.forEach((action) => {
            action.paused = false;
        });

        // Ocultamos el boton para limpiar la pantalla completa
        document.getElementById("playBtn").style.display = "none";
    });

    window.addEventListener("resize", onResize);
}

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (mixer) {
        mixer.update(delta);
    }
    renderer.render(scene, camera);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}