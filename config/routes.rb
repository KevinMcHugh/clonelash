Rails.application.routes.draw do
  namespace :api do
    resources :games do
      get :players
    end
    resources :players do
      get :prompts
    end

    resources :responses
    resources :votes

    namespace :admin do
      post :add_player
      post :answer_questions
      post :complete_votes
    end
  end
  mount ActionCable.server => '/cable'
end
