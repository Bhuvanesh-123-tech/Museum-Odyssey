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

const wall4AboveExit = new THREE.Mesh(
    new THREE.BoxGeometry(1, 4, 20),
    wallMaterial
);

wall4AboveExit.position.set(50, 10, 0);
scene.add(wall4AboveExit);

const ceiling = new THREE.Mesh(
    new THREE.BoxGeometry(100, 1, 60),
    new THREE.MeshBasicMaterial({
        color: 0x252525
    })
);

ceiling.position.set(0, 12, 0);
scene.add(ceiling);

const ceilingRail = new THREE.Mesh(
    new THREE.BoxGeometry(30, 0.4, 2),
    new THREE.MeshBasicMaterial({
        color: 0x111111
    })
);

ceilingRail.position.set(0, 11.5, 0);
scene.add(ceilingRail);

const lightMaterial = new THREE.MeshBasicMaterial({
    color: 0xffe8b0
});

const lightPositions = [-18, -9, 0, 9, 18];

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

function createPortrait(x, z, rotationY) {

    const frame = new THREE.Mesh(
        new THREE.BoxGeometry(8, 5, 0.4),
        new THREE.MeshBasicMaterial({
            color: 0x3a2618
        })
    );

    frame.position.set(x, 4, z);
    frame.rotation.y = rotationY;
    scene.add(frame);

    const panel = new THREE.Mesh(
        new THREE.BoxGeometry(7.2, 4.2, 0.2),
        new THREE.MeshBasicMaterial({
            color: 0xf5eee3
        })
    );

    panel.position.set(
        x + Math.sin(rotationY) * 0.25,
        4,
        z + Math.cos(rotationY) * 0.25
    );

    panel.rotation.y = rotationY;
    scene.add(panel);
}

createPortrait(-25, -29.3, 0);
createPortrait(0, -29.3, 0);
createPortrait(25, -29.3, 0);

createPortrait(-25, 29.3, Math.PI);
createPortrait(0, 29.3, Math.PI);
createPortrait(25, 29.3, Math.PI);

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

function createBook(x, z, title, bookColor, facing) {

    const exhibit = new THREE.Group();

    exhibit.position.set(x, 0, z);

    const table = new THREE.Group();

    const tableTop = new THREE.Mesh(
        new THREE.BoxGeometry(2.8, 0.35, 2.2),
        new THREE.MeshBasicMaterial({
            color: 0x20283a
        })
    );

    tableTop.position.y = 1.1;
    table.add(tableTop);

    const tableCore = new THREE.Mesh(
        new THREE.CylinderGeometry(0.65, 0.8, 1.4, 8),
        new THREE.MeshBasicMaterial({
            color: 0x111827
        })
    );

    tableCore.position.y = 0.45;
    table.add(tableCore);

    const tableRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.72, 0.08, 8, 32),
        new THREE.MeshBasicMaterial({
            color: 0x7c8db5
        })
    );

    tableRing.rotation.x = Math.PI / 2;
    tableRing.position.y = 1.05;
    table.add(tableRing);

    exhibit.add(table);

    const bookHolder = new THREE.Group();

    bookHolder.position.y = 1.45;

    const coverBottom = new THREE.Mesh(
        new THREE.BoxGeometry(2.8, 0.18, 2.1),
        new THREE.MeshBasicMaterial({
            color: bookColor
        })
    );

    coverBottom.position.y = 0;
    bookHolder.add(coverBottom);

    const leftPage = new THREE.Mesh(
        new THREE.BoxGeometry(1.3, 0.08, 1.95),
        new THREE.MeshBasicMaterial({
            color: 0xf4ead5
        })
    );

    leftPage.position.set(-0.65, 0.12, 0);
    leftPage.rotation.z = 0;
    bookHolder.add(leftPage);

    const rightPage = new THREE.Mesh(
        new THREE.BoxGeometry(1.3, 0.08, 1.95),
        new THREE.MeshBasicMaterial({
            color: 0xf4ead5
        })
    );

    rightPage.position.set(0.65, 0.12, 0);
    bookHolder.add(rightPage);

    const closedCover = new THREE.Mesh(
        new THREE.BoxGeometry(2.8, 0.12, 2.1),
        new THREE.MeshBasicMaterial({
            color: bookColor
        })
    );

    closedCover.position.y = 0.2;
    bookHolder.add(closedCover);

    bookHolder.rotation.y = facing;

    exhibit.add(bookHolder);

    const bookLabel = document.createElement("canvas");

    bookLabel.width = 512;
    bookLabel.height = 128;

    const context = bookLabel.getContext("2d");

    context.clearRect(0, 0, 512, 128);
    context.fillStyle = "#fff8ee";
    context.font = "bold 36px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(title, 256, 64);

    const labelTexture = new THREE.CanvasTexture(bookLabel);

    const label = new THREE.Mesh(
        new THREE.PlaneGeometry(4, 1),
        new THREE.MeshBasicMaterial({
            map: labelTexture,
            transparent: true
        })
    );

    label.position.y = 5.1;
    label.rotation.y = facing;
    exhibit.add(label);

    scene.add(exhibit);

    books.push({
        exhibit,
        bookHolder,
        leftPage,
        rightPage,
        closedCover,
        title,
        baseX: x,
        baseY: 1.45,
        baseZ: z,
        facing,
        open: false,
        animating: false,
        animationTime: 0
    });
}

createBook(-25, -28.9, "MATHEMATICS", 0x4169a1, 0);
createBook(0, -28.9, "SCIENCE", 0x3f8f62, 0);
createBook(25, -28.9, "SOCIAL SCIENCE", 0x9b633f, 0);

