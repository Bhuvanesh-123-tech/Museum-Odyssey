import * as THREE from 'https://unpkg.com/three@0.168.0/build/three.module.js';

const keys = {};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000);

document.body.appendChild(renderer.domElement);

const floorMaterial = new THREE.MeshBasicMaterial({
    color: 0xd8c3a5,
    side: THREE.DoubleSide
});

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 60),
    floorMaterial
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

const wall4AboveExit = new THREE.Mesh(
    new THREE.BoxGeometry(1, 4, 20),
    wallMaterial
);

wall4AboveExit.position.set(50, 10, 0);
scene.add(wall4AboveExit);

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

function createPortrait(z) {

    const frame = new THREE.Mesh(
        new THREE.BoxGeometry(8, 5, 0.4),
        new THREE.MeshBasicMaterial({
            color: 0x3a2618
        })
    );

    frame.position.set(-49.3, 4, z);
    frame.rotation.y = Math.PI / 2;
    scene.add(frame);

    const panel = new THREE.Mesh(
        new THREE.BoxGeometry(7.2, 4.2, 0.2),
        new THREE.MeshBasicMaterial({
            color: 0xf5eee3
        })
    );

    panel.position.set(-49.05, 4, z);
    panel.rotation.y = Math.PI / 2;
    scene.add(panel);

}

createPortrait(-11);
createPortrait(0);
createPortrait(11);

const doorMaterial = new THREE.MeshBasicMaterial({
    color: 0x6b4328
});

const door = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 7, 19),
    doorMaterial
);

door.position.set(49.15, 3.5, 0);
scene.add(door);

const doorOpening = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 7, 18),
    new THREE.MeshBasicMaterial({
        color: 0x000000
    })
);

doorOpening.position.set(49.35, 3.5, 0);
scene.add(doorOpening);

const doorTop = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.5, 20),
    new THREE.MeshBasicMaterial({
        color: 0x3a2618
    })
);

doorTop.position.set(49.2, 7.2, 0);
scene.add(doorTop);

const doorLeft = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 7.2, 0.5),
    new THREE.MeshBasicMaterial({
        color: 0x3a2618
    })
);

doorLeft.position.set(49.2, 3.6, -10);
scene.add(doorLeft);

const doorRight = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 7.2, 0.5),
    new THREE.MeshBasicMaterial({
        color: 0x3a2618
    })
);

doorRight.position.set(49.2, 3.6, 10);
scene.add(doorRight);

const books = [];

function createBook(x, z, title, color) {

    const group = new THREE.Group();

    const stand = new THREE.Mesh(
        new THREE.BoxGeometry(3.5, 0.5, 2.5),
        new THREE.MeshBasicMaterial({
            color: 0x4b3828
        })
    );

    stand.position.y = 0.25;
    group.add(stand);

    const book = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 2.8, 0.55),
        new THREE.MeshBasicMaterial({
            color: color
        })
    );

    book.position.y = 1.9;
    group.add(book);

    const spine = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 2.8, 0.65),
        new THREE.MeshBasicMaterial({
            color: 0x222222
        })
    );

    spine.position.set(-1.13, 1.9, 0);
    group.add(spine);

    const labelCanvas = document.createElement("canvas");
    labelCanvas.width = 512;
    labelCanvas.height = 128;

    const context = labelCanvas.getContext("2d");

    context.fillStyle = "#fff8ee";
    context.fillRect(0, 0, 512, 128);

    context.fillStyle = "#222222";
    context.font = "bold 38px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(title, 256, 64);

    const texture = new THREE.CanvasTexture(labelCanvas);

    const label = new THREE.Mesh(
        new THREE.PlaneGeometry(3.8, 0.95),
        new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true
        })
    );

    label.position.set(0, 4.1, 0);
    group.add(label);

    group.position.set(x, 0, z);

    scene.add(group);

    books.push({
        object: book,
        title: title
    });

}

createBook(-30, -18, "MATHEMATICS", 0x4169a1);
createBook(-30, 0, "SCIENCE", 0x3f8f62);
createBook(-30, 18, "SOCIAL SCIENCE", 0x9b633f);

createBook(10, -22, "ENGLISH", 0x7b4fa3);
createBook(10, 0, "COMPUTER SCIENCE", 0x3c7f91);
createBook(10, 22, "ART & CULTURE", 0xb05b55);

const crosshair = document.getElementById("crosshair");
const welcomeScreen = document.getElementById("welcomeScreen");
const pauseMenu = document.getElementById("pauseMenu");
const startButton = document.getElementById("startButton");
const resumeButton = document.getElementById("resumeButton");
const exitButton = document.getElementById("exitButton");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const interactButton = document.getElementById("interactButton");

let yaw = 0;
let pitch = 0;
let experienceStarted = false;

const playerRadius = 0.45;

function updateInterface() {

    const playing =
        document.pointerLockElement === document.body;

    crosshair.style.display =
        playing ? "block" : "none";

    pauseMenu.style.display =
        experienceStarted && !playing ? "flex" : "none";

}

function startExperience() {

    experienceStarted = true;

    welcomeScreen.style.display = "none";

    camera.position.set(0, 1.6, 15);

    yaw = 0;
    pitch = 0;

    document.body.requestPointerLock();

}

startButton.addEventListener("click", startExperience);

resumeButton.addEventListener("click", () => {
    document.body.requestPointerLock();
});

exitButton.addEventListener("click", () => {

    document.exitPointerLock();

    experienceStarted = false;

    pauseMenu.style.display = "none";
    crosshair.style.display = "none";
    welcomeScreen.style.display = "flex";

    camera.position.set(0, 1.6, 15);

    yaw = 0;
    pitch = 0;

});

mobileMenuButton.addEventListener("click", () => {

    if (experienceStarted) {
        document.exitPointerLock();
    }

});

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

document.addEventListener("mousemove", (e) => {

    if (document.pointerLockElement !== document.body) return;

    yaw -= e.movementX * 0.002;

    pitch -= e.movementY * 0.002;

    pitch = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, pitch)
    );

});

function canMove(x, z) {

    if (x < -49 + playerRadius) {
        return false;
    }

    if (z < -29 + playerRadius) {
        return false;
    }

    if (z > 29 - playerRadius) {
        return false;
    }

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

const raycaster = new THREE.Raycaster();

function checkBookInteraction() {

    if (!experienceStarted) return;

    raycaster.setFromCamera(
        new THREE.Vector2(0, 0),
        camera
    );

    const objects = books.map(book => book.object);

    const hits = raycaster.intersectObjects(objects);

    if (hits.length > 0 && hits[0].distance < 6) {

        interactButton.style.display = "block";

    } else {

        interactButton.style.display = "none";

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

    checkBookInteraction();

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
