require "webpush"

class Api::V1::Users::UsersController < ApplicationController
  # before_action :set_user, only: %i[ show update destroy ]

  # # Webpush method
  # def send_message
  #   @message = params[:message]
  #   @user = User.find(params[:user_id])
  #   subscription = @user[:subscription]
  #   Webpush.payload_send(
  #       endpoint: subscription[:endpoint],
  #       message: @message,
  #       p256dh: subscription[:keys][:p256dh],
  #       auth: subscription[:keys][:auth],
  #       vapid: {
  #           subject: ENV['SUBJECT'],
  #           public_key: ENV['VAPID_PUBLIC_KEY'],
  #           private_key: ENV['VAPID_PRIVATE_KEY'],
  #           expiration: 12 * 60 * 60
  #       }
  #   )
  #   render json: { success: true }
  # end

  # GET api/v1/users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  # def show
  #   render json: @user
  # end

  # POST /users
  # def create
  #   @user = User.new(user_params)

  #   if @user.save
  #     render json: @user, status: :created, location: @user
  #   else
  #     render json: @user.errors, status: :unprocessable_entity
  #   end
  # end

  # # PATCH/PUT /users/1
  # def update
  #   if @user.update(user_params)
  #     render json: @user
  #   else
  #     render json: @user.errors, status: :unprocessable_entity
  #   end
  # end

  # # DELETE /users/1
  # def destroy
  #   @user.destroy!
  # end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a list of trusted parameters through.

  def user_params
    params.require(:user).permit(:user_image, :is_admin, :created_at, :updated_at, :name, :email, subscription: [:endpoint, :expirationTime, keys: [:p256dh, :auth]])
  end
end
