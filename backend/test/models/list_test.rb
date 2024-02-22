require "test_helper"

class ListTest < ActiveSupport::TestCase
  fixtures :lists

  test "should be valid with all attributes present" do
    list = List.new(
      list_name: "Test List",
      list_current_number: 0,
      list_limit_number: 10,
      list_creator_id: users(:one).id,
    )
    assert list.valid?
  end

  test "should be invalid without list_name" do
    list = lists(:one)
    list.list_name = nil
    assert_not list.valid?
  end

  test "should be invalid without list_current_number" do
    list = lists(:one)
    list.list_current_number = nil
    assert_not list.valid?
  end

  test "should be invalid without list_limit_number" do
    list = lists(:one)
    list.list_limit_number = nil
    assert_not list.valid?
  end

  test "should be invalid with non-integer list_current_number" do
    list = lists(:one)
    list.list_current_number = 5.5
    assert_not list.valid?
  end

  test "should be invalid with non-integer list_limit_number" do
    list = lists(:one)
    list.list_limit_number = 10.5
    assert_not list.valid?
  end

  test "should be invalid with negative list_current_number" do
    list = lists(:one)
    list.list_current_number = -1
    assert_not list.valid?
  end

  test "should be invalid with negative list_limit_number" do
    list = lists(:one)
    list.list_limit_number = -1
    assert_not list.valid?
  end

  test "should be invalid without list_creator_id" do
    list = lists(:one)
    list.list_creator_id = nil
    assert_not list.valid?
  end

  # test "should broadcast changes after create" do
  #   assert_broadcasts("ListChannel", { message: "List updated", type: "broadcast" }) do
  #     list = List.create(
  #       list_name: "Test List",
  #       list_current_number: 0,
  #       list_limit_number: 10,
  #       list_creator_id: users(:one).id,
  #     )
  #   end
  # end

  # test "should broadcast changes after update" do
  #   list = lists(:one)
  #   assert_broadcasts("ListChannel", { message: "List updated", type: "broadcast" }) do
  #     list.update(list_name: "Updated List Name")
  #   end
  # end

  # test "should broadcast changes after destroy" do
  #   list = lists(:one)
  #   assert_broadcasts("ListChannel", { message: "List updated", type: "broadcast" }) do
  #     list.destroy
  #   end
  # end
end
