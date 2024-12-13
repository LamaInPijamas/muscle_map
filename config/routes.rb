# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  devise_for :users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  resources :muscles do
    resources :exercises
  end
  resources :articles
  get 'up' => 'rails/health#show', as: :rails_health_check
  root 'muscle_map#index'
  get 'map' => 'muscle_map#map'
end
