# frozen_string_literal: true

# Pin npm packages by running ./bin/importmap
# setup
pin 'application'
pin '@hotwired/turbo-rails', to: 'turbo.min.js', preload: true
pin '@hotwired/stimulus', to: 'stimulus.min.js'
pin '@hotwired/stimulus-loading', to: 'stimulus-loading.js'
pin_all_from 'app/javascript/controllers', under: 'controllers'

# animations
pin 'gsap', to: 'https://cdn.skypack.dev/gsap@3.12.2'
pin 'three', to: 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js'
pin 'OBJLoader', to: 'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/loaders/OBJLoader.js'
pin 'ScrollToPlugin', to: 'https://cdn.skypack.dev/gsap@3.12.2/ScrollToPlugin'
pin 'ScrollTrigger', to: 'https://cdn.skypack.dev/gsap@3.12.2/ScrollTrigger'
pin 'Draggable', to: 'https://cdn.skypack.dev/gsap@3.12.2/Draggable'

# pages
pin 'pages/main_page', to: 'pages/main_page.js'
