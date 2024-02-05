Rails.application.routes.draw do
  get "/current_user", to: "current_user#index"

  devise_for :users, path: "", path_names: {
                       sign_in: "api/v1/login",
                       sign_out: "api/v1/logout",
                       registration: "api/v1/signup",
                     },
                     controllers: {
                       sessions: "api/v1/users/sessions",
                       registrations: "api/v1/users/registrations",
                     }

  /Pruebas/
  namespace :api do
    namespace :v1 do
      namespace :users do
        resources :users
      end
    end
  end
end
