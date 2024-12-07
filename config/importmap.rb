# Pin npm packages by running ./bin/importmap
#setup
pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"

#animations
pin "gsap", to: "https://cdn.skypack.dev/gsap@3.12.2"
pin "ScrollToPlugin", to: "https://cdn.skypack.dev/gsap@3.12.2/ScrollToPlugin"

#pages
pin "pages/main_page", to: "pages/main_page.js"
