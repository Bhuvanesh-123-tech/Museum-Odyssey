import * as THREE from 'https://unpkg.com/three@0.168.0/build/three.module.js';

const keys = {};

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 60),
    new THREE.MeshBasicMaterial({
        color: 0xd8c3a5,
        side: THREE.DoubleSide
    })
);

floor.rotation.x = -Math.PI / 2;

scene.add(floor);

const wallMaterial = new THREE.MeshBasicMaterial({
    color: 0xfff8ee
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
        color: 0x2b2b2b
    })
);

ceiling.position.set(0, 12, 0);

scene.add(ceiling);

camera.position.set(0, 1.6, 15);

let yaw = 0;
let pitch = 0;

const crosshair = document.getElementById("crosshair");

function updateInterface() {
    const playing = document.pointerLockElement === document.body;
    crosshair.style.display = playing ? "block" : "none";
}

document.addEventListener("pointerlockchange", updateInterface);

window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

document.addEventListener("click", () => {
    document.body.requestPointerLock();
});

document.addEventListener("mousemove", (e) => {

    if (document.pointerLockElement !== document.body) return;

    yaw -= e.movementX * 0.002;

    pitch -= e.movementY * 0.002;

    pitch = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, pitch)
    );

});

function animate() {

    requestAnimationFrame(animate);

    const playing =
        document.pointerLockElement === document.body;

    camera.rotation.order = "YXZ";
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;

    if (playing) {

        const speed = 0.1;

        let newX = camera.position.x;
        let newZ = camera.position.z;

        if (keys["w"]) {
            newX -= Math.sin(yaw) * speed;
            newZ -= Math.cos(yaw) * speed;
        }

        if (keys["s"]) {
            newX += Math.sin(yaw) * speed;
            newZ += Math.cos(yaw) * speed;
        }

        if (keys["a"]) {
            newX -= Math.cos(yaw) * speed;
            newZ += Math.sin(yaw) * speed;
        }

        if (keys["d"]) {
            newX += Math.cos(yaw) * speed;
            newZ -= Math.sin(yaw) * speed;
        }

        const insideMuseum =
            newX > -49 &&
            newX < 49 &&
            newZ > -29 &&
            newZ < 29;

        const inExit =
            newX > 49 &&
            newX < 60 &&
            newZ > -10 &&
            newZ < 10;

        if (insideMuseum || inExit) {
            camera.position.x = newX;
            camera.position.z = newZ;
        }

    }

    renderer.render(scene, camera);

}

animate();

updateInterface();

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