createBook(-25, 28.9, "ENGLISH", 0x7b4fa3, Math.PI);
createBook(0, 28.9, "COMPUTER SCIENCE", 0x3c7f91, Math.PI);
createBook(25, 28.9, "ART & CULTURE", 0xb05b55, Math.PI);

const crosshair = document.getElementById("crosshair");
const bookPrompt = document.getElementById("bookPrompt");

const welcomeScreen = document.getElementById("welcomeScreen");
const pauseMenu = document.getElementById("pauseMenu");

const startButton = document.getElementById("startButton");
const resumeButton = document.getElementById("resumeButton");
const exitButton = document.getElementById("exitButton");

let yaw = 0;
let pitch = 0;
let experienceStarted = false;
let targetedBook = null;

const playerRadius = 0.45;
const interactionDistance = 6;

const raycaster = new THREE.Raycaster();

function updateInterface() {

    const playing =
        document.pointerLockElement === document.body;

    crosshair.style.display =
        playing ? "block" : "none";

    pauseMenu.style.display =
        experienceStarted && !playing ? "flex" : "none";

    if (!playing) {

        bookPrompt.style.display = "none";
        targetedBook = null;

    }

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
    bookPrompt.style.display = "none";
    crosshair.style.display = "none";

    welcomeScreen.style.display = "flex";

    camera.position.set(0, 1.6, 15);

    yaw = 0;
    pitch = 0;

});

document.addEventListener("pointerlockchange", updateInterface);

window.addEventListener("keydown", (e) => {

    keys[e.key.toLowerCase()] = true;

    if (e.key === "Escape") {

        Object.keys(keys).forEach((key) => {
            keys[key] = false;
        });

    }

    if (
        e.key.toLowerCase() === "e" &&
        targetedBook &&
        !targetedBook.animating
    ) {

        toggleBook(targetedBook);

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

function findTargetedBook() {

    targetedBook = null;

    if (!experienceStarted) return;

    if (document.pointerLockElement !== document.body) return;

    raycaster.setFromCamera(
        new THREE.Vector2(0, 0),
        camera
    );

    const targets = [];

    books.forEach((item) => {

        targets.push(item.bookHolder);
        targets.push(item.closedCover);
        targets.push(item.leftPage);
        targets.push(item.rightPage);

    });

    const hits = raycaster.intersectObjects(
        targets,
        true
    );

    if (hits.length === 0) {

        bookPrompt.style.display = "none";

        return;

    }

    const hit = hits[0];

    if (hit.distance > interactionDistance) {

        bookPrompt.style.display = "none";

        return;

    }

    let selected = null;

    for (const item of books) {

        if (
            item.bookHolder === hit.object ||
            item.closedCover === hit.object ||
            item.leftPage === hit.object ||
            item.rightPage === hit.object
        ) {

            selected = item;
            break;

        }

    }

    if (!selected) {

        for (const item of books) {

            if (item.bookHolder.children.includes(hit.object)) {

                selected = item;
                break;

            }

        }

    }

    if (!selected) return;

    targetedBook = selected;

    bookPrompt.style.display = "block";

    bookPrompt.innerHTML =
        selected.open
            ? 'Press <strong>E</strong> to close book'
            : 'Press <strong>E</strong> to open book';

}

function toggleBook(book) {

    book.animating = true;
    book.animationTime = 0;
    book.open = !book.open;

}

function animateBook(book, delta) {

    if (!book.animating) {

        if (!book.open) {

            book.bookHolder.position.y =
                book.baseY +
                Math.sin(performance.now() * 0.0015) * 0.08;

        }

        return;

    }

    book.animationTime += delta;

    const duration = 1.2;

    let progress =
        Math.min(book.animationTime / duration, 1);

    progress =
        progress * progress * (3 - 2 * progress);

    if (book.open) {

        book.bookHolder.position.y =
            THREE.MathUtils.lerp(
                book.baseY,
                3.0,
                progress
            );

        book.bookHolder.position.z =
            THREE.MathUtils.lerp(
                0,
                -1.2,
                progress
            );

        book.closedCover.rotation.x =
            THREE.MathUtils.lerp(
                0,
                Math.PI,
                progress
            );

        book.leftPage.rotation.z =
            THREE.MathUtils.lerp(
                0,
                -0.45,
                progress
            );

        book.rightPage.rotation.z =
            THREE.MathUtils.lerp(
                0,
                0.45,
                progress
            );

    } else {

        book.bookHolder.position.y =
            THREE.MathUtils.lerp(
                3.0,
                book.baseY,
                progress
            );

        book.bookHolder.position.z =
            THREE.MathUtils.lerp(
                -1.2,
                0,
                progress
            );

        book.closedCover.rotation.x =
            THREE.MathUtils.lerp(
                Math.PI,
                0,
                progress
            );

        book.leftPage.rotation.z =
            THREE.MathUtils.lerp(
                -0.45,
                0,
                progress
            );

        book.rightPage.rotation.z =
            THREE.MathUtils.lerp(
                0.45,
                0,
                progress
            );

    }

    if (progress >= 1) {

        book.animating = false;

    }

}

function animate() {

    requestAnimationFrame(animate);

    const now = performance.now();
    const delta = 1 / 60;

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

    books.forEach((book) => {

        if (!book.animating && !book.open) {

            book.bookHolder.position.y =
                book.baseY +
                Math.sin(now * 0.0015 + book.baseX) * 0.08;

        }

        animateBook(book, delta);

    });

    findTargetedBook();

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
