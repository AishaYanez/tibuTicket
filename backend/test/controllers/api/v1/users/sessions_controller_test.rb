require "test_helper"

class Api::V1::Users::SessionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = User.create!(nickname: "test_user", email: "test@example.com", password: "password", is_admin: false)
    @valid_credentials = Base64.strict_encode64("#{@user.email}:password")
    @invalid_credentials = Base64.strict_encode64("#{@user.email}:wrong_password")
  end

  def api_v1_login_path
    "/api/v1/login"
  end

  test "should sign in user with valid credentials" do
    post api_v1_login_path, headers: { "Authorization" => "Basic #{@valid_credentials}" }, as: :json
    assert_response :success
  end

  test "should not sign in user with invalid credentials" do
    post api_v1_login_path, headers: { "Authorization" => "Basic #{@invalid_credentials}" }, as: :json
    assert_response :unauthorized
  end

  test "should sign out user" do
    post api_v1_login_path, headers: { "Authorization" => "Basic #{@valid_credentials}" }, as: :json
    assert_response :success

    delete api_v1_login_path, headers: { "Authorization" => "Bearer #{JSON.parse(response.body)["auth_token"]}" }, as: :json
    assert_response :unauthorized
  end
end
