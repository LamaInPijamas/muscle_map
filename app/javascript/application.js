import "@hotwired/turbo-rails"
import "controllers"
import { gsap } from "gsap"

document.addEventListener("turbo:load", function() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  let isMenuOpen = false; // Track menu state

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      // Only animate on mobile: Tailwind lg: breakpoint ~1024px
      if (window.innerWidth < 1024) {
        if (!isMenuOpen) {
          // Opening the menu
          navMenu.classList.remove('hidden');

          // Animate menu in (e.g. from top, fade in)
          gsap.fromTo(navMenu, 
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
              navMenu.classList.add('hidden');
            }
          });
        }

        // Toggle state and icons
        isMenuOpen = !isMenuOpen;
        hamburgerIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');

      } else {
        // On desktop, just toggle as before without animation
        navMenu.classList.toggle('hidden');
        hamburgerIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
      }
    });
  }
});

