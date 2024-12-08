import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling to #three-js-container
  const exploreButton = document.getElementById("explore-button");
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
    });
  }
});
