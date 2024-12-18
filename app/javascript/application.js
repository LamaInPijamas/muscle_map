// app/javascript/application.js

import "@hotwired/turbo";
import "controllers";

// Import GSAP and its plugins via Importmaps
import gsap from "gsap";
import ScrollToPlugin from "ScrollToPlugin";
import ScrollTrigger from "ScrollTrigger";
import Draggable from "Draggable";

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, Draggable);

// Import Pages and Modules
import "muscle_map";

// Import THREE.js and assign it to window.THREE for global access
import * as THREE from "three";
window.THREE = THREE;

// Import VANTA.js
import VANTA from "vanta.waves";

document.addEventListener("turbo:load", function () {
  // Menu Toggle Functionality
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const closeIcon = document.getElementById("close-icon");

  let isMenuOpen = false; // Track menu state

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      // Only animate on mobile: Tailwind lg: breakpoint ~1024px
      if (window.innerWidth < 1024) {
        if (!isMenuOpen) {
          // Opening the menu
          navMenu.classList.remove("hidden");

          // Animate menu in
          gsap.fromTo(
            navMenu,
            { y: -10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
          );
        } else {
          // Closing the menu
          gsap.to(navMenu, {
            y: -10,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
              navMenu.classList.add("hidden");
            },
          });
        }

        // Toggle state and icons
        isMenuOpen = !isMenuOpen;
        hamburgerIcon.classList.toggle("hidden");
        closeIcon.classList.toggle("hidden");
      } else {
        // On desktop, just toggle as before without animation
        navMenu.classList.toggle("hidden");
        hamburgerIcon.classList.toggle("hidden");
        closeIcon.classList.toggle("hidden");
      }
    });
  }

  // Initialize VANTA Waves
  VANTA.WAVES({
    el: "#wave-background",
    THREE: window.THREE,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0xe1011,
    shininess: 30,
    waveHeight: 15,
    waveSpeed: 0.5,
    zoom: 0.75,
  });

  // Bullet navigation scrolling
  const bulletContainers = document.querySelectorAll(".bullet-container");
  bulletContainers.forEach((container) => {
    container.addEventListener("click", () => {
      const target = container.getAttribute("data-target");
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: target,
          ease: "power2.inOut",
        });
      }
    });
  });

  // Function to highlight the active bullet container
  function highlightBullet(step) {
    bulletContainers.forEach((container) => {
      container.classList.remove("active-bullet", "glow");
    });

    const activeContainer = document.querySelector(
      `.bullet-container[data-step='${step}']`
    );
    if (activeContainer) {
      activeContainer.classList.add("active-bullet", "glow");
    }
  }

  // Create ScrollTriggers for each section
  const sections = ["#section-1", "#section-2", "#section-3", "#section-4"];
  sections.forEach((selector, index) => {
    const element = document.querySelector(selector);
    if (element) {
      ScrollTrigger.create({
        trigger: selector,
        start: "top center",
        onEnter: () => highlightBullet(index + 1),
        onEnterBack: () => highlightBullet(index + 1),
      });
    }
  });
});
