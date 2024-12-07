import { gsap } from "gsap";

document.addEventListener("DOMContentLoaded", () => {
  const exploreButton = document.getElementById("explore-button");
  const targetSection = document.getElementById("three-js-container");

  if (exploreButton && targetSection) {
    exploreButton.addEventListener("click", () => {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: "#three-js-container",
          autoKill: true
        },
        ease: "power2.inOut"
      });
    });
  }
});
