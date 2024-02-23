require "test_helper"

class Api::V1::Users::RegistrationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should create user" do
    post api_v1_signup_url, params: { user: { email: "test@example.com", password: "password", password_confirmation: "password", nickname: "test_user" } }, as: :json
    assert_response :success
  end

  test "should not create user with invalid params" do
    post api_v1_signup_url, params: { user: { email: "", password: "", password_confirmation: "", nickname: "" } }, as: :json
    assert_response :unprocessable_entity
  end

  test "should not allow unauthorized access for delete" do
    delete api_v1_signup_url, as: :json
    assert_response :unauthorized
  end

  private

  def api_v1_signup_url
    "/api/v1/signup"
  end
end
