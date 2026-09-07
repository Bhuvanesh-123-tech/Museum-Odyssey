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

createPortrait(-49.3, -11, Math.PI / 2);
createPortrait(-49.3, 0, Math.PI / 2);
createPortrait(-49.3, 11, Math.PI / 2);

const doorMaterial = new THREE.MeshBasicMaterial({
    color: 0x6b4328
});

const door = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 7, 19),
    doorMaterial
);

door.position.set(49.15, 3.5, 0);
scene.add(door);

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
        new THREE.BoxGeometry(2.6, 0.3, 2),
        new THREE.MeshBasicMaterial({
            color: 0x182438
        })
    );

    tableTop.position.y = 1.05;
    table.add(tableTop);

    const tableBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.48, 0.65, 1.25, 8),
        new THREE.MeshBasicMaterial({
            color: 0x101827
        })
    );

    tableBody.position.y = 0.45;
    table.add(tableBody);

    const tableRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.55, 0.06, 8, 32),
        new THREE.MeshBasicMaterial({
            color: 0x7185a8
        })
    );

    tableRing.rotation.x = Math.PI / 2;
    tableRing.position.y = 1.05;
    table.add(tableRing);

    exhibit.add(table);

    const book = new THREE.Group();

    book.position.y = 1.5;
    book.rotation.y = facing;

    const closedCover = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 0.16, 1.8),
        new THREE.MeshBasicMaterial({
            color: bookColor
        })
    );

    closedCover.position.y = 0.08;
    book.add(closedCover);

    const spine = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.3, 1.8),
        new THREE.MeshBasicMaterial({
            color: 0x111111
        })
    );

    spine.position.set(-1.16, 0.18, 0);
    book.add(spine);

    const leftPage = new THREE.Mesh(
        new THREE.BoxGeometry(1.15, 0.08, 1.7),
        new THREE.MeshBasicMaterial({
            color: 0xf4ead5
        })
    );

    leftPage.position.set(-0.57, 0.22, 0);
    book.add(leftPage);

    const rightPage = new THREE.Mesh(
        new THREE.BoxGeometry(1.15, 0.08, 1.7),
        new THREE.MeshBasicMaterial({
            color: 0xf4ead5
        })
    );

    rightPage.position.set(0.57, 0.22, 0);
    book.add(rightPage);

    const coverTop = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 0.12, 1.8),
        new THREE.MeshBasicMaterial({
            color: bookColor
        })
    );

    coverTop.position.y = 0.28;
    book.add(coverTop);

    exhibit.add(book);

    const labelCanvas = document.createElement("canvas");

    labelCanvas.width = 512;
    labelCanvas.height = 128;

    const ctx = labelCanvas.getContext("2d");

    ctx.clearRect(0, 0, 512, 128);
    ctx.fillStyle = "#fff8ee";
    ctx.font = "bold 34px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(title, 256, 64);

    const labelTexture = new THREE.CanvasTexture(labelCanvas);

    const label = new THREE.Mesh(
        new THREE.PlaneGeometry(4, 1),
        new THREE.MeshBasicMaterial({
            map: labelTexture,
            transparent: true
        })
    );

    label.position.y = 4.6;
    label.rotation.y = facing;
    exhibit.add(label);

    scene.add(exhibit);

    books.push({
        exhibit,
        book,
        closedCover,
        coverTop,
        leftPage,
        rightPage,
        title,
        baseX: x,
        baseY: 1.5,
        baseZ: z,
        facing,
        open: false,
        animating: false,
        progress: 0
    });
}

createBook(-25, -28.8, "MATHEMATICS", 0x4169a1, 0);
createBook(0, -28.8, "SCIENCE", 0x3f8f62, 0);
createBook(25, -28.8, "SOCIAL SCIENCE", 0x9b633f, 0);

