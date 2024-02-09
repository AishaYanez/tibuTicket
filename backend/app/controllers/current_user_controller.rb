class CurrentUserController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: UserSerializer.new(current_user).serializeable_hash[:data][:attributes], status: :ok
  end
end
