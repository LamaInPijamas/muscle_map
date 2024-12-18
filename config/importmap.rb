
# Pin all JavaScript modules your app needs
pin "application", preload: true

# Pin Three.js and OBJLoader
pin "three", to: "https://cdn.jsdelivr.net/npm/three@0.171.0/build/three.module.js"
pin "OBJLoader", to: "https://cdn.jsdelivr.net/npm/three@0.171.0/examples/jsm/loaders/OBJLoader.js"

# Pin GSAP and its plugins
pin "gsap", to: "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"
pin "ScrollToPlugin", to: "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollToPlugin.min.js"
pin "ScrollTrigger", to: "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"
pin "Draggable", to: "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/Draggable.min.js"

# Pin VANTA.js
pin "vanta.waves", to: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js"

# Pin Hotwired Turbo
pin "@hotwired/turbo", to: "@hotwired--turbo.js" # @8.0.12

# Pin Trix correctly
pin "trix", to: "https://cdn.jsdelivr.net/npm/trix@2.1.11/dist/trix.umd.min.js", preload: true

# Pin ActionText
pin "@rails/actiontext", to: "https://cdn.jsdelivr.net/npm/@rails/actiontext@8.0.100/app/assets/javascripts/actiontext.js"

# Pin specific modules
pin "muscle_map", to: "muscle_map.js"

# Pin all modules from standard directories
# Remove or comment out the previous pin_all_from for "modules"
# pin_all_from "app/javascript/modules", under: "modules"
