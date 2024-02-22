require "test_helper"

class Api::V1::ListsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @list = lists(:one)
  end

  test "should generate ticket" do
    put url_for(controller: "api/v1/lists", action: "getTicket", id: @list.id), as: :json
    assert_response :success
  end

  test "should increase number" do
    put url_for(controller: "api/v1/lists", action: "increaseNumber", id: @list.id), as: :json
    assert_response :success
  end

  test "should decrease number" do
    put url_for(controller: "api/v1/lists", action: "decreaseNumber", id: @list.id), as: :json
    assert_response :success
  end
end
