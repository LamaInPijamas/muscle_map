import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('three-js-container');
  const rotationSlider = document.getElementById('rotationSlider');

  // scene, camera, renderer
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 100); // CAMERA POSITION

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.autoClear = false;
  container.appendChild(renderer.domElement);

  // light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(directionalLight);

  let object; // model
  let INTERSECTED; // currently hovered object
  let originalMaterial; // To store the original material when hovering

  // raycasting
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function partNameToMuscleId(partName) {
    const muscleMap = {
      'Torso_001': 1,     
      'Biceps_R_001': 2,
      'Biceps_L_001': 2,
      'Shoulder_R_001': 3,
      'Shoulder_L_001': 3
    };
    return muscleMap[partName] || null;
  }

  const loader = new OBJLoader();
  loader.load(
    '/assets/man.obj',
    (loadedObject) => {
      object = loadedObject;
      window.threeModel = object; // Make globally accessible for Draggable and rotation
      object.scale.set(5, 5, 5); 
      object.position.set(0, -50, 0);
      scene.add(object);
      object.traverse((child) => {
        if (child.isMesh) {
          child.userData = {
            id: partNameToMuscleId(child.name),
            name: child.name || 'Unknown Muscle'
          };
          if (!child.material) {
            child.material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
          }
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

  container.addEventListener('mousemove', onMouseMove, false);

  function onMouseMove(event) {
    const rect = container.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    if (object) {
      const intersects = raycaster.intersectObject(object, true);

      if (intersects.length > 0) {
        if (INTERSECTED !== intersects[0].object) {
          if (INTERSECTED) {
            INTERSECTED.material = originalMaterial;
          }

          INTERSECTED = intersects[0].object;
          originalMaterial = INTERSECTED.material;
          INTERSECTED.material = INTERSECTED.material.clone();
          INTERSECTED.material.color.set(0xe85d5d);
        }
      } else {
        if (INTERSECTED) {
          INTERSECTED.material = originalMaterial;
        }
        INTERSECTED = null;
      }
    }
  }

  function redirectTo(path) {
    window.location.href = path;
  }

  container.addEventListener('click', onMouseClick, false);

  function onMouseClick(event) {
    const rect = container.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    if (object) {
      const intersects = raycaster.intersectObject(object, true);

      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        const muscleId = clickedObject.userData.id;

        if (muscleId) {
          redirectTo(`/muscles/${muscleId}`);
        } else {
          const muscleName = clickedObject.userData.name || 'Unknown Muscle';
          alert(`You clicked on: ${muscleName}`);
        }
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  // Rotate model on slider input
  if (rotationSlider) {
    rotationSlider.addEventListener('input', () => {
      if (window.threeModel) {
        const angleInDegrees = rotationSlider.value;
        const angleInRadians = angleInDegrees * (Math.PI / 180);
        window.threeModel.rotation.y = angleInRadians;
      }
    });
  }

  window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
});
