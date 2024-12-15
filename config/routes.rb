Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout', sign_up: 'register' }
  ActiveAdmin.routes(self)
  resources :muscles do
    resources :exercises
  end
  resources :articles
  get 'up' => 'rails/health#show', as: :rails_health_check
  root 'muscle_map#index'
  get 'map' => 'muscle_map#map'
  get 'filter_exercises', to: 'exercises#filter', as: 'filter_exercises'
end
