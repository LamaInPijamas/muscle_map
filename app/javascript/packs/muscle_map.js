import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('three-js-container');

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 100); // Adjust the y and z values for better positioning

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(directionalLight);

  // Loader
  const loader = new OBJLoader();
  loader.load(
    '/assets/man.obj', // Use '/models/man.obj' if moved to public directory
    (object) => {
      object.scale.set(5, 5, 5); // Adjust scale
      object.position.set(0, -50, 0); // Move the model down on the y-axis
      scene.add(object);

      object.traverse((child) => {
        if (child.isMesh) {
          child.userData = { name: child.name };
        }
      });
    },
    (xhr) => {
      console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
    },
    (error) => {
      console.error('An error occurred:', error);
    }
  );

  // Raycaster and Mouse
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function onMouseClick(event) {
    // Normalize mouse coordinates
    mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY / container.clientHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      const muscleName = clickedObject.userData.name || 'Unknown Muscle';
      alert(`You clicked on: ${muscleName}`);
    }
  }

  container.addEventListener('click', onMouseClick, false);

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  // Handle Window Resize
  window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
});