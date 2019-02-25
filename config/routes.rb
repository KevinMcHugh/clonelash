Rails.application.routes.draw do
  resources :games do
    get :players
  end
  resources :players do
    get :prompts
  end

  resources :responses
  mount ActionCable.server => '/cable'
end
