import { gsap } from "gsap";
import { Draggable } from "Draggable";

gsap.registerPlugin(Draggable);

document.addEventListener("DOMContentLoaded", () => {
  const exploreButton = document.getElementById("explore-button");
  const progressBar = document.getElementById("progressBar");
  const progressContainer = document.getElementById("progressContainer");
  const progressHandle = document.getElementById("progressHandle");

  if (exploreButton) {
    exploreButton.addEventListener("click", () => {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: "#three-js-container",
          autoKill: true,
        },
        ease: "power2.inOut",
      });

      gsap.to(progressHandle, {
        x: progressContainer.offsetWidth - progressHandle.offsetWidth,
        duration: 5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });
    });
  }

  if (Draggable && progressHandle && progressContainer) {
    Draggable.create(progressHandle, {
      type: "x",
      bounds: progressContainer,
      onDrag: function () {
        const containerWidth = progressContainer.offsetWidth;
        const handleWidth = progressHandle.offsetWidth;
        const maxX = containerWidth - handleWidth;
        const currentX = this.x;
        const progressPercent = (currentX / maxX) * 100;

        gsap.set(progressBar, { width: `${progressPercent}%` });
        updateModelRotation(progressPercent);
      },
      onDragEnd: function () {
        // Optional: Add any action on drag end
      },
    });
  }

  function updateModelRotation(progress) {
    if (window.threeModel) {
      const rotationInRadians = (progress / 100) * Math.PI * 2;
      window.threeModel.rotation.y = rotationInRadians;
    } else {
      console.error("Three.js model (threeModel) is not initialized.");
    }
  }
});
