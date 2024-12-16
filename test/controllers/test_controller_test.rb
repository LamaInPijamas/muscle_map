require "test_helper"

class TestControllerTest < ActionDispatch::IntegrationTest
  test "should get rich_text" do
    get test_rich_text_url
    assert_response :success
  end
end
