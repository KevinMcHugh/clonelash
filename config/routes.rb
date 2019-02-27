Rails.application.routes.draw do
  resources :games do
    get :players
  end
  resources :players do
    get :prompts
  end

  resources :responses
  namespace :admin do
    post :add_player
    post :answer_questions
  end
  mount ActionCable.server => '/cable'
end
