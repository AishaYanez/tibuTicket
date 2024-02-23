require "webpush"
Rails.application.routes.draw do
  mount ActionCable.server => "/cable"

  put "api/v1/lists/:id/getTicket", to: "api/v1/lists#getTicket"
  put "api/v1/lists/:id/increaseNumber", to: "api/v1/lists#increaseNumber"
  put "api/v1/lists/:id/decreaseNumber", to: "api/v1/lists#decreaseNumber"

  get "api/v1/current_user", to: "api/v1/users/current_user#index"

  devise_for :users, path: "", path_names: {
                       sign_in: "api/v1/login",
                       sign_out: "api/v1/login",
                       registration: "api/v1/signup",
                     },
                     controllers: {
                       sessions: "api/v1/users/sessions",
                       registrations: "api/v1/users/registrations",
                     }

  namespace :api do
    namespace :v1 do
      resources :lists
      namespace :users do
        resources :users, only: [:index]
      end
    end
  end
end
