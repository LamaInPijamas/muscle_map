
import * as THREE from "three";
import { OBJLoader } from "OBJLoader";

document.addEventListener('turbo:load', () => {
  const container = document.getElementById('three-js-container');
  const rotationSlider = document.getElementById('rotationSlider');

  if (!container) {
    console.error("Three.js container (#three-js-container) not found.");
    return;
  }

  // Initialize scene, camera, renderer
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

  // Add Key Light - Strong directional light from above
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
  keyLight.position.set(0, 200, 100); 
  keyLight.castShadow = true; 
  keyLight.shadow.mapSize.width = 1024; // Performance warning
  keyLight.shadow.mapSize.height = 1024; // Performance warning
  keyLight.shadow.camera.near = 0.5; 
  keyLight.shadow.camera.far = 500; 
  scene.add(keyLight);

  let object; // Three.js model
  let INTERSECTED; 
  let originalMaterial; 

  // Raycaster for mouse interactions
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // Mapping part names to muscle IDs
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

  // Load OBJ model
  const loader = new OBJLoader();
  loader.load(
    '/models/man.obj', // Ensure the path is correct
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

  // Mouse move event for highlighting parts
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

  // Click event for interactions
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

  function redirectTo(path) {
    window.location.href = path;
  }

  // Animation loop
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

  // Handle window resize
  window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
});
