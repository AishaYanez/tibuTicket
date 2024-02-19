require "test_helper"

class CurrentUserControllerTest < ActionDispatch::IntegrationTest
  test "should get indexrails" do
    get current_user_indexrails_url
    assert_response :success
  end

  test "should get g" do
    get current_user_g_url
    assert_response :success
  end

  test "should get controller" do
    get current_user_controller_url
    assert_response :success
  end

  test "should get current_user" do
    get current_user_current_user_url
    assert_response :success
  end

  test "should get index" do
    get current_user_index_url
    assert_response :success
  end
end
