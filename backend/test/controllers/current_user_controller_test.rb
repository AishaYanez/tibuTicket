require "test_helper"

class Api::V1::Users::CurrentUserControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:one)
    @auth_headers = { "Authorization" => "Bearer #{generate_token(@user)}" }
  end

  test "should get user data" do
    get api_v1_current_user_path, headers: @auth_headers, as: :json
    assert_response :unauthorized
  end

  private

  def generate_token(user)
    payload = { user_id: user.id }
    JWT.encode(payload, Rails.application.secret_key_base)
  end
end
