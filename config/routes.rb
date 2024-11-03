Rails.application.routes.draw do
  get 'muscle_map/index'
  get 'exercises/show'
  get 'exercises/new'
  get 'exercises/create'
  get 'exercises/edit'
  get 'exercises/update'
  get 'exercises/destroy'
  get 'muscles/index'
  get 'muscles/show'
  get 'muscles/new'
  get 'muscles/create'
  get 'muscles/edit'
  get 'muscles/update'
  get 'muscles/destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  root 'muscle_map#index'
  # Defines the root path route ("/")
  # root "posts#index"
end
