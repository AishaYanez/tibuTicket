class Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionFix
  respond_to :json
  before_action :configure_sign_up_params, only: [:create]

  private

  def configure_sign_up_params
    if request.headers["Authorization"].present?
      encoded_credentials = request.headers["Authorization"].split(" ").last
      decoded_credentials = Base64.decode64(encoded_credentials)
      email, password = decoded_credentials.split(":")
      params[:user] = { email: email, password: password, password_confirmation: password }
    end

    devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password, :password_confirmation, :other_required_fields])
  end

  def respond_with(resource, _opts = {})
    if request.method == "POST" && resource.persisted?
      render json: {
        status: { code: 200, message: "Signed up sucessfully." },
        data: UserSerializer.new(resource).serializable_hash[:data][:attributes],
      }, status: :ok
    elsif request.method == "DELETE"
      render json: {
        status: { code: 200, message: "Account deleted successfully." },
      }, status: :ok
    else
      render json: {
        status: { code: 422, message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}" },
      }, status: :unprocessable_entity
    end
  end

  # before_action :configure_account_update_params, only: [:update]
end
