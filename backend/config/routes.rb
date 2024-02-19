require "webpush"
Rails.application.routes.draw do
  resources :lists

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
      # resources :users
    end
  end
end
