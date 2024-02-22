require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user_one = users(:one)
    @user_two = users(:two)
  end

  test "user should be valid" do
    assert @user_one.valid?
    assert @user_two.valid?
  end

  test "nickname should be present" do
    @user_one.nickname = nil
    assert_not @user_one.valid?
    @user_two.nickname = nil
    assert_not @user_two.valid?
  end

  test "email should be present" do
    @user_one.email = nil
    assert_not @user_one.valid?
    @user_two.email = nil
    assert_not @user_two.valid?
  end

  test "email should be unique" do
    duplicate_user = @user_one.dup
    @user_one.save
    assert_not duplicate_user.valid?
  end

  test "password should be present" do
    @user_one.encrypted_password = nil
    assert_not @user_one.valid?
    @user_two.encrypted_password = nil
    assert_not @user_two.valid?
  end

  test "is_admin should be boolean" do
    assert_boolean_type(@user_one.is_admin)
    assert_boolean_type(@user_two.is_admin)
  end

  private

  def assert_boolean_type(value)
    assert_includes([true, false], value)
  end
end
