document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuIconOpen = document.getElementById("menuIconOpen");
    const menuIconClose = document.getElementById("menuIconClose");

    function isMobileDevice() {
        return window.innerWidth <= 768;
    }

    function toggleMenu() {
        if (mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.remove("hidden");
            menuIconOpen.classList.add("hidden");
            menuIconClose.classList.remove("hidden");
        } else {
            mobileMenu.classList.add("hidden");
            menuIconOpen.classList.remove("hidden");
            menuIconClose.classList.add("hidden");
        }
    }

    if (isMobileDevice()) {
        menuToggle.addEventListener("click", toggleMenu);
    }

    window.addEventListener("resize", function () {
        if (!isMobileDevice()) {
            mobileMenu.classList.add("hidden");
            menuIconOpen.classList.remove("hidden");
            menuIconClose.classList.add("hidden");
        }
    });
});
