import * as THREE from 'https://unpkg.com/three@0.168.0/build/three.module.js';

const keys = {};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xded9d0);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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

const ceilingRail = new THREE.Mesh(
    new THREE.BoxGeometry(30, 0.4, 2),
    new THREE.MeshBasicMaterial({
        color: 0x181818
    })
);

ceilingRail.position.set(0, 11.5, 0);
scene.add(ceilingRail);

const lightMaterial = new THREE.MeshBasicMaterial({
    color: 0xffe8b0
});

const lightPositions = [-12, -6, 0, 6, 12];

lightPositions.forEach((x) => {

    const cable = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 2),
        new THREE.MeshBasicMaterial({
            color: 0x111111
        })
    );

    cable.position.set(x, 10.5, 0);
    scene.add(cable);

    const light = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 16, 16),
        lightMaterial
    );

    light.position.set(x, 9.5, 0);
    scene.add(light);

});

const artFrame = new THREE.Mesh(
    new THREE.BoxGeometry(8, 5, 0.4),
    new THREE.MeshBasicMaterial({
        color: 0x3a2618
    })
);

artFrame.position.set(-49.3, 4, 0);
artFrame.rotation.y = Math.PI / 2;
scene.add(artFrame);

const artPanel = new THREE.Mesh(
    new THREE.BoxGeometry(7.2, 4.2, 0.2),
    new THREE.MeshBasicMaterial({
        color: 0xf5eee3
    })
);

artPanel.position.set(-49.05, 4, 0);
artPanel.rotation.y = Math.PI / 2;
scene.add(artPanel);

const doorFrameMaterial = new THREE.MeshBasicMaterial({
    color: 0x3a2618
});

const doorLeft = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 8, 0.6),
    doorFrameMaterial
);

doorLeft.position.set(49.4, 4, -10);
scene.add(doorLeft);

const doorRight = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 8, 0.6),
    doorFrameMaterial
);

doorRight.position.set(49.4, 4, 10);
scene.add(doorRight);

const doorTop = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.6, 20),
    doorFrameMaterial
);

doorTop.position.set(49.4, 8, 0);
scene.add(doorTop);

const crosshair = document.getElementById("crosshair");
const menu = document.getElementById("pauseMenu");

let yaw = 0;
let pitch = 0;

function updateInterface() {

    const playing =
        document.pointerLockElement === document.body;

    crosshair.style.display = playing ? "block" : "none";
    menu.style.display = playing ? "none" : "flex";

}

document.addEventListener("pointerlockchange", updateInterface);

window.addEventListener("keydown", (e) => {

    keys[e.key.toLowerCase()] = true;

    if (e.key === "Escape") {
        Object.keys(keys).forEach((key) => {
            keys[key] = false;
        });
    }

});

window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

document.addEventListener("click", (e) => {

    if (e.target.closest("#pauseMenu")) return;

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

const playerRadius = 0.45;

function canMove(x, z) {

    if (x < -49 + playerRadius) return false;

    if (z < -29 + playerRadius) return false;
    if (z > 29 - playerRadius) return false;

    if (x > 49 - playerRadius) {

        if (z < -9.5 || z > 9.5) {
            return false;
        }

    }

    return true;

}

function movePlayer(dx, dz) {

    const newX = camera.position.x + dx;
    const newZ = camera.position.z + dz;

    if (canMove(newX, camera.position.z)) {
        camera.position.x = newX;
    }

    if (canMove(camera.position.x, newZ)) {
        camera.position.z = newZ;
    }

}

function animate() {

    requestAnimationFrame(animate);

    const playing =
        document.pointerLockElement === document.body;

    camera.rotation.order = "YXZ";
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;

    if (playing) {

        const speed = 0.1;

        let dx = 0;
        let dz = 0;

        if (keys["w"]) {
            dx -= Math.sin(yaw) * speed;
            dz -= Math.cos(yaw) * speed;
        }

        if (keys["s"]) {
            dx += Math.sin(yaw) * speed;
            dz += Math.cos(yaw) * speed;
        }

        if (keys["a"]) {
            dx -= Math.cos(yaw) * speed;
            dz += Math.sin(yaw) * speed;
        }

        if (keys["d"]) {
            dx += Math.cos(yaw) * speed;
            dz -= Math.sin(yaw) * speed;
        }

        movePlayer(dx, dz);

    }

    renderer.render(scene, camera);

}

camera.position.set(0, 1.6, 15);

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
