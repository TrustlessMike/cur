let scene, camera, renderer, particles;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('background-canvas'), alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 10000; i++) {
        vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
        vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
        vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({ color: 0x888888, size: 3 });
    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 1000;

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    particles.rotation.x += 0.001;
    particles.rotation.y += 0.001;
    renderer.render(scene, camera);
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
