# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = "1.0"
Rails.application.config.assets.paths << Rails.root.join('app', 'assets', 'models')
Rails.application.config.assets.precompile += %w( man.obj )
#for precompiling active_admin assets, cuz otherwise it bugs - changed aplication css and excluded active admin
#it was bugging the tailwind views
Rails.application.config.assets.precompile += %w[active_admin.js active_admin.css active_admin/print.css]

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )
