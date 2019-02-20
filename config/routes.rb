Rails.application.routes.draw do
  resources :games do
    get :players
  end
  resources :players
end
