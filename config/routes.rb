Rails.application.routes.draw do
  devise_for :users
  resources :muscles do
    resources :exercises
  end  
  resources :articles
  get "up" => "rails/health#show", as: :rails_health_check
  root 'muscle_map#index'
end
