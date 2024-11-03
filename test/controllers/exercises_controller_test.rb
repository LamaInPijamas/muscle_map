require "test_helper"

class ExercisesControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get exercises_show_url
    assert_response :success
  end

  test "should get new" do
    get exercises_new_url
    assert_response :success
  end

  test "should get create" do
    get exercises_create_url
    assert_response :success
  end

  test "should get edit" do
    get exercises_edit_url
    assert_response :success
  end

  test "should get update" do
    get exercises_update_url
    assert_response :success
  end

  test "should get destroy" do
    get exercises_destroy_url
    assert_response :success
  end
end
