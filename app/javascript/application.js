// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
//god why this next line is default if nobody uses it and it only causes errors.
//import "controllers"
document.addEventListener("turbo:load", function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');
  
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        // Toggle the menu visibility
        navMenu.classList.toggle('hidden');
  
        // Toggle icons
        hamburgerIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
      });
    }
});