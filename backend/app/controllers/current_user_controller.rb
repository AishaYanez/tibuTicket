class CurrentUserController < ApplicationController
  include RackSessionFix
  before_action :authenticate_user!

  def index
    render json: {
             data: {
               user: UserSerializer.new(current_user).serializable_hash[:data][:attributes],
               user_image: UserImageSerializer.new(current_user).user_image,
             },
             status: :ok,
           }
  end
end
