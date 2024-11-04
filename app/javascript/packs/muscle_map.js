import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('three-js-container');
  const rotationSlider = document.getElementById('rotationSlider');

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 100); // CAMERA POS

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(directionalLight);

  // Declare `object` in the outer scope
  let object;

  // Loader
  const loader = new OBJLoader();
  loader.load(
    '/assets/man.obj',
    (loadedObject) => {
      object = loadedObject; // Assign to the outer variable
      object.scale.set(5, 5, 5); // Adjust scale
      object.position.set(0, 0, 0); // OBJECT POSITION
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

  // Add event listener to the slider
  rotationSlider.addEventListener('input', () => {
    if (object) {
      const angleInDegrees = rotationSlider.value;
      const angleInRadians = angleInDegrees * (Math.PI / 180);
      object.rotation.y = angleInRadians; // Rotate around Y-axis
    }
  });

  // Handle Window Resize
  window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
});