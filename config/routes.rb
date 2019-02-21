Rails.application.routes.draw do
  resources :games do
    get :players
  end
  resources :players
  mount ActionCable.server => '/cable'
end
