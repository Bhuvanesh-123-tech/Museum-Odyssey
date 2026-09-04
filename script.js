import * as THREE from 'https://unpkg.com/three@0.168.0/build/three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const floorGeometry = new THREE.PlaneGeometry(100, 60);

const floorMaterial = new THREE.MeshBasicMaterial({
    color: 0x666666,
    side: THREE.DoubleSide
});

const floor = new THREE.Mesh(
    floorGeometry,
    floorMaterial
);

floor.rotation.x = -Math.PI / 2;

scene.add(floor);

camera.position.set(0, 30, 20);

camera.lookAt(0, 0, 0);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
