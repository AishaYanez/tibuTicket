require "test_helper"

class Api::V1::UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user1 = users(:one)
    @user2 = users(:two)
  end

  test "should get index" do
    get api_v1_users_users_url, as: :json
    assert_response :success

    response_data = JSON.parse(response.body)
    assert_equal User.count, response_data.length
  end
end