createBook(-25, 28.8, "ENGLISH", 0x7b4fa3, Math.PI);
createBook(0, 28.8, "COMPUTER SCIENCE", 0x3c7f91, Math.PI);
createBook(25, 28.8, "ART & CULTURE", 0xb05b55, Math.PI);

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
const interactionDistance = 5;

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

    let closestBook = null;
    let closestDistance = Infinity;

    books.forEach((book) => {

        const worldPosition = new THREE.Vector3();

        book.book.getWorldPosition(worldPosition);

        const distance =
            camera.position.distanceTo(worldPosition);

        if (distance > interactionDistance) return;

        const direction = worldPosition
            .clone()
            .sub(camera.position)
            .normalize();

        const cameraDirection = new THREE.Vector3();

        camera.getWorldDirection(cameraDirection);

        const dot =
            cameraDirection.dot(direction);

        if (dot < 0.94) return;

        if (distance < closestDistance) {

            closestDistance = distance;
            closestBook = book;

        }

    });

    if (!closestBook) {

        bookPrompt.style.display = "none";
        return;

    }

    targetedBook = closestBook;

    bookPrompt.style.display = "block";

    bookPrompt.textContent =
        closestBook.open
            ? "Press E to close book"
            : "Press E to open book";

}

function toggleBook(book) {

    book.animating = true;

}

function animateBook(book) {

    if (!book.animating) {

        if (!book.open) {

            book.book.position.y =
                book.baseY +
                Math.sin(performance.now() * 0.0015 + book.baseX) * 0.08;

        }

        return;

    }

    book.progress += 0.025;

    const p =
        Math.min(book.progress, 1);

    const smooth =
        p * p * (3 - 2 * p);

    const cameraDirection = new THREE.Vector3();

    camera.getWorldDirection(cameraDirection);

    if (!book.open) {

        const target =
            camera.position.clone()
                .add(cameraDirection.multiplyScalar(2.2));

        book.book.position.set(
            THREE.MathUtils.lerp(
                book.book.position.x,
                target.x - book.exhibit.position.x,
                smooth * 0.18
            ),
            THREE.MathUtils.lerp(
                book.book.position.y,
                1.7,
                smooth * 0.18
            ),
            THREE.MathUtils.lerp(
                book.book.position.z,
                target.z - book.exhibit.position.z,
                smooth * 0.18
            )
        );

        book.book.rotation.y =
            THREE.MathUtils.lerp(
                book.book.rotation.y,
                yaw,
                smooth * 0.12
            );

        book.closedCover.rotation.z =
            THREE.MathUtils.lerp(
                0,
                Math.PI,
                smooth
            );

        book.leftPage.rotation.z =
            THREE.MathUtils.lerp(
                0,
                -0.5,
                smooth
            );

        book.rightPage.rotation.z =
            THREE.MathUtils.lerp(
                0,
                0.5,
                smooth
            );

    } else {

        book.book.position.x =
            THREE.MathUtils.lerp(
                book.book.position.x,
                0,
                smooth * 0.12
            );

        book.book.position.y =
            THREE.MathUtils.lerp(
                book.book.position.y,
                book.baseY,
                smooth * 0.12
            );

        book.book.position.z =
            THREE.MathUtils.lerp(
                book.book.position.z,
                0,
                smooth * 0.12
            );

        book.closedCover.rotation.z =
            THREE.MathUtils.lerp(
                Math.PI,
                0,
                smooth
            );

        book.leftPage.rotation.z =
            THREE.MathUtils.lerp(
                -0.5,
                0,
                smooth
            );

        book.rightPage.rotation.z =
            THREE.MathUtils.lerp(
                0.5,
                0,
                smooth
            );

    }

    if (p >= 1) {

        book.animating = false;
        book.open = !book.open;
        book.progress = 0;

        if (!book.open) {

            book.book.position.set(
                0,
                book.baseY,
                0
            );

            book.book.rotation.y = book.facing;

        }

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

    books.forEach(animateBook);

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
