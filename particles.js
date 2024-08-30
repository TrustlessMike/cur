let scene, camera, renderer, particles;

function init() {
    console.log("Initializing particle system...");
    if (!THREE) {
        console.error("THREE is not defined. Make sure Three.js is loaded.");
        return;
    }
    if (!document.getElementById('background-canvas')) {
        console.error("Canvas element 'background-canvas' not found.");
        return;
    }
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('background-canvas'), alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particles
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const sizes = [];
    const colors = [];
    const numStars = 15000;

    for (let i = 0; i < numStars; i++) {
        vertices.push(
            THREE.MathUtils.randFloatSpread(2000), // x
            THREE.MathUtils.randFloatSpread(2000), // y
            THREE.MathUtils.randFloatSpread(2000)  // z
        );

        // Randomize star sizes
        sizes.push(Math.random() * 2 + 0.5);

        // Create a range of star colors (white to blue-ish)
        const starColor = new THREE.Color().setHSL(THREE.MathUtils.randFloat(0.55, 0.65), 1, THREE.MathUtils.randFloat(0.7, 1));
        colors.push(starColor.r, starColor.g, starColor.b);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const starTexture = new THREE.TextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAA/BJREFUWAnFl0uIlFUYhp9z+v+7/3RPjdNjKWqESYQVCEJKBBFZi2gTLRJy1UaIVtGqTctoYZtahG0iQgKJMAwJC6M2UqsoLSKCGCYMmnGcGZt/uv+/y3nP+f/pmUXNwnNm/vOd73u+73J+R+B/Hk4qDmwdXh9XKu+Uxf4Exy2Ckb9fPvI9iR9O1F7Pt0Y8Jy5vHXkiCsrvOmH0Vkj4xPFSBAtOIEwkPmkM9X0m9pOjH+VbI54VF7YM9XW0xfvKZeeNQHjLC0U+jCQYF0TZECBMzIGEj/2e9kN+2PFVvlXiGTG5ZXBtPIwOO5E8FwTBYieAIIwk9EIJAw+8UBKJJfZDCWcXxJ+YL3/mh+1H8u0zHhOTm4eej');

    const material = new THREE.ShaderMaterial({
        uniforms: {
            texture: { value: starTexture },
            time: { value: 0 }
        },
        vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z) * (sin(time + position.x * 100.0) * 0.2 + 0.8);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform sampler2D texture;
            varying vec3 vColor;
            void main() {
                gl_FragColor = vec4(vColor, 1.0) * texture2D(texture, gl_PointCoord);
            }
        `,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 1000;

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    particles.material.uniforms.time.value += 0.01;

    particles.rotation.x += 0.0001;
    particles.rotation.y += 0.0001;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// Initialize the scene when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

// Export the setParticleColor function for use in other scripts
window.setParticleColor = function(color) {
    if (particles) {
        particles.material.color.setHex(color);
    }
};
