import * as THREE from 'https://unpkg.com/three@0.168.0/build/three.module.js';

const keys = {};

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
    color:0xbdbdbd
    side: THREE.DoubleSide
});

const floor = new THREE.Mesh(
    floorGeometry,
    floorMaterial
);

floor.rotation.x = -Math.PI / 2;

scene.add(floor);

const wallMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff
});

const wall1 = new THREE.Mesh(
    new THREE.BoxGeometry(100, 12, 1),
    wallMaterial
);

wall1.position.set(0, 6, -30);

scene.add(wall1);

const wall2 = new THREE.Mesh(
    new THREE.BoxGeometry(100, 12, 1),
    wallMaterial
);

wall2.position.set(0, 6, 30);

scene.add(wall2);

const wall3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 12, 60),
    wallMaterial
);

wall3.position.set(-50, 6, 0);

scene.add(wall3);

const wall4Top = new THREE.Mesh(
    new THREE.BoxGeometry(1, 12, 20),
    wallMaterial
);

wall4Top.position.set(50, 6, -20);

scene.add(wall4Top);

const wall4Bottom = new THREE.Mesh(
    new THREE.BoxGeometry(1, 12, 20),
    wallMaterial
);

wall4Bottom.position.set(50, 6, 20);

scene.add(wall4Bottom);

const ceiling = new THREE.Mesh(
    new THREE.BoxGeometry(100, 1, 60),
    new THREE.MeshBasicMaterial({
        color: 0x222222
    })
);

ceiling.position.set(0, 12, 0);

scene.add(ceiling);

camera.position.set(0, 1.6, 15);

let yaw = 0;
let pitch = 0;

document.addEventListener("mousemove", (e) => {

    if (document.pointerLockElement !== document.body) return;

    yaw -= e.movementX * 0.002;

    pitch -= e.movementY * 0.002;

    pitch = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, pitch)
    );

});

window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

document.addEventListener("click", () => {
    document.body.requestPointerLock();
});

function animate() {
    requestAnimationFrame(animate);

   camera.rotation.order = "YXZ";

camera.rotation.y = yaw;

camera.rotation.x = pitch;

    const speed = 0.1;

    if (keys["w"]) {
        camera.position.x -= Math.sin(yaw) * speed;
        camera.position.z -= Math.cos(yaw) * speed;
    }

    if (keys["s"]) {
        camera.position.x += Math.sin(yaw) * speed;
        camera.position.z += Math.cos(yaw) * speed;
    }

    if (keys["a"]) {
        camera.position.x -= Math.cos(yaw) * speed;
        camera.position.z += Math.sin(yaw) * speed;
    }

    if (keys["d"]) {
        camera.position.x += Math.cos(yaw) * speed;
        camera.position.z -= Math.sin(yaw) * speed;
    }

    renderer.render(scene, camera);
}

animate();
