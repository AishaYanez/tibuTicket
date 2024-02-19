class Api::V1::Users::CurrentUserController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: {
             data: {
               user_description: UserSerializer.new(current_user).serializable_hash[:data][:attributes],
               user_image: UserImageSerializer.new(current_user).user_image,
             },
             status: :ok,
           }
  end
end
