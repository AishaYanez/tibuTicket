class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionFix
  respond_to :json
  before_action :configure_sign_up_params, only: [:create]

  private

  def configure_sign_up_params
    if request.headers["Authorization"].present?
      encoded_credentials = request.headers["Authorization"].split(" ").last
      decoded_credentials = Base64.decode64(encoded_credentials)
      email, password = decoded_credentials.split(":")
      user_params = { email: email, password: password, password_confirmation: password, nickname: params[:nickname] }

      user_params[:user_image] = params[:user_image] if params[:user_image].present?

      params[:user] = user_params
    end

    devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password, :password_confirmation, :user_image, :nickname, :other_required_fields])
  end

  def respond_with(resource, _opts = {})
    if request.method == "POST" && resource.persisted?
      render json: {
        status: { code: 200, message: "Signed up sucessfully." },
      }, status: :ok
    elsif request.method == "DELETE"
      render json: {
               status: { code: 200, message: "Cuenta borrada" },
             }, status: :ok
    else
      render json: {
        status: { code: 422, message: "User couldn't be created successfully." },
      }, status: :unprocessable_entity
    end
  end

  # before_action :configure_account_update_params, only: [:update]
end
