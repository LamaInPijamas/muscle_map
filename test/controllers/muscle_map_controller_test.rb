# frozen_string_literal: true

require 'test_helper'

class MuscleMapControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get muscle_map_index_url
    assert_response :success
  end
end
