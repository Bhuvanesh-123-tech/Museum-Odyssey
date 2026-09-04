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

const spawnGeometry = new THREE.BoxGeometry(25, 1, 15);

const spawnMaterial = new THREE.MeshBasicMaterial({
    color: 0x999999
});

const spawn = new THREE.Mesh(
    spawnGeometry,
    spawnMaterial
);

spawn.position.y = 0.5;

scene.add(spawn);

const wallMaterial = new THREE.MeshBasicMaterial({
    color: 0x444444
});

const wall1 = new THREE.Mesh(
    new THREE.BoxGeometry(100, 8, 1),
    wallMaterial
);

wall1.position.set(0, 4, -30);

scene.add(wall1);

const wall2 = new THREE.Mesh(
    new THREE.BoxGeometry(100, 8, 1),
    wallMaterial
);

wall2.position.set(0, 4, 30);

scene.add(wall2);

const wall3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 8, 60),
    wallMaterial
);

wall3.position.set(-50, 4, 0);

scene.add(wall3);

const wall4Top = new THREE.Mesh(
    new THREE.BoxGeometry(1, 8, 20),
    wallMaterial
);

wall4Top.position.set(50, 4, -20);

scene.add(wall4Top);

const wall4Bottom = new THREE.Mesh(
    new THREE.BoxGeometry(1, 8, 20),
    wallMaterial
);

wall4Bottom.position.set(50, 4, 20);

scene.add(wall4Bottom);
camera.position.set(0, 2, 15);

camera.lookAt(0, 2, 0);
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
