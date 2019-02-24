Rails.application.routes.draw do
  resources :games do
    get :players
  end
  resources :players do
    get :prompts
  end
  mount ActionCable.server => '/cable'
end
